/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { questions } from "@/constants/questions";

interface Analysis {
  mood: string;
  energy: string;
  sleep_quality: string;
  overall_outlook: string;
  stress_management: string;
  social_connectedness: string;
}

interface ReportResult {
  score: number;
  insights: string;
  analysis: Analysis;
  recommendations: string[];
}

interface ReportContentProps {
  result: ReportResult;
  userResponses: any[];
  createdAt: string;
}

const getScoreColor = (score: number) => {
  if (score < 30) return "text-red-500";
  if (score >= 30 && score < 40) return "text-orange-500";
  if (score >= 40 && score < 60) return "text-amber-500";
  if (score >= 60 && score < 80) return "text-yellow-500";
  return "text-green-500";
};

export default function ReportContent({
  result,
  userResponses,
  createdAt,
}: ReportContentProps) {
  const { score, insights, analysis, recommendations } = result;
  const scoreColor = getScoreColor(score);

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
        <p className="mt-2 text-sm text-gray-500">
          Report Date: {new Date(createdAt).toLocaleDateString("en-US")}
        </p>
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
