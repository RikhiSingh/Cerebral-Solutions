/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getFirstSurveyResponse } from "@/actions/response/reponse";

interface SurveyResponse {
  id: string;
  response: any;
  result: any;
  createdAt: string;
  updatedAt: string;
}

export default function FirstResponse() {
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

  if (status === "loading" || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!firstResponse) return <div>No survey response available.</div>;

  return (
    <div>
      <pre>{JSON.stringify(firstResponse, null, 2)}</pre>
    </div>
  );
}
