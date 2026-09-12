"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function AnimatedNumber({
  value,
  duration = 2000,
  delay = 0,
}: {
  value: number;
  duration?: number;
  delay?: number;
}) {
  const count = useMotionValue(0);
  const display = useTransform(count, (current) => Math.round(current));

  return (
    <motion.span
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      onViewportEnter={() => animate(count, value, { duration: duration / 1000, delay })}
    >
      {display}
    </motion.span>
  );
}
