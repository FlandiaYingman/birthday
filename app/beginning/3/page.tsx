"use client";

import { CardContent } from "@/components/ui/card";
import { StylishText } from "@/app/beginning/StylishText";
import { EnteringEffect } from "@/app/beginning/EnteringEffect";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { toast } from "sonner";

export default function Beginning() {
  const router = useRouter();

  const params = useSearchParams();
  const name = params.get("name") ?? "Janis";

  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 0, 1));

  return (
    <EnteringEffect>
      <CardContent className="flex h-full w-full flex-col items-center justify-center gap-6 text-3xl">
        <StylishText
          text={`那麽，\r是在哪一天呢？`}
          callback={() => setShow(true)}
        />
        <Calendar
          defaultMonth={new Date(2025, 0)}
          mode="single"
          className={show ? "" : "hidden"}
          selected={date}
          onSelect={setDate}
        />
        <Button
          className="text-2xl"
          onClick={() => {
            if (!date) return;
            if (date.getDate() == 30 && date.getMonth() == 3) {
              const params = new URLSearchParams();
              params.set("name", name);
              router.push(`/beginning/4?${params}`);
              return;
            }
            if (date.getDate() == 7 && date.getMonth() == 7) {
              toast(`按你的啦`, {
                description: "幹嘛又按我的",
              });
              return;
            }
            toast(
              `Access Denied for ${new Intl.DateTimeFormat("zh-HK").format(date)}`,
              {
                description: "這是誰的生日",
              },
            );
          }}
        >
          就在這一天！
        </Button>
      </CardContent>
    </EnteringEffect>
  );
}
