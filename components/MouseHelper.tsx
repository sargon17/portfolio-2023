import clsx from "clsx";
import { useLenis } from "@studio-freight/react-lenis";

import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { RootState } from "@/contexts/mouseStore";

import { motion } from "framer-motion";

export default function MouseHelper() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const contentState = useSelector((state: RootState) => state.content.content);
  const mousePositionState = useSelector((state: RootState) => state.position.position);
  const mouseDimensionState = useSelector((state: RootState) => state.dimension.dimension);

  const lenis = useLenis(handleScroll);

  const mouse = useRef<HTMLDivElement>(null);

  function handleScroll(): any {
    // get the current scroll position
    setScrollPosition(window.scrollY);
  }

  return (
    <motion.div
      className={clsx("mouse-helper", {
        "mouse-helper--active": contentState !== "",
      })}
      ref={mouse}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: mousePositionState.x,
        y: mousePositionState.y + scrollPosition,
        width: mouseDimensionState.width,
        height: mouseDimensionState.height,
      }}
      transition={{
        duration: 0.01,
        width: { duration: 0.05, ease: "backInOut" },
        height: { duration: 0.05, ease: "backInOut" },
      }}
    >
      {contentState !== "" && (
        <div className="mouse-helper__content">
          <motion.p
            key={contentState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
          >
            <RunningString>{contentState}</RunningString>
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}

function RunningString({ children }: { children: React.ReactNode }) {
  const printString = (string: string) => {
    let fullString = "";

    for (let i = 0; i < 20; i++) {
      fullString += `  •  ${string}`;
    }

    return fullString;
  };

  return (
    <div className="running-string">
      <div className="running-string__content">{printString(children as string)}</div>
    </div>
  );
}
