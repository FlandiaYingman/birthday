"use client";

import React, { FC, ReactElement } from "react";
import { AnimatePresence, motion } from "motion/react";

export const EnteringEffect: FC<{ children: ReactElement }> = ({
  children,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="h-full w-full"
        layout
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
