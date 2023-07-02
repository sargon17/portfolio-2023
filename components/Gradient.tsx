"use client";
import React from "react";
import { useLayoutEffect, useState, useRef } from "react";

type GradientParams = {
  className?: string;
  styles?: object;
};

export default function Gradient({ className, styles }: GradientParams) {
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;
  const gradientStyles = styles ? styles : {};

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  const gradContainer = useRef<HTMLDivElement>(null);
  const gradient1 = useRef<SVGPathElement>(null);
  const gradient2 = useRef<SVGPathElement>(null);
  const gradient3 = useRef<SVGPathElement>(null);

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
    // on mouse move move the gradient
    if (gradient1.current && gradient2.current && gradient3.current) {
      const { x, y } = mousePosition;
      const { width, height } = gradContainer.current.getBoundingClientRect();
      const xPercent = x / width;
      const yPercent = y / height;
      const xTransform = xPercent * 100;
      const yTransform = yPercent * 100;

      gradient1.current.animate(
        [
          { transform: `translate(${xTransform * 0.1}%, ${yTransform * 0.1}%)` },
          { transform: `translate(${xTransform * 0.1}%, ${yTransform * 0.1}%)` },
        ],
        {
          duration: 100,
          fill: "forwards",
          delay: 10,
        }
      );

      gradient2.current.animate(
        [
          { transform: `translate(${xTransform * -0.2}%, ${yTransform * -0.2}%)` },
          { transform: `translate(${xTransform * -0.2}%, ${yTransform * -0.2}%)` },
        ],
        {
          duration: 100,
          fill: "forwards",
          delay: 10,
        }
      );

      gradient3.current.animate(
        [
          { transform: `translate(${xTransform * 0.3}%, ${yTransform * 0.3}%)` },
          { transform: `translate(${xTransform * 0.3}%, ${yTransform * 0.3}%)` },
        ],
        {
          duration: 100,
          fill: "forwards",
          delay: 10,
        }
      );
    }
  }, [mousePosition]);

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
      >
        <g clip-path="url(#clip0_102_321)">
          <rect
            width="3258"
            height="3258"
            className="gradient-bg"
          />
          <g filter="url(#filter0_f_102_321)">
            <path
              d="M-578.317 2260.65C-1075.42 2299.08 -1743.95 1733 -1450.73 1329.51C-1233.64 1030.79 -390.872 1032.09 -97.5934 433.007C462.682 -711.475 -12.7906 -1275.14 1220.05 -956.065C2629.76 -591.213 4032.08 155.327 2860.14 1082.37C2188.44 1613.7 1995.55 455.322 1191.13 748.849C482.724 1007.34 36.9506 1903.03 36.9506 1903.03C36.9506 1903.03 -301.325 2239.24 -578.317 2260.65Z"
              className="gradient-1"
              ref={gradient1}
            />
          </g>
          <g filter="url(#filter1_f_102_321)">
            <path
              d="M-686.194 2139.04C-968.026 1727.76 -812.048 865.749 -316.008 917.947C51.2344 956.591 471.492 1687.1 1136.95 1641.54C2408.24 1554.51 2658.66 860.908 2998.75 2088.12C3387.63 3491.39 3442.27 5079.1 2053.45 4527.69C1257.46 4211.66 2164.2 3465.42 1507.79 2915.53C929.722 2431.28 -68.8543 2493.07 -68.8543 2493.07C-68.8543 2493.07 -529.152 2368.22 -686.194 2139.04Z"
              className="gradient-2"
              ref={gradient2}
            />
          </g>
          <g filter="url(#filter2_f_102_321)">
            <path
              d="M2397.72 1203.55C2215.53 1173.75 1915.65 903.012 1989.29 778.408C2043.81 686.157 2358.59 761.495 2414.88 563.865C2522.42 186.316 2379.85 98.6256 2868.49 327.256C3427.24 588.688 3744.51 887.509 3576.87 1069.01C3442.86 1214.12 3189.38 827.818 2900.33 837.242C2835.95 839.341 2743.14 1044.64 2595.68 1124.67C2524.36 1163.38 2499.24 1220.16 2397.72 1203.55Z"
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
