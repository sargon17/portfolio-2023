"use client";
import React from "react";

import { MutableRefObject, useEffect, useRef } from "react";
import p5 from "p5";

type GradientParams = {
  className?: string;
};

export default function Gradient({ className }: GradientParams) {
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <div className={gradientClass}>
      <P5 />
      <div className="noise">P5</div>
    </div>
  );
}

function P5() {
  const canvasRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const sketch = (p: p5) => {
      let canvas: p5.Renderer;

      p.setup = () => {
        canvas = p.createCanvas(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        canvas.parent(canvasRef.current);
        p.noLoop();
      };

      p.draw = () => {
        p.background(255);
        p.stroke(0);
        p.strokeWeight(2);
        p.noFill();

        for (let i = 0; i < 100; i++) {
          p.beginShape();
          for (let j = 0; j < 100; j++) {
            p.vertex(p.random(p.width), p.random(p.height));
          }
          p.endShape(p.CLOSE);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={canvasRef}></div>;
}
