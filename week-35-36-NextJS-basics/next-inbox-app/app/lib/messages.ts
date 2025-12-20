//app/lib/messages.ts
export const runtime = "nodejs";

import { prisma } from "./db";

export async function getMessages() {
  const res = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res;
}

export async function createMessage(content: string) {
  const res = await prisma.message.create({ data: { content } });
  return res;
}
