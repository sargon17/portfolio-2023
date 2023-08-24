"use client";
import { type } from "os";
import React from "react";
import { useLayoutEffect, useState, useRef } from "react";

type GradientParams = {
  className?: string;
  styles?: object;
  width?: number;
  height?: number;
};

export default function Gradient({
  className,
  styles,

  width = 3258,
  height = 1000,
}: GradientParams) {
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;
  const gradientStyles = styles ? styles : {};

  return (
    <div className={gradientClass} style={gradientStyles}>
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
          <rect width={width} height={height} className="gradient-bg" />
          <g filter="url(#filter0_f_102_321)">
            <ellipse
              className="gradient-1"
              cx="829"
              cy="500"
              rx="1629"
              ry="300"
            />
            <ellipse
              className="gradient-2"
              cx="1645"
              cy="503"
              rx="845"
              ry="500"
            />
            <ellipse
              className="gradient-3"
              cx="2645"
              cy="03"
              rx="645"
              ry="350"
            />
          </g>
        </g>
      </svg>
      <div className="noise"></div>
    </div>
  );
}
