"use client";

import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { EnteringEffect } from "@/app/beginning/EnteringEffect";
import { StylishText } from "@/app/beginning/StylishText";

export default function Beginning() {
  return (
    <EnteringEffect>
      <Link href="/beginning/1">
        <CardContent className="flex h-full w-full animate-pulse flex-col items-center justify-center gap-6 text-3xl">
          <StylishText text="點擊開始" />
        </CardContent>
      </Link>
    </EnteringEffect>
  );
}
