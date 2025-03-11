"use client";
import axios from "axios";
import { PlaneIcon } from "lucide-react";
import React, { useState,  } from "react";

interface Message {
  sender: "user" | "ai" | "system";
  text: string;
}

export default function TalkToAi() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: "You are a mental and physical therapist. Provide empathetic, compassionate, and professional therapeutic advice. Stay strictly in your role as a therapist and do not deviate from that role.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sending of messages
  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        message: newMessage.text,
      });
      const aiReply = response.data?.response || "No response received.";
      const aiMessage: Message = { sender: "ai", text: aiReply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "I'm sorry, there was an error processing your request. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center">

      <div className="max-w-4xl w-full h-[90%] bg-white rounded-xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 text-white py-4 px-6 rounded-t-xl">
          <h1 className="text-2xl font-bold">Talk to Your Therapist</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-4 rounded-lg shadow ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : msg.sender === "ai"
                    ? "bg-green-100 text-gray-800"
                    : "bg-gray-200 text-gray-800 italic"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-md p-4 rounded-lg shadow bg-green-100 text-gray-800">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/*
          Input bar at the bottom:
          "border-t" visually separates it from messages.
          The user types into the input, pressing Enter or the icon to send.
        */}
        <div className="border-t border-gray-200 p-4 flex items-center rounded-b-xl">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSend();
            }}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50"
          >
            <PlaneIcon className="h-6 w-6 rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}

