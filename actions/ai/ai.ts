"use server";

import OpenAI from "openai";

interface AiProps {
  responses: JSON;
}

export const ai = async ({ responses }: AiProps) => {
  if (!responses) {
    return { error: "No responses provided!" };
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const thread = await openai.beta.threads.create();

    const runResponse = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_",
    });

    let run = await openai.beta.threads.runs.retrieve(
      thread.id,
      runResponse.id
    );

    while (run.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await openai.beta.threads.runs.retrieve(thread.id, runResponse.id);
    }

    const messagesResponse = await openai.beta.threads.messages.list(thread.id);

    const assistantResponses = messagesResponse.data.filter(
      (msg) => msg.role === "assistant"
    );

    if (assistantResponses.length > 0) {
      const content = assistantResponses[0].content[0];

      if (content.type === "text") {
        const responseText = content.text.value;

        try {
          const parsedResponse = JSON.parse(
            responseText.replace(/```json\n?|```/g, "")
          );

          return parsedResponse;
        } catch {
          throw new Error(
            "Failed to parse OpenAI response: " +
              responseText.replace(/```json\n?|```/g, "")
          );
        }
      } else {
        throw new Error("The first message content is not of type text.");
      }
    } else {
      throw new Error("No assistant response found.");
    }
  } catch (error) {
    throw new Error("Internal server error: " + (error as Error).message);
  }
};
