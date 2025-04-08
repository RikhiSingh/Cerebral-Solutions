"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("Subscribed!");
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our Weekly{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Join our newsletter to stay up to date with the latest news and
          updates!
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full gap-4 items-center justify-center flex-col md:flex-row">
            <Input
              placeholder="johndoe@gmail.com"
              className="bg-muted/50 dark:bg-muted/80 md:min-w-[400px] sm:min-w-[200px]"
              aria-label="email"
            />
            <Button>Subscribe</Button>
          </div>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
