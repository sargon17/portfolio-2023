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
    const projects: any = [];
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

  // big title animation
  // todo - refactor
  useLayoutEffect(() => {
    // get all the title letters
    const title = page.current?.querySelector(".project__main-data__title h2");
    if (!title) return;

    const titleTop = title.getBoundingClientRect().top;
    const titleBottom = title.getBoundingClientRect().bottom;

    if (mousePositionState.y > titleTop - 20 && mousePositionState.y < titleBottom + 20) {
      const letters = title.querySelectorAll("span");

      if (letters) {
        letters.forEach((letter, index) => {
          // get the letters center
          const { x: letterCenterX, y: letterCenterY } = getItemCenter(letter);

          const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent");
          const classicColor = getComputedStyle(document.documentElement).getPropertyValue("--title-color");

          // if mouse is 20px away from the letter or less

          const minDistance = 200;

          const distance = Math.sqrt(
            Math.pow(mousePositionState.x - letterCenterX, 2) +
              Math.pow(mousePositionState.y - letterCenterY, 2)
          );

          if (
            mousePositionState.x > letterCenterX - minDistance &&
            mousePositionState.x < letterCenterX + minDistance &&
            mousePositionState.y > letterCenterY - minDistance &&
            mousePositionState.y < letterCenterY + minDistance
          ) {
            // get the closest distance from the mouse to the letter

            letter.animate(
              [
                {
                  // color
                  color: mixColors(accentColor, classicColor, 1 - distance / minDistance),
                },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );
          } else {
            letter.animate(
              [
                {
                  color: classicColor,
                },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );
          }
        });
      }
    } else {
      const letters = title.querySelectorAll("span");

      if (letters) {
        letters.forEach((letter, index) => {
          const classicColor = getComputedStyle(document.documentElement).getPropertyValue("--title-color");

          letter.animate(
            [
              {
                color: classicColor,
              },
            ],
            {
              duration: 1000,
              fill: "forwards",
            }
          );
        });
      }
    }
  }, [mousePositionState]);

  // todo - refactor & move to utils
  const mixColors = (color1: string, color2: string, weight: number) => {
    // mix the given colors
    const d2h = (d: number) => d.toString(16); // convert a decimal value to hex
    const h2d = (h: string) => parseInt(h, 16); // convert a hex value to decimal

    let color = "#";

    for (let i = 1; i <= 6; i += 2) {
      const v1 = h2d(color1.substr(i, 2));
      const v2 = h2d(color2.substr(i, 2));
      let val = d2h(Math.floor(v2 + (v1 - v2) * weight));

      while (val.length < 2) {
        val = "0" + val;
      }

      color += val;
    }

    return color;
  };

  const printTitle = (title: string) => {
    const letters = textToLetters(title);
    return letters.map((letter, index) => {
      return <span key={index}>{letter}</span>;
    });
  };

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
          <div className="project__main-data__title">
            <motion.h2
              key={activeProject?._id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.1, duration: 0.5 },
              }}
            >
              {printTitle(activeProject?.title || "")}
            </motion.h2>
          </div>
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
