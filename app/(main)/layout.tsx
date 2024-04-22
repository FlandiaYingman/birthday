import React from "react";
import { Cake } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const GitHubUrl = "https://github.com/FlandiaYingman/birthday";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="-mx-8">
        <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-gradient-to-br from-[#fbbf24] to-[#ef4444] fixed top-0">
          <div className="flex items-center">
            <div className="mr-4">
              <Link href="/">
                <Cake className="w-8 h-8 text-white" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-x-6 font-semibold">
            <Link className="text-white hover:underline ml-auto" href="/about">
              About
            </Link>
            <Link className="text-white hover:underline" href={GitHubUrl}>
              <SiGithub className="w-8 h-8 text-white" />
            </Link>
          </div>
        </header>
      </div>
      {children}
    </>
  );
}
