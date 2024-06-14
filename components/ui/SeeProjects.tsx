"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/mouseStore";

import { useState, useRef, useEffect, useMemo } from "react";

import { handleScrollToElement } from "@/utils/utils";

import MouseActivation from "./mouse/MouseActivation";

import { motion, useAnimate, useSpring } from "framer-motion";
import { MotionValue } from "framer-motion";
import getPost from "@/utils/notion";

import Image from "next/image";

type SeeProjectsProps = {
  projects: any[];
};
export default function SeeProjects(props: SeeProjectsProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const mousePosition = useSelector((state: RootState) => state.position.position);

  const projectsMedia = useMemo(() => {
    let media: { url: string; type: string }[] = [];

    for (let i = 2; i >= 0; i--) {
      let prj = getPost(props.projects[i]);

      if (prj.video) {
        media = media ? [...media, { url: prj.video, type: "video" }] : [{ url: prj.video, type: "video" }];
      }
      if (prj.image) {
        media = media ? [...media, { url: prj.image, type: "image" }] : [{ url: prj.image, type: "image" }];
      }
    }
    return media;
  }, [props.projects]);

  useEffect(() => {
    console.log(projectsMedia);
  }, [projectsMedia]);

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
      <MouseActivation
        onActive={{
          label: "see the projects",
          width: 150,
          height: 150,
        }}
      >
        <motion.div
          className="see-projects"
          id="see-projects"
          onMouseEnter={() => {
            setIsMouseOverElement(true);
          }}
          onMouseLeave={() => {
            setIsMouseOverElement(false);
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
            <Media
              media={projectsMedia[0]}
              x={xSlide1Spring}
              rotate={rotateSlide1Spring}
            />
            <Media
              media={projectsMedia[1]}
              x={xSlide2Spring}
              rotate={rotateSlide2Spring}
            />
            <Media
              media={projectsMedia[2]}
              x={xSlide3Spring}
              rotate={rotateSlide3Spring}
            />
          </div>
        </motion.div>
      </MouseActivation>
    </div>
  );
}

type MediaProps = {
  media: { url: string; type: string };
  x: MotionValue<any>;
  rotate: MotionValue<any>;
};
const Media = (props: MediaProps) => {
  return (
    <motion.div
      className="see-projects__slides__slide slide-3"
      style={
        {
          x: props.x,
          y: "-20%",
          rotate: props.rotate,
        } as any
      }
    >
      <div className="see-projects__slides__slide__image">
        {props.media && props.media.type === "image" ? (
          <Image
            src={props.media.url}
            alt="slide-3"
            width={300}
            height={300}
            objectFit="cover"
          />
        ) : (
          <video
            src={props.media.url}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </div>
    </motion.div>
  );
};
