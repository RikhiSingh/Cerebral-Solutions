/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getFirstSurveyResponse } from "@/actions/response/reponse";
import { questions } from "@/constants/questions";

interface SurveyResponse {
  id: string;
  response: any;
  result: any;
  createdAt: string;
  updatedAt: string;
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
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
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

  // Destructure result data from the survey response
  const { result: surveyResult, response: userResponses } =
    firstResponse.result;
  const { score, insights, analysis, recommendations } = surveyResult;

  // Determine color based on the score (adjust thresholds as needed)
  let scoreColor = "text-green-500";
  if (score >= 30 && score <= 60) {
    scoreColor = "text-yellow-500";
  } else if (score > 60) {
    scoreColor = "text-red-500";
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Report Header */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">Mental Health Report</h1>
        <div className="flex items-center space-x-4">
          <span className={`text-3xl font-semibold ${scoreColor}`}>
            Score: {score}
          </span>
          <span className="text-gray-600">/100</span>
        </div>
        <p className="mt-4 text-lg text-gray-700">{insights}</p>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Mood", content: analysis.mood },
          { title: "Energy", content: analysis.energy },
          { title: "Sleep Quality", content: analysis.sleep_quality },
          { title: "Overall Outlook", content: analysis.overall_outlook },
          { title: "Stress Management", content: analysis.stress_management },
          {
            title: "Social Connectedness",
            content: analysis.social_connectedness,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Recommendations</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {recommendations.map((rec: string, idx: number) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* User Responses */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Your Responses</h2>
        <div className="divide-y divide-gray-200">
          {questions.map((q, index) => (
            <div key={index} className="py-4">
              <p className="font-semibold text-lg">{q.question}</p>
              <p className="mt-1 text-blue-600">
                {userResponses[index] || "No response"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
