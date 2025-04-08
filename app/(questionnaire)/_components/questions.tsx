"use client";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { questions } from "@/constants/questions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ai } from "@/actions/ai/ai";
import { PacmanLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

export default function Survey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [loadingAi, setLoadingAi] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  const mentalStats = [
    "Decoding the intricate patterns of your emotional landscape...",
    "Calibrating your inner energy fluctuations for optimal balance...",
    "Dissecting the nuances of your sleep architecture and dream states...",
    "Unraveling the complex signals of stress and tension in your mind...",
    "Mapping the vibrant network of your social connections and support...",
    "Synthesizing cognitive insights from your unique response profile...",
    "Charting the course of your resilience and adaptive strategies...",
    "Interpreting subtle cues in your mood dynamics for hidden trends...",
    "Projecting your future mental well-being with precision...",
    "Refining the symphony of your emotions into a harmonious balance...",
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (loadingAi) {
      intervalId = setInterval(() => {
        setCurrentStatIndex((prev) => (prev + 1) % mentalStats.length);
      }, 4000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loadingAi]);

  const handleSelect = (answer: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentStep] = answer;
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (answers[currentStep] !== null && currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // console.log("User answers:", answers);
    localStorage.setItem("surveyResponses", JSON.stringify(answers));
    try {
      // Begin AI processing and show the loading screen.
      setLoadingAi(true);
      const aiResult = await ai({
        responses: answers,
        session: session?.user.id,
      });
      // console.log("AI result:", aiResult);
      setLoadingAi(false);
      if (!session) {
        localStorage.setItem("surveyResult", JSON.stringify(aiResult));
        router.push("/auth/login");
      } else {
        router.push("/user/reports");
      }
    } catch (error) {
      console.error("Error processing survey responses:", error);
      setLoadingAi(false);
    }
  };

  const isLastQuestion = currentStep === questions.length - 1;
  const selectedAnswer = answers[currentStep];
  const progressPercentage = ((currentStep + 1) / questions.length) * 100;

  if (loadingAi) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <PacmanLoader color="#4F46E5" size={30} />
        <div className="mt-8 text-xl font-semibold text-gray-700">
          {mentalStats[currentStatIndex]}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header and progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Survey</h1>
            <span className="text-sm text-gray-500">
              {currentStep + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            {questions[currentStep].question}
          </h2>
        </div>

        {/* Options */}
        <ul className="space-y-4 mb-8">
          {questions[currentStep].options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            return (
              <li key={index}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-inner"
                      : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="flex items-center px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          )}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => router.push("/questionnaire/talk")}>
            Talk to AI
          </Button>
        </div>
      </div>
    </div>
  );
}
