"use client";

import { motion } from "framer-motion";
import React, { Children, isValidElement } from "react";

// Davis ease — sine ease-in-out, calm and breathing.
const DAVIS_EASE = [0.44, 0, 0.56, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: Math.min(i, 6) * 0.06,
      ease: DAVIS_EASE,
    },
  }),
};

export default function RevealList({
  children,
}: {
  children: React.ReactNode;
}) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <ul className="flex flex-col divide-y divide-noir/10">
      {items.map((child, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </ul>
  );
}
