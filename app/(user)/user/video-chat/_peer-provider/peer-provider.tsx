"use client";
import { PeerProvider } from "../../../_context/peerjs-context";
import { useSession } from "next-auth/react";

export default function VideoChatPage({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session?.user?.id) {
    console.error("No user session found!");
    return <p>Please log in to access video chat.</p>;
  }

  return (
    <PeerProvider userId={session.user.id}> 
      {children}
    </PeerProvider>
  );
}
