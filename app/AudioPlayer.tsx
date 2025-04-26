"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "@/components/ui/play";
import { PauseIcon } from "@/components/ui/pause";
import { VolumeIcon } from "@/components/ui/volume";
import { cn } from "@/lib/utils";
import { SongCombobox } from "@/app/SongCombobox";

// https://stackoverflow.com/questions/62846043/react-js-useeffect-with-window-resize-event-listener-not-working
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

const Songs = [
  {
    label: "Vanilla",
    value: "audio_a1497a53af.mp3",
  },
  {
    label: "Gardens",
    value: "gardens-stylish-chill-303261.mp3",
  },
  {
    label: "Groovy",
    value: "groovy-ambient-funk-201745.mp3",
  },
  {
    label: "Kugelsicher",
    value: "kugelsicher-by-tremoxbeatz-302838.mp3",
  },
  {
    label: "Lazy Day",
    value: "lazy-day-stylish-futuristic-chill-239287.mp3",
  },
  {
    label: "Jazz",
    value: "lounge-jazz-elevator-music-324902.mp3",
  },
];

export const AudioPlayer: FC = () => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState([1]);

  const [song, setSong] = useState("audio_a1497a53af.mp3");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const windowSize = useWindowSize();
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Resize canvas to be pixel-perfect
  useEffect(() => {
    const ratio = devicePixelRatio;
    const canvasParent = canvasParentRef.current!;
    const canvas = canvasRef.current!;
    const width = canvasParent.clientWidth;
    const height = canvasParent.clientHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.getContext("2d")?.scale(ratio, ratio);
  }, [windowSize]);

  // Create audio context
  // Note: React's strict mode might call this twice in development mode.
  const context = useMemo(() => {
    if (typeof window === "undefined") return undefined as never;

    console.log("AudioPlayer mounted, creating context");
    return new AudioContext();
  }, []);
  useEffect(() => {
    return () => {
      console.log("AudioPlayer unmounted, closing context");
      void context.close();
    };
  }, [context]);

  // Create audio nodes
  const [media, analyzer] = useMemo(() => {
    if (typeof window === "undefined") return [undefined, undefined] as never;

    console.log("AudioPlayer mounted, creating media node");

    const audio = new Audio(song);
    const node = context.createMediaElementSource(audio);

    const analyzer = context.createAnalyser();
    analyzer.fftSize = 4096;

    node.connect(analyzer);
    analyzer.connect(context.destination);

    return [audio, analyzer];
  }, [context, song]);

  // Play / Pause media
  useEffect(() => {
    if (playing) {
      if (context.state === "suspended") {
        void context.resume();
      }
      void media.play();
    } else {
      void media.pause();
    }
  });

  // Update duration / current time
  useEffect(() => {
    const updateDuration = () => {
      setDuration(media.duration);
    };
    const updateCurrent = () => {
      setCurrent(media.currentTime);
    };
    const updateVolume = () => {
      setVolume([media.volume]);
    };

    updateCurrent();
    updateDuration();

    media.addEventListener("loadedmetadata", updateDuration);
    media.addEventListener("timeupdate", updateCurrent);
    media.addEventListener("volumechange", updateVolume);

    return () => {
      media.removeEventListener("loadedmetadata", updateDuration);
      media.removeEventListener("timeupdate", updateCurrent);
      media.removeEventListener("volumechange", updateVolume);
    };
  }, [media]);

  function seekTo(time: number) {
    media.currentTime = time;
  }

  function changeVolume(volume: number) {
    media.volume = volume;
  }

  const render = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      requestAnimationFrame(render);
    } else {
      const styles = getComputedStyle(document.documentElement);
      const w = ctx.canvas.width / devicePixelRatio;
      const h = ctx.canvas.height / devicePixelRatio;

      const color = styles.getPropertyValue("--main");

      const count = analyzer.frequencyBinCount;
      const data = new Uint8Array(count);

      analyzer.getByteTimeDomainData(data);
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 2 * devicePixelRatio;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(-w / 2, h / 2);

      const dx = w / count;
      for (let x = 0, i = 0; i < count; i++) {
        const v = data[i] / 128;
        const y = (v * h) / 2;
        ctx.lineTo(x, y);
        x += dx;
      }

      ctx.lineTo(w + w / 2, h / 2);
      ctx.stroke();

      requestAnimationFrame(render);
    }
  }, [analyzer]);

  useEffect(() => {
    const id = requestAnimationFrame(render);
    return () => cancelAnimationFrame(id);
  }, [render]);

  return (
    <Card className="gap-2 p-6 pb-5">
      <Card
        ref={canvasParentRef}
        className="mb-3 h-60 w-md justify-center bg-black p-0 !shadow-none"
      >
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-2",
            playing ? "hidden" : "",
          )}
        >
          <span>Press ▶ key to begin...</span>
          <SongCombobox items={Songs} value={song} onValueChange={setSong} />
        </div>
        <canvas className={playing ? "" : "hidden"} ref={canvasRef} />
      </Card>
      <div className="flex flex-col gap-1">
        <Slider
          value={[current]}
          onValueChange={([time]) => seekTo(time)}
          min={0}
          max={duration}
          step={1}
        />
        <div className="flex flex-row justify-between">
          <span>{formatDuration(current)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Button onClick={() => setPlaying(!playing)}>
          {!playing ? (
            // Note: size property seems not working...
            <PlayIcon className="scale-125" />
          ) : (
            <PauseIcon className="scale-125" />
          )}
        </Button>
        <div className="flex flex-row items-center">
          <VolumeIcon className="scale-75" volume={volume[0]} />
          <Slider
            className="h-fit w-40"
            value={volume}
            onValueChange={([volume]) => changeVolume(volume)}
            min={0}
            max={1}
            step={1 / 100}
          />
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;
