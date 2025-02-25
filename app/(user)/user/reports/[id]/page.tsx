/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, notFound } from "next/navigation";
import { getSurveyResponseById } from "@/actions/response/getSurveyResponseById";
import { auth } from "@/auth";
import ReportContent from "../../_components/report-content";

export default async function ReportDetailPage(props: any) {
  const { id } = await props.params;

  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  const report = await getSurveyResponseById(id);
  if (!report) {
    notFound();
  }

  const { result, response: userResponses, createdAt } = report;

  return (
    <ReportContent
      result={result}
      userResponses={userResponses}
      createdAt={createdAt}
    />
  );
}
