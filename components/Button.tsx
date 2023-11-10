import React from "react";

import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
};
export default function Button({ children, className, styles, onClick }: Props) {
  const baseClass = "button";
  const classNames = [baseClass, className].join(" ");

  const baseStyles: React.CSSProperties = {};
  const mergedStyles = { ...baseStyles, ...styles };

  return (
    <button
      className={classNames}
      style={mergedStyles}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </button>
  );
}
