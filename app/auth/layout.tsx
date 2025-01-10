import Image from "next/image";
import { Suspense } from "react";
import { PropagateLoader } from "react-spinners";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center flex-col">
          <Image
            src={"/app-icons/logo.png"}
            alt="Cerebral Solutions Logo"
            className="mb-4 rounded-2xl"
            width={200}
            height={200}
          />
          <PropagateLoader color="#2563eb" />
        </div>
      }
    >
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full lg:flex flex-col items-center justify-center tm px-4 bg-blue-500 lg:bg-white">
          <div className="flex items-center justify-center mt-20">
            {children}
          </div>
        </div>
        <div className="h-full bg-blue-500 hidden lg:flex items-center justify-center flex-col">
          <Image
            src={"/app-icons/logo.png"}
            alt="Cerebral Solutions Logo"
            className="mb-4 rounded-2xl"
            width={200}
            height={200}
          />
          <div className="text-white text-6xl font-bold tracking-wide text-center">
            Welcome to Cerebral Solutions
          </div>
          <p className="mt-2 text-xl text-white">
            Login in or Create an account to continue
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default AuthLayout;
