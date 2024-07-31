"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { textToLetters, getItemCenter, getDistance } from "@/utils/utils";

// animations
import { motion, AnimatePresence, useAnimate } from "framer-motion";

import DescriptionBox from "./ui/projects/DescriptionBox";

import Tags from "./ui/tag/Tags";

// types
import projectType from "@/types/project";

import ProjectsNavigation from "./ui/projects/ProjectsNavigation";
import MouseActivation from "./ui/mouse/MouseActivation";

import Button from "./ui/Button";

import getPost from "@/utils/notion";

type ProjectsProps = {
  projects: any[];
};
export default function Projects(props: ProjectsProps) {
  const card = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<any | null>(props.projects[0] || null);

  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardMousePosition = (e: MouseEvent) => {
      if (!card.current) return;
      const itemTop = card.current?.getBoundingClientRect().top || 0;
      const itemLeft = card.current?.getBoundingClientRect().left || 0;

      card.current.style.setProperty("--x-pos", `${e.clientX - itemLeft}`);
      card.current.style.setProperty("--y-pos", `${e.clientY - itemTop}`);
    };

    window.addEventListener("mousemove", (e) => cardMousePosition(e));

    return () => {
      window.removeEventListener("mousemove", (e) => cardMousePosition(e));
    };
  }, []);

  return (
    <div
      className="projects-page"
      ref={page}
    >
      <Navigation
        projects={props.projects}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />

      <AnimatePresence>
        <motion.div
          className="project"
          key={activeProject?.id}
        >
          <div className="project__main-data">
            <MulticolorTitle title={getPost(activeProject).title} />
            <Data project={activeProject} />
          </div>
          <div className="project__content">
            <Media project={activeProject} />
            <div
              className="project__content__description"
              ref={card}
            >
              <DescriptionBox activeProject={activeProject} />
              <Tags className="project__content__tags">
                {getPost(activeProject).tags.map((tag: string, index: number) => {
                  return (
                    <motion.div
                      key={tag + index + activeProject?._id}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.9 + index * 0.1, duration: 0.5 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <Tags.Item
                        key={tag}
                        className="project__content__description__tags__item"
                      >
                        {tag}
                      </Tags.Item>
                    </motion.div>
                  );
                })}
              </Tags>

              {getPost(activeProject).link && (
                <>
                  <motion.a
                    className="project__content__description__link"
                    key={activeProject?._id}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 1.2, duration: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                    href={getPost(activeProject).link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>see it yourself</Button>
                  </motion.a>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type MediaProps = {
  project: any;
};
const Media = (props: MediaProps) => {
  return (
    <MouseActivation
      onActive={{
        label: "see the project",
        width: 100,
        height: 100,
      }}
      className="project__content__image"
    >
      <motion.a
        key={props.project?.id}
        layoutId={props.project?.id + "image"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
        href={getPost(props.project).link}
        target="_blank"
        rel="noreferrer"
        exit={{ opacity: 0 }}
      >
        {getPost(props.project).video ? (
          <video
            src={getPost(props.project).video}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={getPost(props.project).image}
            alt=""
          />
        )}
      </motion.a>
    </MouseActivation>
  );
};

type DataProps = {
  project: any;
};

const Data = (props: DataProps) => {
  const text = new Date(getPost(props.project).date).getFullYear().toString().toString();
  const chars = text.split("");

  const lettersVariants = {
    initial: {
      opacity: 0,
      y: -40,
    },
    animate: (index: number) => {
      return {
        opacity: 1,
        y: 0,

        transition: {
          delay: 0.1 + index * 0.02,
          duration: 0.5,
          ease: "backOut",
        },
      };
    },
    exit: (index: number) => {
      return {
        opacity: 0,
        y: 40,

        transition: {
          delay: index * 0.02,
          duration: 0.5,
          ease: "backOut",
        },
      };
    },
  };

  return (
    <div className="project__main-data__year">
      <div>
        {chars.map((char, index) => {
          return (
            <motion.div
              key={char + index}
              className="year__char"
              variants={lettersVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={index}
            >
              {char}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const MulticolorTitle = ({ title }: { title: string }) => {
  const printTitle = (title: string) => {
    const letters = textToLetters(title);
    return letters.map((letter, index) => {
      return (
        <Letter
          key={letter + index}
          letter={letter}
          index={index}
        />
      );
    });
  };

  return (
    <div className="project__main-data__title">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.1, duration: 0.5 },
        }}
      >
        {printTitle(title || "")}
      </motion.h2>
    </div>
  );
};

const Letter = ({ letter, index }: { letter: string; index: number }) => {
  const letterRef = useRef<HTMLSpanElement>(null);

  const mixColors = (color1: string, color2: string, weight: number) => {
    // mix two colors together with a weight from 0 to 1 (0 = color1, 1 = color2)

    const d2h = (d: number) => d.toString(16); // convert a decimal value to hex
    const h2d = (h: string) => parseInt(h, 16); // convert a hex value to decimal

    let color = "#";

    for (let i = 1; i <= 6; i += 2) {
      const v1 = h2d(color1.substring(i, i + 2));
      const v2 = h2d(color2.substring(i, i + 2));
      let val = d2h(Math.floor(v2 + (v1 - v2) * weight));

      while (val.length < 2) {
        val = "0" + val;
      }

      color += val;
    }

    return color;
  };

  useEffect(() => {
    if (!letterRef.current) return;
    const letterColorAnimation = (e: MouseEvent) => {
      if (!letterRef.current) return;

      // getting the colors from the css variables in the root
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent");
      const classicColor = getComputedStyle(document.documentElement).getPropertyValue(
        "--multicolor-title-color"
      );

      // set the distance from the center of the letter to the mouse position to run the animation
      const dist = window.innerWidth / 2;

      // get the center of the letter
      const { x: centerX, y: centerY } = getItemCenter(letterRef.current);

      // get the distance from the mouse to the letter center (pythagoras)
      const distance = getDistance(centerX, centerY, e.clientX, e.clientY);

      if (distance < dist) {
        // if the distance is less than the max distance, animate the letter color based on the distance
        const factor = distance / dist;
        letterRef.current.style.color = mixColors(accentColor, classicColor, 1 - factor);
      } else {
        letterRef.current.style.color = classicColor;
      }
    };

    window.addEventListener("mousemove", (e) => letterColorAnimation(e));

    return () => {
      window.removeEventListener("mousemove", (e) => letterColorAnimation(e));
    };
  }, []);

  const lettersVariants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: (index: number) => {
      return {
        opacity: 1,
        y: 0,

        transition: {
          delay: 0.1 + index * 0.02,
          duration: 0.5,
          ease: "backOut",
        },
      };
    },
    exit: (index: number) => {
      return {
        opacity: 0,
        y: 100,

        transition: {
          delay: index * 0.02,
          duration: 0.5,
          ease: "backOut",
        },
      };
    },
  };

  return (
    <>
      <motion.span
        className="letter"
        ref={letterRef}
        custom={index}
        variants={lettersVariants}
        initial="initial"
        animate="animate"
        key={index + letter}
        exit="exit"
      >
        {letter}
      </motion.span>
    </>
  );
};

// ! DEF
type NavigationProps = {
  projects: any[];
  activeProject: any | null;
  setActiveProject: (project: projectType) => void;
};

const Navigation = (props: NavigationProps) => {
  return (
    <ProjectsNavigation>
      <ProjectsNavigation.Desktop>
        {props.projects.map((project, index) => {
          return (
            <MouseActivation
              key={"nav" + project.id}
              onActive={{
                label: "see the project",
                width: 100,
                height: 100,
              }}
            >
              <ProjectsNavigation.DesktopButton
                onClick={() => {
                  props.setActiveProject(project);
                }}
                isActive={props.activeProject?.id === project.id}
              >
                <span className="index">00{index + 1}/</span>
                <span className="title">{getPost(project).title}</span>
              </ProjectsNavigation.DesktopButton>
            </MouseActivation>
          );
        })}
      </ProjectsNavigation.Desktop>
      <ProjectsNavigation.Mobile label={getPost(props.activeProject).title}>
        {props.projects.map((project, index) => {
          return (
            <ProjectsNavigation.MobileButton
              key={"nav" + project.id}
              onClick={() => {
                props.setActiveProject(project);
              }}
              isActive={props.activeProject?.id === project.id}
            >
              <span className="index">00{index + 1}/</span>
              <span className="title">{getPost(project).title}</span>
            </ProjectsNavigation.MobileButton>
          );
        })}
      </ProjectsNavigation.Mobile>
    </ProjectsNavigation>
  );
};
