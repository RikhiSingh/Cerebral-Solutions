"use client"

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-secondary p-4 flex justify-between items-center rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button asChild
                    variant={pathname === "/settings/server" ? "default" : "outline"}
                >
                    <Link href="/settings/server">
                        Server
                    </Link>
                </Button>
                <Button asChild
                    variant={pathname === "/settings/client" ? "default" : "outline"}
                >
                    <Link href="/settings/client">
                        Client
                    </Link>
                </Button>
                <Button asChild
                    variant={pathname === "/settings/admin" ? "default" : "outline"}
                >
                    <Link href="/settings/admin">
                        Admin
                    </Link>
                </Button>
                <Button asChild
                    variant={pathname === "/settings" ? "default" : "outline"}
                >
                    <Link href="/settings">
                        Settings
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
}

export default SettingsNavbar;