import type { Metadata } from "next";
import { IBM_Plex_Sans, Libre_Franklin } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import React from "react";
import Transitions, { Animate } from "@/components/transitions";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-ibm_plex_sans",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Janis! 🎉🎂🎈🎁🎊",
  description: "Happy Birthday to you! 🎉🎂🎈🎁🎊",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          libre_franklin.variable,
          ibm_plex_sans.variable,
          "bg-gradient-to-br from-[#fbbf24] to-[#ef4444]",
          "overflow-x-hidden px-8",
        )}
      >
        <Transitions className="h-full flex flex-col ">
          <Animate className="flex-1">{children}</Animate>
        </Transitions>
      </body>
    </html>
  );
}
