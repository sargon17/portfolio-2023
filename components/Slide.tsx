"use client";

import { useRef, useEffect, use } from "react";

import { motion, useScroll, useMotionValueEvent, motionValue, useTransform } from "framer-motion";

export default function Slide({ children, id }: { children: React.ReactNode; id?: string }) {
  const slideRef: any = useRef(null);

  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const enteringScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const exitingScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
  const scale = motionValue(1);

  const enteringOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const exitingOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  const opacity = motionValue(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
    scale.set(latest > 0.49 ? exitingScale.get() : enteringScale.get());

    opacity.set(latest > 0.49 ? exitingOpacity.get() : enteringOpacity.get());
  });

  const slideVariants = {
    initial: {},
    animate: {},
  };

  return (
    <motion.div
      className="slide"
      ref={slideRef}
      variants={slideVariants}
      style={{
        scale: scale || 1,
      }}
      initial="initial"
      animate="animate"
    >
      <div
        className="anchor"
        id={id}
      ></div>
      <motion.div
        className="content"
        style={{
          opacity: opacity || 1,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
