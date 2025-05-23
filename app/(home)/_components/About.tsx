import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                <span className="inline bg-gradient-to-r from-[#db7bba]  to-[#D247BF] text-transparent bg-clip-text">
                  Cerebral Solutions
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                The ultimate AI-driven mental health assessment platform. Our AI
                models harness the power of cutting-edge technology to provide
                accurate and personalized insights into your mental wellbeing.
                Get started today and take the first step towards a healthier by 
                taking a mental health assessment. Allow us to help you on your journey to mental wellness.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
