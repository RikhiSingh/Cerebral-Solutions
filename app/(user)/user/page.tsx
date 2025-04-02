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
  ReferenceLine,
} from "recharts";
import { getIndividualScores } from "@/actions/get-score/getScore";
import Image from "next/image";
import { PropagateLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const wellnessTips = [
  { tip: "Take a 5-minute meditation break", category: "Mindfulness" },
  {
    tip: "Stay hydrated - drink 8 glasses of water",
    category: "Physical Health",
  },
  { tip: "Practice gratitude journaling", category: "Mental Health" },
  { tip: "Take a short walk outside", category: "Exercise" },
];

export default function OwnerDashboard() {
  const user = useCurrentUser();
  const userId = user?.id;
  const router = useRouter();

  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [goalValue, setGoalValue] = useState<number>(75);

  const calculateDashboardStats = () => {
    const currentScore = chartData.length > 0 ? chartData[chartData.length - 1].value : 0;
    const previousScore = chartData.length > 1 ? chartData[chartData.length - 2].value : currentScore;
    const scoreChange = currentScore - previousScore;
    
    // Calculate streak
    let streak = 0;
    for (let i = chartData.length - 1; i > 0; i--) {
      if (chartData[i].value >= chartData[i - 1].value) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate goal progress
    const goalProgress = Math.round((currentScore / goalValue) * 100);

    return [
      {
        title: "Wellness Score",
        value: `${Math.round(currentScore)}%`,
        change: `${scoreChange >= 0 ? '+' : ''}${Math.round(scoreChange)}%`,
        icon: "📈",
        changeColor: scoreChange >= 0 ? "text-green-500" : "text-red-500"
      },
      {
        title: "Streak",
        value: `${streak} days`,
        change: streak > 0 ? `+${streak}` : "0",
        icon: "🔥",
        changeColor: streak > 0 ? "text-green-500" : "text-yellow-500"
      },
      {
        title: "Completed Sessions",
        value: chartData.length.toString(),
        change: "+1",
        icon: "✅",
        changeColor: "text-green-500"
      },
      {
        title: "Goal Progress",
        value: `${Math.min(goalProgress, 100)}%`,
        change: `${goalValue}%`,
        icon: "🎯",
        changeColor: goalProgress >= 100 ? "text-green-500" : "text-blue-500"
      },
    ];
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSetGoal = () => {
    const newGoal = prompt(
      "Enter your goal score (0-100):",
      goalValue.toString()
    );
    if (newGoal !== null) {
      const parsedGoal = parseInt(newGoal);
      if (!isNaN(parsedGoal) && parsedGoal >= 0 && parsedGoal <= 100) {
        setGoalValue(parsedGoal);
      } else {
        alert("Please enter a valid number between 0 and 100");
      }
    }
  };

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

  const dashboardStats = calculateDashboardStats();

  return (
    <div className="flex flex-col p-6 gap-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <span className="text-gray-600 dark:text-gray-300 text-lg">
          Welcome Back, {user?.name} 👋🏻
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-sm font-semibold ${stat.changeColor}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl font-bold mt-2">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mental Health Progress</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Goal: {goalValue}
            </span>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={false} axisLine={false} />
              <YAxis domain={[0, 100]} tickCount={11} />
              <Tooltip />
              <ReferenceLine
                y={goalValue}
                stroke="red"
                strokeDasharray="3 3"
                label={{ value: "Goal", position: "right" }}
              />
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

      {/* Wellness Tips Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Today&apos;s Wellness Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wellnessTips.map((tip, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <span className="text-sm text-blue-500 font-semibold">
                {tip.category}
              </span>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleNavigation("/questionnaire")}
            className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-blue-700 dark:text-blue-200 font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
          >
            Start Session
          </button>
          <button
            onClick={() => handleNavigation("/user/all-reports")}
            className="p-4 bg-green-50 dark:bg-green-900 rounded-lg text-green-700 dark:text-green-200 font-medium hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
          >
            View Progress
          </button>
          <button
            onClick={handleSetGoal}
            className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg text-purple-700 dark:text-purple-200 font-medium hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>Set Goals</span>
            {chartData.length > 0 &&
              chartData[chartData.length - 1].value >= goalValue && (
                <span className="text-green-500">✓</span>
              )}
          </button>
          <button
            onClick={() => handleNavigation("/user/schedule-appointment")}
            className="p-4 bg-orange-50 dark:bg-orange-900 rounded-lg text-orange-700 dark:text-orange-200 font-medium hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors"
          >
            Get Help
          </button>
        </div>
      </div>
    </div>
  );
}