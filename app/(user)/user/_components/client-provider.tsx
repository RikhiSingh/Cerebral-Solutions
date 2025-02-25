"use client";

import { PeerProvider } from "../../_context/peerjs-context";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <PeerProvider>{children}</PeerProvider>;
}
