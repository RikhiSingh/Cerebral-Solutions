import { db } from "@/lib/db";

export const getPeerID = async (userId: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { peerID: true }
        });

        return user?.peerID || null;
    } catch {
        return null;
    }
};
