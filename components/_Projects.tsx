"use client";
import React, { use, useLayoutEffect } from "react";
import { useState, useEffect, useRef } from "react";

import { textToLetters, getItemCenter } from "@/utils/utils";
import { ScopesText } from "@/utils/animations";

import { motion } from "framer-motion";

// types
import projectType from "@/types/project";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/mouseStore";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setFixPosition } from "@/contexts/features/mouse/mouseFixedPosition";

import Button from "./Button";

export default function Projects() {
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
  const mousePositionState = useSelector((state: RootState) => state.position.position);

  const page = useRef<HTMLDivElement>(null);
  const link = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProjects();
  }, []);

  // todo - refactor & move to utils

  return (
    <div
      className="projects-page"
      ref={page}
    >
      <div className="navigation">
        {projects.map((project) => {
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
              {project.title}
            </div>
          );
        })}
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
          <motion.div
            key={activeProject?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
            className="project__content__image"
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
          </motion.div>
          <div className="project__content__description">
            <div>
              <motion.p
                key={activeProject?._id}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.5 },
                }}
              >
                {activeProject?.description}
              </motion.p>
            </div>
            <div className="project__content__description__tags">
              {activeProject?.tags?.map((tag, index) => {
                return (
                  <motion.p
                    key={tag}
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
                <div className="project__content__description__link">
                  <motion.div
                    key={activeProject?._id}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 1.2, duration: 0.5 },
                    }}
                    ref={link}
                    onMouseEnter={() => {
                      dispatch(setDimension({ width: 150, height: 30 }));

                      const itemTop = link.current?.getBoundingClientRect().top || 0;
                      const itemLeft = link.current?.getBoundingClientRect().left || 0;

                      dispatch(
                        setFixPosition({
                          x: itemLeft - 20,
                          y: itemTop + window.scrollY - 5,
                        })
                      );
                    }}
                    onMouseMove={() => {
                      dispatch(setDimension({ width: 150, height: 30 }));

                      const itemTop = link.current?.getBoundingClientRect().top || 0;
                      const itemLeft = link.current?.getBoundingClientRect().left || 0;

                      dispatch(
                        setFixPosition({
                          x: itemLeft - 20,
                          y: itemTop + window.scrollY - 5,
                        })
                      );
                    }}
                    onMouseLeave={() => {
                      dispatch(setDimension({ width: 10, height: 10 }));
                      dispatch(setFixPosition({ x: 0, y: 0 }));
                    }}
                  >
                    <a
                      href={activeProject?.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ScopesText>see it yourself</ScopesText>
                    </a>
                  </motion.div>
                </div>
                <div className="project__content__description__link--mobile">
                  <a href={activeProject?.link}>
                    <Button>see it yourself</Button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const areaRef = useRef<HTMLSpanElement>(null);
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
      // getting the colors from the css variables in the root
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent");
      const classicColor = getComputedStyle(document.documentElement).getPropertyValue("--title-color");

      // set the distance from the center of the letter to the mouse position to run the animation
      const dist = 400;

      // get the letter position and size
      const { top, left, width, height } = letterRef.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      };

      // get the letter center
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // get the distance from the mouse to the letter center (pythagoras)
      const distanceY = Math.abs(e.clientY - centerY);
      const distanceX = Math.abs(e.clientX - centerX);
      let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

      if (!letterRef.current) return;

      if (distance < dist) {
        // if the distance is less than the max distance, animate the letter color based on the distance
        const delta = distance / dist;

        letterRef.current.style.color = mixColors(accentColor, classicColor, 1 - delta);
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
