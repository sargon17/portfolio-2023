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
};

export default function Gradient({
  className,
  styles,
  animate = true,
  animateParams = { duration: 100, fill: "forwards", delay: 10 },
  animateStagger = [0.05, -0.1, 0.05],
}: GradientParams) {
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;
  const gradientStyles = styles ? styles : {};

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [gradientsParams, setGradientsParams] = useState({
    gradient1: {
      cy: "0",
      cx: "0",
      rx: "0",
      ry: "0",
    },
    gradient2: {
      cy: "0",
      cx: "0",
      rx: "0",
      ry: "0",
    },
    gradient3: {
      cy: "0",
      cx: "0",
      rx: "0",
      ry: "0",
    },
  });

  const gradContainer = useRef<HTMLDivElement>(null);
  const gradient1 = useRef<SVGEllipseElement>(null);
  const gradient2 = useRef<SVGEllipseElement>(null);
  const gradient3 = useRef<SVGEllipseElement>(null);

  useLayoutEffect(() => {
    for (let i = 0; i < 3; i++) {
      setGradientsParams((prevState) => ({
        ...prevState,
        [`gradient${i + 1}`]: {
          cy: rand(10, 1258).toString(),
          cx: rand(10, 3258).toString(),
          rx: rand(1000, 3258 / 2).toString(),
          ry: rand(1000, 3258 / 2).toString(),
        },
      }));
    }
  }, []);

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
        width="3259"
        height="3258"
        viewBox="0 0 3258 3258"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        filter="url(#svg)"
        preserveAspectRatio="xMidYMin slice"
      >
        <g clip-path="url(#clip0_102_321)">
          <rect
            width="3258"
            height="3258"
            className="gradient-bg"
          />
          <g filter="url(#filter0_f_102_321)">
            <ellipse
              cx={gradientsParams.gradient1?.cx}
              cy={gradientsParams.gradient1?.cy}
              rx={gradientsParams.gradient1?.rx}
              ry={gradientsParams.gradient1?.ry}
              className="gradient-1"
              ref={gradient1}
            />
            <ellipse
              cx={gradientsParams.gradient2?.cx}
              cy={gradientsParams.gradient2?.cy}
              rx={gradientsParams.gradient2?.rx}
              ry={gradientsParams.gradient2?.ry}
              className="gradient-2"
              ref={gradient2}
            />
            <ellipse
              cx={gradientsParams.gradient3?.cx}
              cy={gradientsParams.gradient3?.cy}
              rx={gradientsParams.gradient3?.rx}
              ry={gradientsParams.gradient3?.ry}
              className="gradient-3"
              ref={gradient3}
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_102_321"
            x="-2296.45"
            y="-1818.44"
            width="6367.78"
            height="4854.94"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            />
            <feBlend
              mode="screen"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="200"
              result="blurred"
            />
          </filter>
          <filter
            id="filter1_f_102_321"
            x="-1599.71"
            y="141.679"
            width="5610.77"
            height="5272.2"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="200"
              result="blurred"
            />
          </filter>
          <filter
            id="filter2_f_102_321"
            x="1203.88"
            y="-571.959"
            width="3191.8"
            height="2552.48"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="200"
              result="blurred"
            />
          </filter>

          <clipPath id="clip0_102_321">
            <rect
              width="3258"
              height="3258"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
