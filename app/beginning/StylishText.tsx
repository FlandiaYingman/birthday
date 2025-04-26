"use client";

import { FC, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import useSound from "use-sound";

export const StylishText: FC<{
  text: string;
  callback?: () => void;
}> = ({ text, callback = () => {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const [displayLength, setDisplayLength] = useState(0);

  const [play] = useSound("/dialogue.mp3");

  useEffect(() => {
    if (!inView) return;
    let delay = 250;
    if (displayLength !== 0) {
      if (text[displayLength - 1] === "," || text[displayLength - 1] === "，") {
        delay = 500;
      }
      if (
        text[displayLength - 1] === "." ||
        text[displayLength - 1] === "。" ||
        text[displayLength - 1] === "?" ||
        text[displayLength - 1] === "？" ||
        text[displayLength - 1] === "!" ||
        text[displayLength - 1] === "！"
      ) {
        delay = 750;
      }
    }
    if (text[displayLength] === "\r") {
      delay = 1000;
    }
    setTimeout(() => {
      if (displayLength === text.length) {
        callback();
        return;
      }
      play();
      setDisplayLength(displayLength + 1);
    }, delay);
  }, [callback, displayLength, inView, play, text, text.length]);

  return (
    <motion.div className="flex items-center justify-center" ref={ref}>
      <span className="text-main-foreground text-center text-3xl font-bold whitespace-pre-wrap">
        {text.substring(0, displayLength)}
        <span className="animate-blink">|</span>
      </span>
    </motion.div>
  );
};

export const AsciiArtStylishText: FC<{
  text: string;
  callback?: () => void;
}> = ({ text, callback = () => {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const [displayLength, setDisplayLength] = useState(0);

  const [play] = useSound("/dialogue.mp3");

  useEffect(() => {
    if (!inView) return;
    const delay = 250;
    setTimeout(() => {
      console.log(displayLength);
      if (displayLength >= text.length) {
        callback();
        return;
      }
      play();
      const next = text.indexOf("\n", displayLength);
      if (next < 0) {
        setDisplayLength(text.length);
      } else {
        setDisplayLength(next + 1);
      }
    }, delay);
  }, [callback, displayLength, inView, play, text, text.length]);

  return (
    <motion.div className="flex items-center justify-center" ref={ref}>
      <span className="text-main-foreground text-left font-mono text-xs font-bold whitespace-pre">
        {text.substring(0, displayLength)}
        <span className="animate-blink">|</span>
      </span>
    </motion.div>
  );
};
