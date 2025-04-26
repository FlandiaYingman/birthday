"use client";

import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { StylishText } from "@/app/beginning/StylishText";
import { EnteringEffect } from "@/app/beginning/EnteringEffect";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Beginning() {
  const router = useRouter();
  const [name, setName] = useState("");

  const confirm = () => {
    switch (name.toLowerCase()) {
      case "janis":
      case "magicwand":
      case "dnawcigam":
        const params = new URLSearchParams();
        params.set("name", name);
        router.push(`/beginning/2?${params}`);
        return;
      case "harry":
      case "flandia":
        toast(`Access Denied for "${name}"`, {
          description: "你沒有自己的名字嗎？",
        });
        return;
      default:
        toast(`Access Denied for "${name}"`, {
          description: "你不是 Janis …… 👁️👁️",
        });
        return;
    }
  };

  return (
    <EnteringEffect>
      <CardContent className="flex h-full w-full flex-col items-center justify-center gap-6 text-3xl">
        <StylishText text="你的名字是……" />
        <Input
          className="w-fit py-6 text-2xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="text-2xl" onClick={confirm}>
          確認
        </Button>
      </CardContent>
    </EnteringEffect>
  );
}
