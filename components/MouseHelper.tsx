import clsx from "clsx";
import { useLenis } from "@studio-freight/react-lenis";

import { useSelector } from "react-redux";
import { useLayoutEffect, useState, useRef } from "react";
import { RootState } from "@/contexts/mouseStore";

import { motion } from "framer-motion";

export default function MouseHelper() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mouseDimensions, setMouseDimensions] = useState({ width: 0, height: 0 });
  const [content, setContent] = useState("");
  const [isPositionFixed, setIsPositionFixed] = useState(false);

  const newContent = useSelector((state: RootState) => state.content.content);
  const mousePositionState = useSelector((state: RootState) => state.position.position);

  const mouseDimensionState = useSelector((state: RootState) => state.dimension.dimension);

  const fixedPosition = useSelector((state: RootState) => state.fixPosition.fixedPosition);

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
    if (fixedPosition.x !== 0 && fixedPosition.y !== 0) {
      setIsPositionFixed(true);
    } else {
      setIsPositionFixed(false);
    }
  }, [fixedPosition]);

  useLayoutEffect(() => {
    if (newContent !== content) {
      setContent(newContent);
    }
  }, [newContent]);

  useLayoutEffect(() => {
    if (mouseDimensionState) {
      setMouseDimensions(mouseDimensionState);
    }
  }, [mouseDimensionState]);

  useLayoutEffect(() => {
    if (mouse.current) {
      mouse.current.animate(
        [
          {
            width: `${mouseDimensions.width}px`,
            height: `${mouseDimensions.height}px`,
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
  }, [mouseDimensions]);

  useLayoutEffect(() => {
    if (!isPositionFixed) {
      if (mouse.current) {
        mouse.current.animate(
          [
            {
              transform: `translate(${10 + mousePosition.x}px, ${10 + mousePosition.y + scrollPosition}px)`,
            },
          ],
          {
            duration: 1200,
            fill: "forwards",
            delay: 10,
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.175)",
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
            delay: 10,
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.175)",
          }
        );
      }
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
        <motion.p
          key={content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
        >
          {content}
        </motion.p>
      </div>
    </div>
  );
}
