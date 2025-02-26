import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure this only runs on the server

export async function GET(req: Request, context: { params: { userId: string } }) {
  try {
    const userId = context.params?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
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
