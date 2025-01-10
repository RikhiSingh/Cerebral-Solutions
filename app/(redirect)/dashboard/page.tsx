// pages/dashboard.tsx or app/dashboard/page.tsx
"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import Image from "next/image";

const DashboardPage = () => {
  const role = useCurrentRole();
  const router = useRouter();

  useEffect(() => {
    if (role === undefined) return; // Wait for role to be defined

    let redirectUrl = "/";

    switch (role) {
      case "ADMIN":
        redirectUrl = "/admin";
        break;
      case "USER":
        redirectUrl = "/user";
        break;
      case "PRO":
        redirectUrl = "/pro";
        break;
      default:
        // Handle unknown roles or redirect to a default page
        redirectUrl = "/";
    }

    router.replace(redirectUrl);
  }, [role, router]);

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <Image src={"/app-icons/logo.webp"} alt="Cerebral Solutions Logo" className='mb-4 rounded-2xl' width={200} height={200}/>
      <PropagateLoader color="#2563eb" />
    </div>
  );
};

export default DashboardPage;
