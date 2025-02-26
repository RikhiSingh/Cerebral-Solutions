import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, context: any) {
  try {
    const params = await context.params;

    if (!params?.userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: params.userId },
      select: { peerID: true },
    });

    if (!user?.peerID) {
      return NextResponse.json({ error: "Peer ID not found" }, { status: 404 });
    }

    return NextResponse.json({ peerID: user.peerID });
  } catch (error) {
    console.error("Error fetching peerID:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
