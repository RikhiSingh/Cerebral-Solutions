"use client";
import { PeerProvider } from "../../../_context/peerjs-context";
import { AppProps } from "next/app";
import { useSession } from "next-auth/react";

export default function VideoChatPage({Component, pageProps} : AppProps) {
    const { data: session } = useSession();

    if (!session?.user?.id) {
        return <p>Loading...</p>; //ask Rikhi how to manage if user is not logged int
    }

    return (
        <PeerProvider userId={session.user.id}> 
            <Component {...pageProps} />
        </PeerProvider>
    );
}