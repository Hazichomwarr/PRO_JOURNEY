//app/api/messags/[id]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params; // await the whole params object
  const paramsId = resolvedParams.id; // now safely access id
  return NextResponse.json({
    messageId: paramsId,
  });
}
