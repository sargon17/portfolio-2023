import React from "react";

import { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/contexts/mouseStore";

import { getItemCenter } from "@/utils/utils";

type magnetPopsType = {
  children: React.ReactNode;
  force?: { x: number; y: number };
  returnToOrigin?: boolean;
  displayMagnetZone?: boolean;
  magnetZoneDiameter?: number;
};
export default function Magnet({
  children,
  force,
  returnToOrigin,
  displayMagnetZone,
  magnetZoneDiameter,
}: magnetPopsType) {
  const magnetZone = useRef<HTMLDivElement>(null);
  const element = useRef<HTMLDivElement>(null);

  const defaultForce = { x: 1, y: 4 };
  const defaultMagnetZoneDiameter = 300;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  const mousePositionState = useSelector((state: RootState) => state.position.position);

  if (!magnetZoneDiameter) {
    magnetZoneDiameter = defaultMagnetZoneDiameter;
  }

  // update mouse position
  useEffect(() => {
    if (mousePositionState) {
      setMousePosition(mousePositionState);
    }
  }, [mousePositionState]);

  useEffect(() => {
    if (element.current && magnetZone.current) {
      if (isMouseOver) {
        // get the magnet zone dimensions
        const { width, height } = magnetZone.current.getBoundingClientRect();
        const { left: magnetX, top: magnetY } = magnetZone.current.getBoundingClientRect();

        const { x: magnetXCenter, y: magnetYCenter } = getItemCenter(magnetZone.current);

        // get mouse position relative to element
        const xPosition = mousePosition.x - magnetXCenter;
        const yPosition = mousePosition.y - magnetYCenter;

        // get percentage of mouse position relative to element
        if (!force) {
          force = defaultForce;
        }
        const xPercent = (xPosition / width) * 50 * force.x;
        const yPercent = (yPosition / height) * 50 * force.y;

        // animate element position based on mouse position
        element.current.animate(
          [
            {
              transform: `translate(${xPercent}%, ${yPercent}%)`,
            },
          ],
          {
            duration: 1000,
            fill: "forwards",
          }
        );
      } else {
        if (returnToOrigin) {
          element.current.animate(
            [
              {
                transform: `translate(0%, 0%)`,
              },
            ],
            {
              duration: 1000,
              fill: "forwards",
            }
          );
        }
      }
    }
  }, [element, isMouseOver, mousePosition, magnetZone]);

  return (
    <div
      className="magnet"
      style={{
        border: displayMagnetZone ? "1px solid red" : "none",
        width: magnetZoneDiameter,
        height: magnetZoneDiameter,
      }}
      ref={magnetZone}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        className="magnet__inner"
        ref={element}
      >
        {children}
      </div>
    </div>
  );
}
