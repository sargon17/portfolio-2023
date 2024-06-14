"use client";

import { useRef, useEffect } from "react";

import { motion, useScroll, useMotionValueEvent, motionValue, useTransform } from "framer-motion";

export default function Slide({ children, id }: { children: React.ReactNode; id?: string }) {
  const slideRef: any = useRef(null);
  let isMobile = false;

  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"],
  });

  let enteringScale = useTransform(scrollYProgress, [0, 0.49], [0.75, 1]);
  // const exitingScale = useTransform(scrollYProgress, [0.49, 1], [1, 0.85]);
  const exitingScale = motionValue(1);
  const scale = motionValue(1);

  // on mobile disable scale animation
  if (isMobile) {
    enteringScale = motionValue(1);
  }

  const enteringOpacity = useTransform(scrollYProgress, [0.2, 0.49], [1, 0]);
  const exitingOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  const opacity = motionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      scale.set(latest > 0.49 ? exitingScale.get() : enteringScale.get());
      opacity.set(latest > 0.49 ? exitingOpacity.get() : enteringOpacity.get());
    }
  });

  const slideVariants = {
    initial: {},
    animate: {},
  };

  useEffect(() => {
    isMobile = window.innerWidth < 768;
  }, []);

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
      <motion.div className="content">{children}</motion.div>
      <motion.div
        className="overlay"
        style={{
          opacity: opacity || 0,
        }}
      ></motion.div>
    </motion.div>
  );
}
