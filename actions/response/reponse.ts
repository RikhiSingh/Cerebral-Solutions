/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";

export const getFirstSurveyResponse = async (userId: string): Promise<any> => {
  const response = await db.responses.findFirst({
    where: { userId },
    select: { result: true, response: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return response;
};
