"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAllSurveyResponses } from "@/actions/response/getAllSurveyResponses";
import { PropagateLoader } from "react-spinners";
import Image from "next/image";

interface Report {
  id: string;
  result: {
    score: number;
    insights: string;
  };
  createdAt: string;
}

export default function AllReports() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      if (session?.user?.id) {
        try {
          const responses = await getAllSurveyResponses(session.user.id);
          setReports(responses);
        } catch {
          setError("Failed to fetch reports.");
        }
        setLoading(false);
      }
    }
    if (status === "authenticated") {
      fetchReports();
    } else if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading" || loading) {
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
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-4">
        No reports available.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="cursor-pointer p-4 border rounded shadow hover:bg-gray-100"
          onClick={() => router.push(`/user/reports/${report.id}`)}
        >
          <h2 className="text-xl font-bold">
            Report on {new Date(report.createdAt).toLocaleDateString()}
          </h2>
          <p className="mt-2">Score: {report.result.score}</p>
          <p className="text-gray-600 mt-1">
            {report.result.insights.slice(0, 100)}...
          </p>
        </div>
      ))}
    </div>
  );
}
