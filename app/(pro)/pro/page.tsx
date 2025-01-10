"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const OwnerDashboard = () => {
    const user = useCurrentUser();

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
                <span>
                    Welcome Back, {user?.name} 👋🏻
                </span>
            </div>
            <div>
                <Button>
                    Add Property
                </Button>
            </div>
        </div>
    );
}

export default OwnerDashboard;