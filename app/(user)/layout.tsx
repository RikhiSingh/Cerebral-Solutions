import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "./_components/user-sidebar";
import AppNavbar from "@/components/app/app-navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <UserSidebar />
      <SidebarInset>
        <AppNavbar />
        <main className="p-4 h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
