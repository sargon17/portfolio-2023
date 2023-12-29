"use client";
import React from "react";

import { useRef, useState } from "react";

import { motion, useMotionValue } from "framer-motion";

export default function OpenToWork({ onClick }: { onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse positions from -0.5 to 0.5
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const mouseMove = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef?.current?.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width - 0.5);
    setMouseY((e.clientY - rect.top) / rect.height - 0.5);
  };

  const mouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  const style = {
    "--mx": mouseX,
    "--my": mouseY,
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={mouseMove}
      onPointerLeave={mouseLeave}
      className="open-to-work"
      animate={style as any}
      transition={{ type: "tween", duration: 0.1 }}
      onClick={onClick}
    >
      <div style={{ perspective: "1000px" }}>
        <div>
          {/* Holographic glow */}
          <div className="holographic"></div>
        </div>
        <button>
          <div className="effects">
            {/* Holographic lighting */}
            <div className="holographic"></div>

            {/* Glare */}
            <div className="glare"></div>
          </div>

          {/* Overlay */}
          <div className="overlay"></div>
          <div className="content">Open to work</div>
        </button>
      </div>
    </motion.div>
  );
}
