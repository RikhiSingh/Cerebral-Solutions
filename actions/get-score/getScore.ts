/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";

export const getIndividualScores = async (
  userId: string
): Promise<number[]> => {
  const responses = await db.responses.findMany({
    where: { userId: userId },
    select: { result: true },
  });

  return responses.map((response: any) => {
    if (!response.result) {
      return 0;
    }

    let parsedResult;
    if (typeof response.result === "string") {
      parsedResult = JSON.parse(response.result);
    } else {
      parsedResult = response.result;
    }

    return parsedResult.score ?? 0;
  });
};
