"use server";

import { signOut } from "@/auth";

export const logout = async () => {
    // some server validations/changes could be done here before we logout the user
    return signOut();
}