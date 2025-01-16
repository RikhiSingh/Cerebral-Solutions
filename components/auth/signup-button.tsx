"use client";

import { useRouter } from "next/navigation";

interface SignUpButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const SignUpButton = ({ children }: SignUpButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/register");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
