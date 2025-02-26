
export const getPeerID = async (userId: string) => {
    try {
      const res = await fetch(`/api/peer/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch peerID");
  
      const data = await res.json();
      return data.peerID || null;
    } catch (error) {
      console.error("❌ Error fetching peerID:", error);
      return null;
    }
  };