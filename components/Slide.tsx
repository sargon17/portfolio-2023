"use client";

import { use, useRef } from "react";

import { motion, useScroll, useMotionValueEvent, motionValue, useTransform } from "framer-motion";

export default function Slide({ children, id }: { children: React.ReactNode; id?: string }) {
  const slideRef: any = useRef(null);

  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  const enteringScale = useTransform(scrollYProgress, [0, 0.45], [0.8, 1]);
  const exitingScale = useTransform(scrollYProgress, [0.55, 1], [1, 0.8]);
  const scale = motionValue(1);

  const enteringOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const exitingOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  const opacity = motionValue(1);

  useMotionValueEvent(scrollYProgress, "renderRequest", () => {
    scale.set(scrollYProgress.get() > 0.5 ? exitingScale.get() : enteringScale.get());
    opacity.set(scrollYProgress.get() > 0.5 ? exitingOpacity.get() : enteringOpacity.get());
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
    scale.set(latest > 0.5 ? exitingScale.get() : enteringScale.get());

    opacity.set(latest > 0.5 ? exitingOpacity.get() : enteringOpacity.get());
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
        scale: scale,
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
          opacity: opacity,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
