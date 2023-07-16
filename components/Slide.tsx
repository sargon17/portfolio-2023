import React from "react";

export default function Slide({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className="slide">
      <div
        className="anchor"
        id={id}
      ></div>
      {children}
    </div>
  );
}
