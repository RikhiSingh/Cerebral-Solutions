"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrainCircuitIcon, LogInIcon, Menu, UserPlus2Icon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button";
import { SignUpButton } from "@/components/auth/signup-button";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#features",
    label: "About Us",
  },
  {
    href: "/questionnaire",
    label: "Questionnaire",
  },
  {
    href: "/#faq",
    label: "Services",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center"
            >
              <BrainCircuitIcon className="h-6 w-6 mr-2" />
              Cerebral Solutions
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button onClick={() => setIsOpen(true)} className="px-2">
                  <Menu className="flex md:hidden h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl flex flex-row items-center">
                    <BrainCircuitIcon className="h-6 w-6 mr-2" />
                    Cerebral Solutions
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <div className="flex gap-4">
                  <Button>
                    <LoginButton>
                      <div className="flex flex-row items-center">
                        <LogInIcon className="mr-2 w-5 h-5" />
                        Login
                      </div>
                    </LoginButton>
                  </Button>
                  <Button variant="outline">
                    <SignUpButton>
                      <div className="flex flex-row items-center">
                        <UserPlus2Icon className="mr-2 w-5 h-5" />
                        SignUp
                      </div>
                    </SignUpButton>
                  </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Button>
              <LoginButton>
                <div className="flex flex-row items-center">
                  <LogInIcon className="mr-2 w-5 h-5" />
                  Login
                </div>
              </LoginButton>
            </Button>
            <Button variant="outline">
              <SignUpButton>
                <div className="flex flex-row items-center">
                  <UserPlus2Icon className="mr-2 w-5 h-5" />
                  SignUp
                </div>
              </SignUpButton>
            </Button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
