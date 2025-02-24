"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveSurvey } from "@/actions/survey/saveSurvey";

export default function Reports() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only proceed if the user is logged in.
    if (session && session.user?.id) {
      const cachedResponses = localStorage.getItem("surveyResponses");
      const cachedResult = localStorage.getItem("surveyResult");

      if (cachedResponses && cachedResult) {
        const responses = JSON.parse(cachedResponses);
        const result = JSON.parse(cachedResult);

        saveSurvey({ userId: session.user.id as string, responses, result })
          .then(() => {
            console.log("Cached survey responses saved.");
            // Remove cached data after saving.
            localStorage.removeItem("surveyResponses");
            localStorage.removeItem("surveyResult");
          })
          .catch((err) => {
            console.error("Failed to save cached responses:", err);
          });
      }
    } else {
      // If no session, you may redirect to login.
      router.push("/auth/login");
    }
  }, [session, router]);

  return (
    <div>
      <h1>User Reports</h1>
      {/* Your report UI goes here */}
    </div>
  );
}
