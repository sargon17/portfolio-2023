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
      <div className="gradient-1"></div>
      <div className="gradient-2"></div>
      <div className="gradient-3"></div>

      <div className="noise"></div>
    </div>
  );
}
