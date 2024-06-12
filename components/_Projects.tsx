"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { textToLetters, getItemCenter, getDistance } from "@/utils/utils";

import { motion, AnimatePresence } from "framer-motion";

// types
import projectType from "@/types/project";

// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { setContent } from "@/contexts/features/mouse/mouseContent";

import ProjectsNavigation from "./ui/projects/ProjectsNavigation";
import MouseActivation from "./ui/mouse/MouseActivation";

import Button from "./ui/Button";

import {
  getPostTitle,
  getPostDate,
  getPostTags,
  getPostLink,
  getPostVideo,
  getPostImage,
  getPostDescription,
} from "@/utils/notion";

type ProjectsProps = {
  projects: any[];
};
export default function Projects(props: ProjectsProps) {
  const card = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<any | null>(props.projects[0] || null);

  const dispatch = useDispatch();

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
    <AnimatePresence mode="wait">
      <div
        className="projects-page"
        ref={page}
      >
        <Navigation
          projects={props.projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />

        <div className="project">
          <div className="project__main-data">
            <MulticolorTitle title={getPostTitle(activeProject)} />
            <motion.div
              className="project__main-data__year"
              key={activeProject?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
            >
              <p>{new Date(getPostDate(activeProject)).getFullYear()}</p>
            </motion.div>
          </div>
          <div className="project__content">
            <motion.a
              key={activeProject?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
              className="project__content__image"
              href={getPostLink(activeProject)}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => {
                dispatch(setDimension({ width: 100, height: 100 }));
                dispatch(setContent("see it yourself"));
              }}
              onMouseLeave={() => {
                dispatch(setDimension({ width: 10, height: 10 }));
                dispatch(setContent(""));
              }}
              layoutId={activeProject?.id + "image"}
              exit={{ opacity: 0 }}
            >
              {getPostVideo(activeProject) ? (
                <video
                  src={getPostVideo(activeProject)}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={getPostImage(activeProject)}
                  alt=""
                />
              )}
            </motion.a>
            <div
              className="project__content__description"
              ref={card}
            >
              <DescriptionCard activeProject={activeProject} />
              <div className="project__content__description__tags">
                {getPostTags(activeProject).map((tag: string, index: number) => {
                  return (
                    <motion.p
                      key={tag + index + activeProject?._id}
                      className="project__content__description__tags__item"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.9 + index * 0.1, duration: 0.5 },
                      }}
                      exit={{ opacity: 0 }}
                    >
                      {tag}
                    </motion.p>
                  );
                })}
              </div>
              {getPostLink(activeProject) && (
                <>
                  <motion.a
                    className="project__content__description__link"
                    key={activeProject?._id}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 1.2, duration: 0.5 },
                    }}
                    href={getPostLink(activeProject)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>see it yourself</Button>
                  </motion.a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

const DescriptionCard = ({ activeProject }: { activeProject: projectType | null }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!activeProject) return null;

  let clss = "project__content__description__card";

  if (isExpanded) {
    clss += " expanded";
  }

  // check if the description is too long to show the read more button
  if (activeProject?.description?.length > 500) {
    clss += " read-more";
  }

  return (
    // <div className="card-wrapper">
    <motion.div
      className={clss}
      key={activeProject?._id}
      initial={{ opacity: 0 }}
      layoutId="card"
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.5 },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5 },
      }}
    >
      <motion.div
        className="card-content"
        data-lenis-prevent={isExpanded}
        key={activeProject?._id}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.6, duration: 0.5 },
        }}
      >
        <p>{getPostDescription(activeProject)}</p>
      </motion.div>
      <div className="read-more__wrapper">
        <motion.div
          key={activeProject?._id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.7, duration: 0.5 },
          }}
          className="read-more__text"
        >
          {isExpanded ? (
            <motion.p
              onClick={() => setIsExpanded(!isExpanded)}
              layoutId="card-read-more"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.7, duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5 },
              }}
            >
              close
            </motion.p>
          ) : (
            <motion.p
              onClick={() => setIsExpanded(!isExpanded)}
              layoutId="card-read-more"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.7, duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.5 },
              }}
            >
              read more
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
    // </div>
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
      y: 20,
    },
    animate: (index: number) => {
      return {
        opacity: 1,
        y: 0,

        transition: {
          delay: 0.1 + index * 0.05,
          duration: 0.5,
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
        key={index}
        layoutId={letter + index + "title" + index}
        exit={{ opacity: 0, y: -20 }}
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
                <span className="title">{getPostTitle(project)}</span>
              </ProjectsNavigation.DesktopButton>
            </MouseActivation>
          );
        })}
      </ProjectsNavigation.Desktop>
      <ProjectsNavigation.Mobile label={getPostTitle(props.activeProject)}>
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
              <span className="title">{getPostTitle(project)}</span>
            </ProjectsNavigation.MobileButton>
          );
        })}
      </ProjectsNavigation.Mobile>
    </ProjectsNavigation>
  );
};
