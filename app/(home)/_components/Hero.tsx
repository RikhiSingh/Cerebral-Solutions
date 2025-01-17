import { Button } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { BrainCircuitIcon } from "lucide-react";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:pt-32 md:pb-20 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-4xl lg:text-5xl font-bold 2xl:text-6xl">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Cerebral Solutions
              <br />
            </span>{" "}
            We are thinking <br />
          </h1>
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              about you
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Instantly get a preliminary assessment of your mental wellbeing.
        </p>

        <div className="flex flex-col gap-2 md:flex-row lg:mr-10 2xl:mr-0">
          <div className="flex-1">
            <Button className="w-full">
              <BrainCircuitIcon className="h-6 w-6 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
