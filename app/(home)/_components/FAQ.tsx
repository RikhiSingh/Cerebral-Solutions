import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How does Cerebral Solutions work?",
    answer:
      "Cerebral Solutions uses advanced AI technology to provide mental health assessments. Users complete interactive questionnaires, and our system analyzes responses to track mental wellness over time. The platform provides personalized insights, progress tracking, and connects you with professional help when needed.",
    value: "item-1",
  },
  {
    question: "Is my data kept private and secure?",
    answer:
      "Yes, we take your privacy very seriously. All your data is encrypted and stored securely. Your personal information and assessment results are confidential and only accessible to you and the healthcare professionals you choose to share them with.",
    value: "item-2",
  },
  {
    question: "How often should I take the assessment?",
    answer:
      "We recommend taking the assessment regularly, ideally once a week, to maintain consistent tracking of your mental well-being. Regular assessments help identify patterns and changes in your mental health, allowing for better self-awareness and timely interventions when needed.",
    value: "item-3",
  },
  {
    question: "Can I use this platform alongside traditional therapy?",
    answer:
      "Absolutely! Cerebral Solutions is designed to complement traditional therapy. You can share your assessment results and progress tracking with your therapist to provide additional insights into your mental health journey. However, our platform is not a replacement for professional medical advice or treatment.",
    value: "item-4",
  },
  {
    question: "What should I do if I receive a concerning assessment result?",
    answer:
      "If you receive a concerning assessment result, our platform will provide immediate resources and recommend scheduling an appointment with a mental health professional. We have a network of qualified therapists available through our platform, and we can help connect you with appropriate support services.",
    value: "item-5",
  },
  {
    question: "How accurate are the AI-based assessments?",
    answer:
      "Our AI assessments are based on established psychological evaluation methods and are continuously refined through professional validation. While they provide valuable insights, they should be viewed as screening tools rather than clinical diagnoses. Always consult with mental health professionals for formal diagnoses and treatment plans.",
    value: "item-6",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "Yes! Our dashboard provides comprehensive progress tracking with visual charts and statistics. You can view your wellness trends, track your streak of completed assessments, and monitor your progress toward personal mental health goals. This helps you understand patterns in your mental well-being and identify factors that influence your mental health.",
    value: "item-7",
  },
  {
    question: "What kind of support is available if I need help?",
    answer:
      "We offer multiple levels of support: immediate access to crisis resources, the ability to schedule appointments with mental health professionals through our platform, educational resources, and wellness tips. Our 'Get Help' feature connects you with appropriate support based on your needs and assessment results.",
    value: "item-8",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="mailto:support@cerebralsolutions.com"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
