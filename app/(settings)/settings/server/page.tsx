import { currentUser } from "@/lib/auth";
import { UserInfo } from "../_components/user-info";

const SettingsServerPage = async () => {
    const user = await currentUser();

    return (
        <UserInfo
            label="Server Component"
            user={user}
        />
    );
}

export default SettingsServerPage;