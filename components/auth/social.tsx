"use client";

// If we purely want to do we use this sign in from next auth react
// if a server component we can use the sign In provided by our auth
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            {/* <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => {}}
            >
                <FaGithub className="h-5 w-5" />
            </Button> */}
        </div>
    );
};