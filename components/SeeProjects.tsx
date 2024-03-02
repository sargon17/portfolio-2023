import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { RootState } from "@/contexts/mouseStore";

import { useState, useRef, useEffect } from "react";

import { handleScrollToElement } from "@/utils/utils";

import { motion, useAnimate, motionValue, useSpring, useMotionValueEvent } from "framer-motion";

export default function SeeProjects() {
  const dispatch = useDispatch();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const mousePosition = useSelector((state: RootState) => state.position.position);

  const [scope, animate] = useAnimate();

  const [isMouseOverElement, setIsMouseOverElement] = useState(false);

  const element = useRef<HTMLDivElement>(null);

  const magnetSpringConfig = {
    stiffness: 100,
    damping: 12,
  };

  const xMagnetSpring = useSpring(0, magnetSpringConfig);

  const yMagnetSpring = useSpring(0, magnetSpringConfig);

  const xSlide1Spring = useSpring(0, magnetSpringConfig);
  const rotateSlide1Spring = useSpring(0, magnetSpringConfig);

  const xSlide2Spring = useSpring(0, magnetSpringConfig);
  const rotateSlide2Spring = useSpring(0, magnetSpringConfig);

  const xSlide3Spring = useSpring(0, magnetSpringConfig);
  const rotateSlide3Spring = useSpring(0, magnetSpringConfig);

  useEffect(() => {
    if (scope.current && element.current) {
      const { x, y } = mousePosition;

      const { width, height } = scope.current.getBoundingClientRect();

      //get element x and y position
      const elementY = element.current.getBoundingClientRect().top;

      const magnetX = scope.current.getBoundingClientRect().left;
      const magnetXCenter = magnetX + width / 2;

      //get mouse position relative to element
      const xPosition = x - magnetXCenter;
      const yPosition = y - elementY;

      const xPercent = (xPosition / width) * 50;
      const yPercent = (yPosition / height) * 20;

      if (isMouseOver) {
        xMagnetSpring.set(xPercent * 5);
        yMagnetSpring.set(yPercent * 10);
      } else {
        xMagnetSpring.set(0);
        yMagnetSpring.set(0);
      }
      if (isMouseOverElement) {
        const baseSingleTransforms = [
          {
            x: -150,
            rotate: -15,
          },
          {
            x: 0,

            rotate: 0,
          },
          {
            x: 150,
            rotate: 15,
          },
        ];

        xSlide1Spring.set(baseSingleTransforms[0].x + xPercent * 3);
        rotateSlide1Spring.set(baseSingleTransforms[0].rotate);

        xSlide2Spring.set(baseSingleTransforms[1].x + xPercent);
        rotateSlide2Spring.set(baseSingleTransforms[1].rotate);

        xSlide3Spring.set(baseSingleTransforms[2].x + xPercent * -1);
        rotateSlide3Spring.set(baseSingleTransforms[2].rotate);
      } else {
        xSlide1Spring.set(0);
        rotateSlide1Spring.set(0);

        xSlide2Spring.set(0);
        rotateSlide2Spring.set(0);

        xSlide3Spring.set(0);
        rotateSlide3Spring.set(0);
      }
    }
  }, [mousePosition, isMouseOverElement]);

  return (
    <div
      className="magnet-animation-box"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={scope}
    >
      <motion.div
        className="see-projects"
        id="see-projects"
        onMouseEnter={() => {
          setIsMouseOverElement(true);
          dispatch(setDimension({ width: 150, height: 150 }));
          dispatch(setContent("See more"));
        }}
        onMouseLeave={() => {
          setIsMouseOverElement(false);
          dispatch(setDimension({ width: 10, height: 10 }));
          dispatch(setContent(""));
        }}
        onClick={() => {
          handleScrollToElement("#_projects");
        }}
        ref={element}
        style={
          {
            x: xMagnetSpring,
            y: yMagnetSpring,
          } as any
        }
      >
        <div className="see-projects__cta">
          <div className="see-projects__cta__text">
            <p>
              Give a look to my <span className="accent">Projects</span>
            </p>
          </div>
        </div>
        <div className="see-projects__slides">
          <motion.div
            className="see-projects__slides__slide slide-1"
            style={
              {
                x: xSlide1Spring,
                y: "-20%",
                rotate: rotateSlide1Spring,
              } as any
            }
          >
            <div className="see-projects__slides__slide__image">
              <img
                src="/preview-3.jpg"
                alt="slide-1"
                width={300}
                height={300}
              />
            </div>
          </motion.div>
          <motion.div
            className="see-projects__slides__slide slide-2 "
            style={
              {
                x: xSlide2Spring,
                y: "-20%",
                rotate: rotateSlide2Spring,
              } as any
            }
          >
            <div className="see-projects__slides__slide__image">
              <img
                src="/preview-2.jpg"
                alt="slide-2"
                width={300}
                height={300}
              />
            </div>
          </motion.div>
          <motion.div
            className="see-projects__slides__slide slide-3"
            style={
              {
                x: xSlide3Spring,
                y: "-20%",
                rotate: rotateSlide3Spring,
              } as any
            }
          >
            <div className="see-projects__slides__slide__image">
              <img
                src="/preview-1.jpg"
                alt="slide-3"
                width={300}
                height={300}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
