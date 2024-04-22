"use client";

import React from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import ReactConfetti from "react-confetti";

export default Confetti;

function Confetti() {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      // style={{ width: "100%", height: "100%" }}
      width={width!}
      height={height!}
      numberOfPieces={200}
      wind={0}
      gravity={0.03}
      initialVelocityX={7}
      initialVelocityY={20}
      tweenDuration={10000}
    />
  );
}
