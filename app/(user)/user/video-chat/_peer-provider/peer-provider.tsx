"use client";
import { PeerProvider } from "../../../_context/peerjs-context";
import { AppProps } from "next/app";

export default function VideoChatPage({Component, pageProps} : AppProps) {
    return (
        <PeerProvider>
            <Component {...pageProps} />
        </PeerProvider>
    );
}