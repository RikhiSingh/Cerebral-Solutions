import { JSX } from "react";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Take Quiz",
    description:
      "Take 15 Question Multiple Choice Quiz to understand your Mental Health being.",
  },
  {
    icon: <MapIcon />,
    title: "Pin Point Analysis",
    description:
      "Get a detailed analysis of your Mental Health and understand the areas that need improvement",
  },
  {
    icon: <PlaneIcon />,
    title: "Receive Instant Feedback",
    description: "Get personalized insights and feedback on your Mental Health",
  },
  {
    icon: <GiftIcon />,
    title: "Refine and Grow",
    description:
      "Get in touch with our support team to refine and grow your Mental Health",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Simply take a Multiple Choice Quiz to understand your Mental Health
        being.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
