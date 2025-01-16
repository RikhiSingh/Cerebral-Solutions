import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, Globe2Icon, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "/app-icons/dev/rikhi.jpeg",
    name: "Rikhi Singh",
    position: "Lead Developer",
    description: "Lead Developer at Cerebral Solutions Team",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/rikhi-singh",
      },
      {
        name: "GitHub",
        url: "https://github.com/rikhisingh",
      },
    ],
  },
  {
    imageUrl: "/app-icons/dev/rikhi.jpeg",
    name: "Merrick Pilon",
    position: "Lead Developer",
    description: "Lead Developer at Cerebral Solutions Team",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/rikhi-singh",
      },
      {
        name: "GitHub",
        url: "https://github.com/rikhisingh",
      },
    ],
  },
  {
    imageUrl: "/app-icons/dev/rikhi.jpeg",
    name: "Harsh",
    position: "Lead Developer",
    description: "Lead Developer at Cerebral Solutions Team",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/rikhi-singh",
      },
      {
        name: "GitHub",
        url: "https://github.com/rikhisingh",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Instagram":
        return <Instagram size="20" />;

      case "GitHub":
        return <GithubIcon size="20" />;

      default:
        return <Globe2Icon size="20" />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground text-center">
        Meet our talented team of experts who are passionate about what they do.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(
          ({
            imageUrl,
            name,
            position,
            description,
            socialNetworks,
          }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <Image
                  width={96}
                  height={96}
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{description}</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
