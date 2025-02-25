import {db} from "@/lib/db";

export const getPeerID = async (peerID: string, userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { peerID: true } // ✅ Only fetch peerID
        });

        return user?.peerID || null;
    } catch {
        return null;
    }
}
