"use client";

import { PeerProvider } from "../../_context/peerjs-context";
import { useSession } from "next-auth/react";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  // console.log(session);

  if (!session?.user?.id) {
    console.error("No userId found in session");
    return <p>Loading...</p>;
  }

  return <PeerProvider userId={session.user.id}>{children}</PeerProvider>;
}
