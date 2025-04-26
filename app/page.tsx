"use client";

import { AudioPlayer } from "@/app/AudioPlayer";
import Marquee from "@/components/ui/marquee";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="absolute top-0 w-full">
        <Marquee
          items={[
            "Happy Birthday",
            "生日快樂",
            "🎉🎂🎈",
            "Joyeux Anniversaire 🎉🎂🎈",
            "Intergalactic celebration 👽 of your planetary orbit cycle! 🛸🎂🌟",
          ]}
        />
      </div>
      <AudioPlayer />
    </main>
  );
}
