/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getFirstSurveyResponse } from "@/actions/response/reponse";
import ReportContent from "./report-content";
import { PropagateLoader } from "react-spinners";
import Image from "next/image";

interface SurveyResponse {
  result: any;
  response: any;
  createdAt: string;
}

export default function FirstResponseUI() {
  const { data: session, status } = useSession();
  const [firstResponse, setFirstResponse] = useState<SurveyResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResponse() {
      if (session?.user?.id) {
        try {
          const res = await getFirstSurveyResponse(session.user.id);
          if (!res) {
            setError("No survey response available.");
          } else {
            setFirstResponse(res);
          }
        } catch (err: any) {
          setError(err.message || "Failed to fetch survey response.");
        }
        setLoading(false);
      }
    }
    if (status === "authenticated") {
      fetchResponse();
    }
  }, [session, status]);

  if (status === "loading" || loading)
    return (
      <div className="h-full w-full flex items-center justify-center flex-col">
        <Image
          src={"/app-icons/logo.webp"}
          alt="Cerebral Solutions Logo"
          className="mb-4 rounded-2xl"
          width={200}
          height={200}
        />
        <PropagateLoader color="#2563eb" />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!firstResponse)
    return (
      <div className="text-gray-500 text-center mt-4">
        No survey response available.
      </div>
    );

  const { result, response: userResponses, createdAt } = firstResponse;

  return (
    <ReportContent
      result={result}
      userResponses={userResponses}
      createdAt={createdAt}
    />
  );
}
