"use client";

import { motion } from "framer-motion";
import React from "react";

// Davis ease — sine ease-in-out, calm and breathing.
const DAVIS_EASE = [0.44, 0, 0.56, 1] as const;

interface Props {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "header" | "article";
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  y = 10,
  as = "div",
  className,
}: Props) {
  const MotionTag =
    as === "section"
      ? motion.section
      : as === "header"
        ? motion.header
        : as === "article"
          ? motion.article
          : motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.4, ease: DAVIS_EASE, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
