"use client";

import { CardContent } from "@/components/ui/card";
import { StylishText } from "@/app/beginning/StylishText";
import { EnteringEffect } from "@/app/beginning/EnteringEffect";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Beginning() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get("name") ?? "Janis";

  const [show, setShow] = useState(false);

  return (
    <EnteringEffect>
      <CardContent className="flex h-full w-full flex-col items-center justify-center gap-6 text-3xl">
        <StylishText
          text={
            `原來今天是你的生日！\n` +
            `那讓我來祝你生日快樂吧。\n` +
            `Happy birthday to you~ 🎉\r\n` +
            `Happy birthday to you~ 🎉\r\n` +
            `Happy birthday to ${name}~ 🎂\r\n` +
            `Happy birthday to you~ 🎉`
          }
          callback={() => setShow(true)}
        />

        <Button
          className={cn(show ? "" : "hidden", "text-2xl")}
          onClick={() => {
            const params = new URLSearchParams();
            params.set("name", name);
            router.push(`/beginning/5?${params}`);
          }}
        >
          好
        </Button>
      </CardContent>
    </EnteringEffect>
  );
}
