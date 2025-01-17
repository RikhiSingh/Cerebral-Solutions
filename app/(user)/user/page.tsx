"use client";

import { Button } from "@/components/ui/button";

const OwnerDashboard = () => {

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
                <span>
                    Welcome Back, 👋🏻
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