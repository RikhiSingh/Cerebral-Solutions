import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { UserSidebar } from "./_components/user-sidebar"
import AppNavbar from "@/components/app/app-navbar"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <RoleGate allowedRole={[UserRole.USER, UserRole.ADMIN]}>
                <SidebarProvider>
                    <UserSidebar />
                    <SidebarInset>
                        <AppNavbar />
                        <main className="p-4 h-full">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </RoleGate>
        </SessionProvider>
    )
}

export default Layout