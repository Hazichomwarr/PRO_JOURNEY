//app/messages/action.ts

"use server";

export const runtime = "nodejs";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";
console.log("RUNTIME CHECK:", process.env.NEXT_RUNTIME);

export async function createMessage(formData: FormData) {
  const content = formData.get("content")?.toString();

  if (!content) return;

  await prisma.message.create({
    data: { content },
  });

  revalidatePath("/messages");
}
