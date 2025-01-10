"use client";

import { FaUser } from "react-icons/fa"
import { ExitIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="rounded-lg">
                        <FaUser className="text-blue-500" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white" align="end">
                <LogoutButton>
                    <DropdownMenuItem className="flex flex-row items-center p-2 rounded-ful hover:none">
                        <ExitIcon className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}