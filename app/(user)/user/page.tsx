"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getIndividualScores } from "@/actions/get-score/getScore";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";

export default function OwnerDashboard() {
  const user = useCurrentUser();
  const userId = user?.id;

  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchScores() {
      try {
        if (!userId) {
          throw new Error("User ID is undefined");
        }

        setLoading(true);
        const res = await getIndividualScores(userId);

        const transformed = res.map((score: number, index: number) => ({
          name: `Point ${index + 1}`,
          value: score,
        }));

        setChartData(transformed);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, [userId]);

  if (loading) {
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

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <span>Welcome Back, {user?.name} 👋🏻</span>
      </div>

      <div className="max-w-7xl h-64 mt-10 bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Mental Health Tracker</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} axisLine={false} />
            <YAxis domain={[0, 100]} tickCount={11} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#513e27"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
