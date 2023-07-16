"use client";
import { type } from "os";
import React from "react";
import { useLayoutEffect, useState, useRef } from "react";

type GradientParams = {
  className?: string;
  styles?: object;
  animate?: boolean;
  animateParams?: object;
  animateStagger?: number[];
  width?: number;
  height?: number;
};

export default function Gradient({
  className,
  styles,
  animate = true,
  animateParams = { duration: 100, fill: "forwards", delay: 10 },
  animateStagger = [0.05, -0.1, 0.05],
  width = 3258,
  height = 1000,
}: GradientParams) {
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;
  const gradientStyles = styles ? styles : {};

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [gradientsParams, setGradientsParams] = useState([
    {
      cy: rand(0, height).toString(),
      cx: rand(0, width).toString(),
      rx: rand(width / 5, width).toString(),
      ry: rand(height / 5, height).toString(),
    },
    {
      cy: rand(0, height).toString(),
      cx: rand(0, width).toString(),
      rx: rand(width / 5, width).toString(),
      ry: rand(height / 5, height).toString(),
    },
    {
      cy: rand(0, height).toString(),
      cx: rand(0, width).toString(),
      rx: rand(width / 5, width).toString(),
      ry: rand(height / 5, height).toString(),
    },
  ]);

  const gradContainer = useRef<HTMLDivElement>(null);
  const gradient1 = useRef<SVGEllipseElement>(null);
  const gradient2 = useRef<SVGEllipseElement>(null);
  const gradient3 = useRef<SVGEllipseElement>(null);

  useLayoutEffect(() => {
    if (isMouseOver) {
      document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      });
    } else {
      document.removeEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      });
    }
  }, [isMouseOver]);

  useLayoutEffect(() => {
    // if animate is false, don't animate
    if (!animate) return;
    // on mouse move move the gradient
    if (gradient1.current && gradient2.current && gradient3.current && gradContainer.current) {
      const { xTransform, yTransform } = getMouseTransform();

      [gradient1, gradient2, gradient3].forEach((gradient, index) => {
        if (!gradient.current) return;
        gradient.current.animate(
          [
            {
              transform: `translate(${xTransform * animateStagger[index]}%, ${
                yTransform * animateStagger[index]
              }%)`,
            },
          ],
          animateParams
        );
      });
    }
  }, [mousePosition]);

  function getMouseTransform() {
    if (!gradContainer.current) return { xTransform: 0, yTransform: 0 };
    const { x, y } = mousePosition;
    const { width, height } = gradContainer.current.getBoundingClientRect();
    const xPercent = x / width;
    const yPercent = y / height;
    const xTransform = xPercent * 100;
    const yTransform = yPercent * 100;
    return { xTransform, yTransform };
  }

  function rand(min: number, max: number): Number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div
      className={gradientClass}
      style={gradientStyles}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={gradContainer}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        filter="url(#svg)"
        preserveAspectRatio="xMidYMin slice"
      >
        <g clipPath="url(#clip0_102_321)">
          <rect
            width={width}
            height={height}
            className="gradient-bg"
          />
          <g filter="url(#filter0_f_102_321)">
            <ellipse
              cx={gradientsParams[0]?.cx}
              cy={gradientsParams[0]?.cy}
              rx={gradientsParams[0]?.rx}
              ry={gradientsParams[0]?.ry}
              className="gradient-1"
              ref={gradient1}
            />
            <ellipse
              cx={gradientsParams[1]?.cx}
              cy={gradientsParams[1]?.cy}
              rx={gradientsParams[1]?.rx}
              ry={gradientsParams[1]?.ry}
              className="gradient-2"
              ref={gradient2}
            />
            <ellipse
              cx={gradientsParams[2]?.cx}
              cy={gradientsParams[2]?.cy}
              rx={gradientsParams[2]?.rx}
              ry={gradientsParams[2]?.ry}
              className="gradient-3"
              ref={gradient3}
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_102_321"
            x="0"
            y="0"
            width={width}
            height={height}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feBlend
              mode="screen"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="100"
              result="blurred"
            />
          </filter>
          <filter
            id="filter1_f_102_321"
            x="0"
            y="0"
            width={width}
            height={height}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="10"
              result="blurred"
            />
          </filter>
          <filter
            id="filter2_f_102_321"
            x="0"
            y="0"
            width={width}
            height={height}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="10"
              result="blurred"
            />
          </filter>

          <clipPath id="clip0_102_321">
            <rect
              width={width}
              height={height}
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
