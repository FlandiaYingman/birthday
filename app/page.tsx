"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Splash() {
  return (
    <Link href="/main">
      <div
        className={cn(
          "flex items-center justify-center min-h-screen p-4 text-center",
          "cursor-pointer select-none",
        )}
      >
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white transition animate-scaling-110">
            It is <u>April 30, 2024</u>, <br /> a special day!
          </h1>
          <p className="text-lg text-white text-opacity-75 animate-pulse">
            Click anywhere to continue
          </p>
        </div>
      </div>
    </Link>
  );
}
