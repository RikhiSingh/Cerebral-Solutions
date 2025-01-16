import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Mental Health Insights",
    description:
      "Gain insights into your mental wellbeing and identify areas for improvement.",
    image: image4.src,
  },
  {
    title: "Practical Evaluation",
    description:
      "Receive practical evaluation of your business concept and identify areas for improvement.",
    image: image3.src,
  },
  {
    title: "Personalized Feedback",
    description:
      "Get personalized feedback on your business concept and identify areas for improvement.", 
    image: image.src,
  },
];

const featureList: string[] = [
  "AI Validation",
  "Practical Evaluation",
  "Personalized Feedback",
  "Mental Health Insights",
  "Many More+",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                width={300}
                height={300}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
