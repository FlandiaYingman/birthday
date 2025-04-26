import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import FavIcon from "@/public/icon.svg";
import DarkFavIcon from "@/public/icon-dark.svg";

const fusionPixel = localFont({
  src: "./fonts/fusion-pixel-10px-proportional-zh_hant.woff2",
});

export const metadata: Metadata = {
  title: "Happy Birthday~",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: FavIcon.src,
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: DarkFavIcon.src,
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${fusionPixel.className} bg-secondary-lattice antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
