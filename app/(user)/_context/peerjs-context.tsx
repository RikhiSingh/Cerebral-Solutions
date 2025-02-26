"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import Peer from "peerjs";
import { getPeerID } from "@/data/peerID";

const hostIP = process.env.NEXT_PUBLIC_PEERJS_DOMAIN!;

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
  children: React.ReactNode;
  userId: string;
}

export const PeerProvider: React.FC<PeerProviderProps> = ({ children, userId }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    if (!userId) {
      console.error("No userId provided to PeerProvider!");
      return;
    }

    const fetchPeerID = async () => {
      try {
        const storedPeerID = await getPeerID(userId);

        if (!storedPeerID) {
          console.error(`No peerID found for user: ${userId}`);
          return;
        }

        setPeerId(storedPeerID);

        const peer = new Peer(storedPeerID, {
          host: hostIP,
          port: 9000,
          path: "/myapp",
          secure: false,
          debug: 3,
        });

        peerInstance.current = peer;

        peer.on("error", (err) => console.error("PeerJS Error:", err));

        return () => {
          peer.destroy();
        };
      } catch (error) {
        console.error("Error fetching peerID:", error);
      }
    };

    fetchPeerID();
  }, [userId]);

  return (
    <PeerContext.Provider value={{ peer: peerInstance.current, peerId }}>
      {children}
    </PeerContext.Provider>
  );
};
