//app/api/messages/route.ts
export const runtime = "nodejs";

import { prisma } from "@/app/lib/db";
import { createMessage } from "@/app/lib/messages";
import { CreateMessageSchema } from "@/app/schemas/message";
import { PaginationSchema } from "@/app/schemas/pagination";
// import { getSession } from "@/app/lib/auth";

export async function GET(req: Request) {
  // const session = await getSession();

  // if (!session) {
  //   return Response.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { searchParams } = new URL(req.url);

  const query = {
    limit: searchParams.get("limit") ?? undefined,
    cursor: searchParams.get("cursor") ?? undefined,
  };

  const result = PaginationSchema.safeParse(query);
  console.log("result->", result);
  if (!result.success) {
    return Response.json(
      {
        error: "Invalid query parameters",
        details: result.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { limit, cursor } = result.data;

  const messages = await prisma.message.findMany({
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    orderBy: { id: "desc" },
  });

  const hasMore = messages.length > limit;
  const data = hasMore ? messages.slice(0, -1) : messages;

  return Response.json({
    data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
  });
}

export async function POST(req: Request) {
  // const session = await getSession();

  // if (!session) {
  //   return Response.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const body = await req.json();

  const result = CreateMessageSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        error: "invalid input",
        details: result.error.flatten(),
      },
      { status: 400 }
    );
  }

  const message = await createMessage(body.content);
  return Response.json(message, { status: 201 });
}
