"use client";

import { useState } from "react";

export default function Survey() {
  const questions = [
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"],
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleNext = (answer: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentStep] = answer;
      return updatedAnswers;
    });
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = () => {
    // call an API route or do any final processing
    console.log("User answers: ", answers);

    alert("Submitted! Check console for answers.");
  };

  const isLastQuestion = currentStep === questions.length - 1;

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Questionnaire</h1>

      <div>
        <h2>
          {`Question ${currentStep + 1} of ${questions.length}: `}
          {questions[currentStep].question}
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {questions[currentStep].options.map((option, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              <button
                onClick={() => handleNext(option)}
                style={{ padding: "8px 16px" }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {currentStep > 0 && (
        <button onClick={handlePrevious} style={{ marginRight: "16px" }}>
          Previous
        </button>
      )}

      {isLastQuestion && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
}
