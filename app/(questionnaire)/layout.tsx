"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../(home)/_components/Navbar";
import { RiseLoader } from "react-spinners";
import { SessionProvider } from "next-auth/react";

const QuestionnairePageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4000ms = 4 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex justify-center items-center h-screen w-screen flex-col">
        <div className="flex justify-center items-center gap-2 flex-col mb-10">
          <h1 className="bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text text-6xl font-bold">
            Cerebral Solutions <br />
          </h1>
          <p className="text-2xl">We are curating questions for you!</p>
        </div>
        <RiseLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <SessionProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default QuestionnairePageLayout;
