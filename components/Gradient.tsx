"use client";
import React from "react";

type GradientParams = {
  className?: string;
  styles?: object;
  width?: number;
  height?: number;
};

export default function Gradient({ className, styles }: GradientParams) {
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;
  const gradientStyles = styles ? styles : {};

  return (
    <div
      className={gradientClass}
      style={gradientStyles}
    >
      <svg
        width="2000"
        height="2000"
        viewBox={`0 0 2000 2000`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        filter="url(#svg)"
        preserveAspectRatio="xMidYMin slice"
      >
        <g clipPath="url(#clip0_102_321)">
          <rect
            width="2000"
            height="2000"
            className="gradient-bg"
          />
          <g filter="url(#filter0_f_102_321)">
            <ellipse
              className="gradient-1"
              cx="829"
              cy="1000"
              rx="1629"
              ry="600"
            />
            <ellipse
              className="gradient-2"
              cx="145"
              cy="10"
              rx="845"
              ry="1000"
            />
            <ellipse
              className="gradient-3"
              cx="645"
              cy="0"
              rx="645"
              ry="700"
            />
          </g>
        </g>
      </svg>
      <div className="noise"></div>
    </div>
  );
}
