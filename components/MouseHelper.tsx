import clsx from "clsx";
import { useLenis } from "@studio-freight/react-lenis";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/contexts/mouseStore";

import { motion, useMotionValue } from "framer-motion";
import { useDispatch } from "react-redux";
import { setScroll } from "@/contexts/features/mouse/scrollContent";

export default function MouseHelper() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const contentState = useSelector((state: RootState) => state.content.content);
  const mousePositionState = useSelector((state: RootState) => state.position.position);
  const mouseDimensionState = useSelector((state: RootState) => state.dimension.dimension);

  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(mousePositionState.x);
    y.set(mousePositionState.y + scrollPosition);
  }, [mousePositionState, scrollPosition]);

  const lenis = useLenis(handleScroll);

  function handleScroll(): any {
    // get the current scroll position
    setScrollPosition(window.scrollY);
    dispatch(setScroll({ scroll: window.scrollY }));
  }

  return (
    <motion.div
      className={clsx("mouse-helper", {
        "mouse-helper--active": contentState !== "",
      })}
      style={
        {
          x: x,
          y: y,
        } as any
      }
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        width: mouseDimensionState.width,
        height: mouseDimensionState.height,
      }}
      transition={{
        width: { duration: 0.3, ease: "backOut" },
        height: { duration: 0.3, ease: "backOut" },
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
