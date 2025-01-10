"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import Image from "next/image";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[]; // Allow multiple roles
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  useEffect(() => {
    if (role === undefined) return; // Wait for role to be defined

    if (!allowedRole.includes(role)) {
      // Redirect to the user's dashboard
      let redirectUrl = "/dashboard"; // Or determine based on role

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
          redirectUrl = "/";
      }

      router.replace(redirectUrl);
    }
  }, [role, allowedRole, router]);

  if (role === undefined || !allowedRole.includes(role)) {
    return (
      <div className="h-full flex items-center justify-center flex-col bg-gray-200">
        <Image
          src={"/app-icons/logo.png"}
          alt="Cerebral Solutions Logo"
          className="mb-4 rounded-2xl"
          width={200}
          height={200}
        />
        <PropagateLoader color="#2563eb" />
      </div>
    );
  }

  return <>{children}</>;
};
