"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { textToLetters, getItemCenter, getDistance } from "@/utils/utils";
import { ScopesText } from "@/utils/animations";

import { motion } from "framer-motion";

// types
import projectType from "@/types/project";

import { useDispatch } from "react-redux";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setFixPosition } from "@/contexts/features/mouse/mouseFixedPosition";

import Button from "./Button";

export default function Projects() {
  const card = useRef<HTMLDivElement>(null);
  const getProjects = async () => {
    // get project data from a json file in the public folder
    const projects: any = await fetch("/projects.json").then((res) => res.json());
    setProjects(projects);

    if (projects && projects.length > 0) {
      if (projects[0]) {
        setActiveProject(projects[0]);
      }
    }
  };
  const [projects, setProjects] = useState<projectType[]>([]);
  const [activeProject, setActiveProject] = useState<projectType | null>(projects[0] || null);

  const dispatch = useDispatch();

  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProjects();
  }, []);

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
      <div className="projects-page__navigation">
        <Navigation
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      </div>
      <div className="project">
        <div className="project__main-data">
          <MulticolorTitle title={activeProject?.title || ""} />
          <motion.div
            className="project__main-data__year"
            key={activeProject?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}
          >
            <p>{new Date(activeProject?.date || "").getFullYear()}</p>
          </motion.div>
        </div>
        <div className="project__content">
          <motion.a
            key={activeProject?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
            className="project__content__image"
            href={activeProject?.link}
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
          >
            {activeProject?.video ? (
              <video
                src={activeProject?.video}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={activeProject?.image}
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
              {activeProject?.tags?.map((tag, index) => {
                return (
                  <motion.p
                    key={tag + index + activeProject?._id}
                    className="project__content__description__tags__item"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.9 + index * 0.1, duration: 0.5 },
                    }}
                  >
                    {tag}
                  </motion.p>
                );
              })}
            </div>
            {activeProject?.link && (
              <>
                <motion.a
                  className="project__content__description__link"
                  key={activeProject?._id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 1.2, duration: 0.5 },
                  }}
                  href={activeProject?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    onClick={() => {
                      dispatch(setFixPosition({ x: 0, y: 0 }));
                    }}
                  >
                    see it yourself
                  </Button>
                </motion.a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
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
        dangerouslySetInnerHTML={{ __html: activeProject?.description || "" }}
      ></motion.div>
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
          key={index}
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
      >
        {letter}
      </motion.span>
    </>
  );
};

const Navigation = ({
  projects,
  activeProject,
  setActiveProject,
}: {
  projects: projectType[];
  activeProject: projectType | null;
  setActiveProject: (project: projectType) => void;
}) => {
  const dispatch = useDispatch();

  return (
    <div className="navigation">
      {projects.map((project, index) => {
        return (
          <div
            key={"nav" + project._id}
            className="navigation__item"
            data-active={activeProject?._id === project._id}
            onClick={() => {
              setActiveProject(project);
              dispatch(setDimension({ width: 10, height: 10 }));
              dispatch(setContent(""));
            }}
            onMouseEnter={() => {
              const isActive = activeProject?._id === project._id;
              if (!isActive) {
                dispatch(setDimension({ width: 100, height: 100 }));
                dispatch(setContent("see the project"));
              }
            }}
            onMouseLeave={() => {
              dispatch(setDimension({ width: 10, height: 10 }));
              dispatch(setContent(""));
            }}
          >
            <span className="index">00{index + 1}/</span>
            <span className="title">{project.title}</span>
          </div>
        );
      })}
    </div>
  );
};
