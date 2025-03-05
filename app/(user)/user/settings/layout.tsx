import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import SettingsNavbar from "./_components/settings-navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
        <SettingsNavbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
