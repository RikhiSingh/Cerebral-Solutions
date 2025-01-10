import { LoginButton } from "@/components/auth/login-button";
import { AnimatedButton } from "@/components/landing/landing-button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <Image src={"/app-icons/logo.png"} alt="Cerebral Solutions Logo" className="mb-8 rounded-lg" width={200} height={200}/>
        <LoginButton>
          <AnimatedButton label="Login" />
        </LoginButton>
      </div>
    </div>
  );
}
