/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";

export const getSurveyResponseById = async (reportId: string): Promise<any> => {
  const response = await db.responses.findUnique({
    where: { id: reportId },
    select: {
      result: true,
      response: true,
      createdAt: true,
    },
  });
  return response;
};
