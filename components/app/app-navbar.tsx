import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const AppNavbar = () => {
  return (
    <nav className="h-24 bg-blue-500 sticky top-0 z-50 flex items-center justify-between">
      <SidebarTrigger className="ml-2" />
      <Link href={"/"}>
        <Image
          src={"/app-icons/auth/logo-wide.webp"}
          alt="Cerebral Solutions Logo"
          className="rounded-md"
          width={200}
          height={200}
        />
      </Link>
      <div className="mr-4">
        <UserButton />
      </div>
    </nav>
  );
};

export default AppNavbar;
