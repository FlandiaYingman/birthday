"use client";

import { CardContent } from "@/components/ui/card";
import { StylishText } from "@/app/beginning/StylishText";
import { EnteringEffect } from "@/app/beginning/EnteringEffect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
            `你好，${name}。\n好久不見。\r\n` + `你還記得你的生日\n在哪一天嗎？`
          }
          callback={() => setShow(true)}
        />
        <div className={cn("space-x-8", show ? "" : "hidden")}>
          <Button
            className="text-2xl"
            onClick={() => {
              toast(``, {
                description: "不可以按這個，換另外一個按",
              });
            }}
          >
            不記得
          </Button>
          <Button
            className="text-2xl"
            onClick={() => {
              const params = new URLSearchParams();
              params.set("name", name);
              router.push(`/beginning/3?${params}`);
            }}
          >
            記得
          </Button>
        </div>
      </CardContent>
    </EnteringEffect>
  );
}
