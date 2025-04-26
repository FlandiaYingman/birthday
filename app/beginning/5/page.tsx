"use client";

import { CardContent } from "@/components/ui/card";
import { AsciiArtStylishText } from "@/app/beginning/StylishText";
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
        <AsciiArtStylishText
          text={
            "                          /^\\                            \n" +
            "               /         (/^\\)     /                     \n" +
            "          \\   ( \\         \\ /     ( \\     /^\\            \n" +
            "         / )   \\ |        _|_      \\ |   |/^\\|           \n" +
            "        | /    _|_        | |      _|_    \\ /            \n" +
            "        _|_    | |        | |      | |    _|_            \n" +
            "        | |    | |        | |      | |    | |            \n" +
            "        | |    | |    ****| |******| |    | |            \n" +
            "        | |****| |****    | |      | |****| |            \n" +
            "       *| |    | |                 | |    | |*****       \n" +
            "     *  | |   H  A  P  P  Y               | |      *     \n" +
            "    *                                               *    \n" +
            "    | *            B  I  R  T  H  D  A  Y  !      * |    \n" +
            "    |  *****                                 *****  |    \n" +
            "    |@      **********             **********      @|    \n" +
            "    | @   @           *************           @   @ |    \n" +
            "    |  @@@ @    @                       @    @ @@@  |    \n" +
            "    |       @@@@ @      @       @      @ @@@@       |    \n" +
            "     *            @@@@@@ @     @ @@@@@@            *     \n" +
            "      *                   @@@@@                   *      \n" +
            "       *****                                 *****       \n" +
            "            **********             **********            \n" +
            "                      *************                      "
          }
          callback={() => setShow(true)}
        />

        <Button
          className={cn(show ? "" : "hidden", "text-2xl")}
          onClick={() => {
            const params = new URLSearchParams();
            params.set("name", name);
            router.push(`/beginning/6?${params}`);
          }}
        >
          好
        </Button>
      </CardContent>
    </EnteringEffect>
  );
}
