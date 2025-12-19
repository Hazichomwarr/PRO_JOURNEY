export const runtime = "nodejs";

import { prisma } from "../../lib/db";

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(messages);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.content || body.content.length < 2) {
    return Response.json({ error: "Message too short" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: { content: body.content },
  });

  return Response.json(message, { status: 201 });
}
