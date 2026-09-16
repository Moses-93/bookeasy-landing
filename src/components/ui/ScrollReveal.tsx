"use client";

import { motion } from "framer-motion";

const motionElements = {
    div: motion.div,
    h1: motion.h1,
    p: motion.p,
};

export function ScrollReveal({
    children,
    className = "",
    y = 30,
    delay = 0,
    fade = false,
    as = "div",
}: {
    children: React.ReactNode;
    className?: string;
    y?: number;
    delay?: number;
    fade?: boolean;
    as?: "div" | "h1" | "p";
}) {
    const MotionComponent = motionElements[as] || motion.div;

    return (
        <MotionComponent
            initial={{ opacity: 0, y: fade ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
            className={className}
        >
            {children}
        </MotionComponent>
    );
}