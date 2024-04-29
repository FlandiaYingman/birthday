"use client";

import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { submitWish } from "@/app/(main)/main/server";
import { cn } from "@/lib/utils";

export default function WishArea() {
  const uuid = useRef(uuidv4());
  const [wish, setWish] = useState<string[]>([]);
  return (
    <Textarea
      className={cn(
        "max-w-md h-36",
        "bg-black bg-opacity-25 text-white placeholder:text-gray-200",
        "focus-visible:ring-0",
        "hover:scale-110",
        "focus:scale-110",
        "transition",
      )}
      placeholder="Make your heartfelt birthday wish here... "
      onChange={(e) => setWish(wish.concat(e.target.value))}
      onBlur={async () => await submitWish(uuid.current, wish)}
    />
  );
}
