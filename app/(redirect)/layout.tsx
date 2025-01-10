import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <RoleGate
        allowedRole={[
          UserRole.ADMIN,
          UserRole.USER,
          UserRole.PRO,
        ]}
      >
        <SidebarProvider className="flex items-center justify-center">
          <main className="p-4">{children}</main>
        </SidebarProvider>
      </RoleGate>
    </SessionProvider>
  );
};

export default Layout;
