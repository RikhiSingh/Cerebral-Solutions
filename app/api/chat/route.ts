import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI();

export async function GET() {
  return NextResponse.json({
    message: "Hello from GET! Send a POST request with a 'message' field to interact with the AI.",
  });
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const prePrompt =
      "You are a mental and physical therapist. Provide empathetic, compassionate, and professional therapeutic advice. " +
      "Stay strictly in your role as a therapist and do not deviate from that role.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      store: true,
      messages: [
        { role: "system", content: prePrompt },
        { role: "user", content: message },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ response: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
