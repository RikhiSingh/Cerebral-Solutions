/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";

interface SaveSurveyProps {
  userId: string;
  responses: any;
  result: any;
}

export const saveSurvey = async ({ userId, responses, result }: SaveSurveyProps) => {
  const savedSurvey = await db.responses.create({
    data: {
      userId,
      response: responses,
      result,
    },
  });
  return savedSurvey;
};
