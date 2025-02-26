"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePeer } from "../_context/peerjs-context";
import { MediaConnection } from "peerjs";

const VideoChat: React.FC = () => {
  const { peer, peerId } = usePeer();
  const [remoteId, setRemoteId] = useState<string>("");
  const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(null);
  const [call, setCall] = useState<MediaConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Function to start a call
  const startCall = () => {
    if (!peer || !remoteId) return;
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      const outgoingCall = peer.call(remoteId, stream);
      if (outgoingCall) {
        setCall(outgoingCall);
        outgoingCall.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      }
    });
  };

  // Automatically listen for incoming calls
  useEffect(() => {
    if (!peer) return;

    const handleIncomingCall = (incomingCall: MediaConnection) => {
      setIncomingCall(incomingCall);
    };

    peer.on("call", handleIncomingCall);

    return () => {
      peer.off("call", handleIncomingCall);
    };
  }, [peer]);

  // Accept the incoming call
  const acceptCall = () => {
    if (!incomingCall) return;
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      incomingCall.answer(stream);
      
      incomingCall.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
      
      setCall(incomingCall);
      setIncomingCall(null);
    });
  };

  // Decline the incoming call
  const declineCall = () => {
    if (incomingCall) {
      incomingCall.close();
      setIncomingCall(null);
    }
  };

  // End an ongoing call
  const endCall = () => {
    if (call) {
      call.close();
      setCall(null);
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Video Chat</h1>

      <div className="mb-4">
        <p>Your Peer ID: {peerId}</p>
        <input
          type="text"
          placeholder="Enter remote ID"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <button onClick={startCall} className="bg-blue-500 text-white p-2 rounded mr-2">
          Start Call
        </button>
        <button onClick={endCall} className="bg-red-500 text-white p-2 rounded">
          End Call
        </button>
      </div>

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Incoming Call</h2>
            <p>Peer ID: {incomingCall.peer}</p>
            <div className="mt-4">
              <button onClick={acceptCall} className="bg-green-500 text-white p-2 rounded mr-2">
                Accept
              </button>
              <button onClick={declineCall} className="bg-red-500 text-white p-2 rounded">
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full border rounded" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full border rounded" />
      </div>
    </div>
  );
};

export default VideoChat;
