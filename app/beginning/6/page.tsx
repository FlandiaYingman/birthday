"use client";

import { CardContent } from "@/components/ui/card";
import { StylishText } from "@/app/beginning/StylishText";
import { EnteringEffect } from "@/app/beginning/EnteringEffect";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Beginning() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get("name") ?? "Janis";

  const [show, setShow] = useState(false);

  return (
    <EnteringEffect>
      <CardContent className="flex h-full w-full flex-col items-center justify-center gap-6 text-3xl">
        <StylishText
          text={`現在，${name}。\n要來聽歌嗎？`}
          callback={() => setShow(true)}
        />

        <div className={cn("space-x-8", show ? "" : "hidden")}>
          <Button
            className={cn(show ? "" : "hidden", "text-2xl")}
            onClick={() => {
              toast("不可以", {
                description: "不可以不聼",
              });
            }}
          >
            不好
          </Button>
          <Button
            className={cn(show ? "" : "hidden", "text-2xl")}
            onClick={() => {
              router.push(`/`);
            }}
          >
            好
          </Button>
        </div>
      </CardContent>
    </EnteringEffect>
  );
}
