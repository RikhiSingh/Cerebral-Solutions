/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";
import OpenAI from "openai";

interface AiProps {
  responses: any;
  session: string;
}

export const ai = async ({ responses, session }: AiProps) => {
  if (!responses) return { error: "No responses provided!" };

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const thread = await openai.beta.threads.create();
  const runResponse = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: "asst_",
  });

  let run = await openai.beta.threads.runs.retrieve(thread.id, runResponse.id);
  while (run.status !== "completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await openai.beta.threads.runs.retrieve(thread.id, runResponse.id);
  }

  const messagesResponse = await openai.beta.threads.messages.list(thread.id);
  const assistantMessage = messagesResponse.data.find(
    (msg) => msg.role === "assistant"
  );
  if (!assistantMessage) throw new Error("No assistant response found.");

  const content = assistantMessage.content[0];
  if (content.type !== "text")
    throw new Error("The first message content is not of type text.");

  const cleanedText = content.text.value.replace(/```json\n?|```/g, "");
  let parsedResult;
  try {
    parsedResult = JSON.parse(cleanedText);
  } catch {
    throw new Error("Failed to parse OpenAI response: " + cleanedText);
  }

  // Save both the user's responses and the AI result in the database.
  const savedResponse = await db.responses.create({
    data: {
      userId: session,
      response: responses,
      result: parsedResult,
    },
  });

  return savedResponse;
};
