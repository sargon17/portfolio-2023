import React from "react";

import { useSelector } from "react-redux";
import clsx from "clsx";
import { useLenis } from "@studio-freight/react-lenis";

import { useLayoutEffect, useState, useRef } from "react";
import { RootState } from "@/contexts/mouseStore";

export default function MouseHelper() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  const content = useSelector((state: RootState) => state.content.content);
  const mousePositionState = useSelector((state: RootState) => state.position.position);

  const lenis = useLenis(handleScroll);

  const mouse = useRef<HTMLDivElement>(null);

  function handleScroll(): any {
    // get the current scroll position
    setScrollPosition(window.pageYOffset);
  }

  useLayoutEffect(() => {
    if (mousePositionState) {
      setMousePosition(mousePositionState);
    }
  }, [mousePositionState]);

  useLayoutEffect(() => {
    if (mouse.current) {
      mouse.current.animate(
        [
          {
            transform: `translate(${10 + mousePosition.x}px, ${10 + mousePosition.y + scrollPosition}px)`,
          },
        ],
        {
          duration: 400,
          fill: "forwards",
          delay: 10,
          easing: "ease-in-out",
        }
      );
    }
  }, [mousePosition, scrollPosition]);

  return (
    <div
      className={clsx("mouse-helper", {
        "mouse-helper--active": content,
      })}
      ref={mouse}
    >
      <div className="mouse-helper__content">
        <p>{content}</p>
      </div>
    </div>
  );
}
