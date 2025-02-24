/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";

export const getAllSurveyResponses = async (userId: string): Promise<any[]> => {
  const responses = await db.responses.findMany({
    where: { userId },
    select: {
      id: true,
      result: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return responses;
};
