"use client";
import React, { useLayoutEffect } from "react";
import { useState, useEffect, useRef } from "react";
import { client } from "@/sanity/lib/client";

import { textToLetters, getItemCenter } from "@/utils/utils";

import { motion } from "framer-motion";

// types
import projectType from "@/types/project";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/contexts/mouseStore";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { setContent } from "@/contexts/features/mouse/mouseContent";

export default function Projects() {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [activeProject, setActiveProject] = useState<projectType | null>(projects[0] || null);
  const dispatch = useDispatch();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mousePositionState = useSelector((state: RootState) => state.position.position);

  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setActiveProject(projects[0]);
    }
  }, [projects]);

  useEffect(() => {
    if (mousePositionState) {
      setMousePosition(mousePositionState);
    }
  }, [mousePositionState]);

  useLayoutEffect(() => {
    // get all the title letters
    const title = page.current?.querySelector(".project__main-data__title h2");
    if (!title) return;

    const titleTop = title.getBoundingClientRect().top;
    const titleBottom = title.getBoundingClientRect().bottom;

    if (mousePosition.y > titleTop - 20 && mousePosition.y < titleBottom + 20) {
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
            Math.pow(mousePosition.x - letterCenterX, 2) + Math.pow(mousePosition.y - letterCenterY, 2)
          );

          console.log(distance);

          if (
            mousePosition.x > letterLeft - minDistance &&
            mousePosition.x < letterRight + minDistance &&
            mousePosition.y > letterTop - minDistance &&
            mousePosition.y < letterBottom + minDistance
          ) {
            // get the closest distance from the mouse to the letter

            letter.animate(
              [
                {
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
  }, [mousePosition]);

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

  const getProjects = async () => {
    const projects = await client.fetch(`*[_type == "project"]{
      _id,
      title,
      description,
      link,

      "image": image.asset->url,

      "secondaryImage": secondaryImage.asset->url,
      tags,

    }`);
    setProjects(projects);
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
              animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.5 } }}
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
            <p>2023</p>
          </motion.div>
        </div>
        <div className="project__content">
          <motion.div
            key={activeProject?._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
            className="project__content__image"
          >
            <img
              src={activeProject?.image}
              alt=""
            />
          </motion.div>
          <div className="project__content__description">
            <motion.p
              key={activeProject?._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
            >
              {activeProject?.description}
            </motion.p>
            {activeProject?.tags?.map((tag, index) => {
              return (
                <motion.p
                  key={tag}
                  className="project__content__description__tag"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.9 + index * 0.1, duration: 0.5 } }}
                >
                  {tag}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
