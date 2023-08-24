import clsx from "clsx";
import { useLenis } from "@studio-freight/react-lenis";

import { useSelector } from "react-redux";
import { useLayoutEffect, useState, useRef } from "react";
import { RootState } from "@/contexts/mouseStore";

import { motion } from "framer-motion";

export default function MouseHelper() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPositionFixed, setIsPositionFixed] = useState(false);

  const contentState = useSelector((state: RootState) => state.content.content);
  const mousePositionState = useSelector(
    (state: RootState) => state.position.position
  );

  const mouseDimensionState = useSelector(
    (state: RootState) => state.dimension.dimension
  );

  const fixedPosition = useSelector(
    (state: RootState) => state.fixPosition.fixedPosition
  );

  const lenis = useLenis(handleScroll);

  const mouse = useRef<HTMLDivElement>(null);

  function handleScroll(): any {
    // get the current scroll position
    setScrollPosition(window.pageYOffset);
  }

  useLayoutEffect(() => {
    if (fixedPosition.x !== 0 && fixedPosition.y !== 0) {
      setIsPositionFixed(true);
    } else {
      setIsPositionFixed(false);
    }
  }, [fixedPosition]);

  useLayoutEffect(() => {
    if (mouse.current) {
      mouse.current.animate(
        [
          {
            width: `${mouseDimensionState.width}px`,
            height: `${mouseDimensionState.height}px`,
          },
        ],
        {
          duration: 300,
          fill: "forwards",
          delay: 10,
          // bouncy easing
          easing: "cubic-bezier(0.175, 0.885, 0.32, 1.175)",
        }
      );
    }
  }, [mouseDimensionState]);

  useLayoutEffect(() => {
    if (!isPositionFixed) {
      if (mouse.current) {
        mouse.current.animate(
          [
            {
              transform: `translate(${10 + mousePositionState.x}px, ${
                10 + mousePositionState.y + scrollPosition
              }px)`,
            },
          ],
          {
            duration: 800,
            fill: "forwards",
            // delay: 10,
          }
        );
      }
    } else {
      if (mouse.current) {
        mouse.current.animate(
          [
            {
              transform: `translate(${fixedPosition.x}px, ${fixedPosition.y}px)`,
            },
          ],
          {
            duration: 400,
            fill: "forwards",
            // delay: 10,
          }
        );
      }
    }
  }, [mousePositionState, scrollPosition]);

  return (
    <div
      className={clsx("mouse-helper", {
        "mouse-helper--active": contentState !== "",
      })}
      ref={mouse}
    >
      <div className="mouse-helper__content">
        <motion.p
          key={contentState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
        >
          {contentState}
        </motion.p>
      </div>
    </div>
  );
}
