"use client";
import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Peer from "peerjs";
import { getPeerID } from "@/data/peerID"; 

interface PeerContextType {
  peer: Peer | null;
  peerId: string | null;
}

const PeerContext = createContext<PeerContextType | undefined>(undefined);

export const usePeer = (): PeerContextType => {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error("usePeer must be used within a PeerProvider");
  }
  return context;
};

interface PeerProviderProps {
  children: ReactNode;
  userId: string; 
}

export const PeerProvider: React.FC<PeerProviderProps> = ({ children, userId }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    const initializePeer = async () => {
      const storedPeerID = await getPeerID(userId); 

      if (!storedPeerID) {
        console.error("No peerID found for user:", userId);
        return;
      }

      const peer = new Peer(storedPeerID, {
        host: "10.0.0.200", 
        port: 9000,
        path: "/myapp",
        secure: false,
        debug: 3,
      });

      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("error", (err) => {
        console.error("PeerJS Error:", err);
      });

      peerInstance.current = peer;
    };

    initializePeer();

    return () => {
      peerInstance.current?.destroy();
    };
  }, [userId]);

  return (
    <PeerContext.Provider value={{ peer: peerInstance.current, peerId }}>
      {children}
    </PeerContext.Provider>
  );
};
