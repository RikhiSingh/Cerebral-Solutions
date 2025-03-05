"use client";

import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsNavbar = () => {
  const user = useCurrentUser();

  const name = user?.name;
  return (
    <nav className="bg-[#d4bfa9] p-4 flex justify-between items-center rounded-xl w-[600px] shadow-sm">
      <div>
        <p>
          Hello, <b className="text-[#513e27]">{name}</b>
        </p>
      </div>
      <UserButton />
    </nav>
  );
};

export default SettingsNavbar;
