"use client";
import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Peer from "peerjs";

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
}

export const PeerProvider: React.FC<PeerProviderProps> = ({ children }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    const peer = new Peer("2001", {
      host: "10.0.0.200", // Replace with the local IP of the computer running the PeerJS server
      port: 9000,
      path: "/myapp",
      secure: false, // Since it's local, no SSL is needed
      debug: 3,
    });

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("error", (err) => {
      console.error("PeerJS Error:", err);
    });

    peerInstance.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  return (
    <PeerContext.Provider value={{ peer: peerInstance.current, peerId }}>
      {children}
    </PeerContext.Provider>
  );
};
