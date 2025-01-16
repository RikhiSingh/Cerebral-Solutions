import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, SquareArrowOutUpRightIcon } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* CMHA */}
      <Card className="absolute w-[340px] -top-[30px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <Link
          href="https://cmha.ca/brochure/fast-facts-about-mental-illness/"
          target="_blank"
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
              <AvatarImage alt="CMHA Pic" src="/app-icons/dev/cmha-logo.png" />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <CardTitle className="text-lg">CMHA</CardTitle>
              <CardDescription>
                <div className="flex flex-row items-center">
                  <div>cmha.ca</div>
                  <div>
                    <SquareArrowOutUpRightIcon className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </CardDescription>
            </div>
          </CardHeader>
        </Link>

        <CardContent>
          <span className="font-bold inline bg-gradient-to-r from-[#59b642] via-[#10ac37] to-[#0bac2e] text-transparent bg-clip-text">
            1 in 5{" "}
          </span>
          people in Canada experience a mental health problem or illness
        </CardContent>
      </Card>

      {/* CAMH */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <Link
          href="https://www.camh.ca/en/driving-change/the-crisis-is-real/mental-health-statistics#:~:text=More%20than%2075%25%20of%20suicides,to%204%20times%20more%20often.&text=More%20than%20half%20of%20suicides%20involve%20people%20aged%2045%20or%20older."
          target="_blank"
        >
          <CardHeader className="mt-8 flex justify-center items-center pb-2">
            <Image
              src="/app-icons/dev/camh-logo.jpg"
              alt="user avatar"
              className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              width={150}
              height={150}
            />
            <CardTitle className="text-center inline ">
              The Centre for Addiction and Mental Health
            </CardTitle>
            <CardDescription className="font-normal text-primary">
              www.camh.ca
            </CardDescription>
          </CardHeader>
        </Link>
        <CardContent className="text-center pb-2">
          <p>
            39% of Ontario high-school students indicate a moderate-to-serious
            level of psychological distress (symptoms of anxiety and
            depression). A further 17% indicate a serious level of psychological
            distress.
          </p>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Cerebral Solutions
          </CardTitle>
          <div>
            <span className="text-2xl font-bold">15 Questions</span>
          </div>

          <CardDescription>
            Get advanced AI insights and personalized feedback.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Now</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["15 Questions", "AI Insights", "Personalized Feedback"].map(
              (benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>In-depth Analysis</CardTitle>
            <CardDescription className="text-md mt-2">
              Get instant clarity on your mental health needs and help.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
