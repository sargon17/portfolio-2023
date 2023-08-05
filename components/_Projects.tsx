"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { client } from "@/sanity/lib/client";

import { motion } from "framer-motion";

// types
import projectType from "@/types/project";

import { useDispatch } from "react-redux";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { setContent } from "@/contexts/features/mouse/mouseContent";

export default function Projects() {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [activeProject, setActiveProject] = useState<projectType | null>(projects[0] || null);
  const dispatch = useDispatch();

  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setActiveProject(projects[0]);
    }
  }, [projects]);

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
            <motion.svg
              viewBox="0 0 200 40"
              preserveAspectRatio="xMidYMin slice"
              key={activeProject?._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
            >
              <text
                x="0%"
                y="50%"
                textAnchor="start"
                dominantBaseline="middle"
              >
                {activeProject?.title}
              </text>
            </motion.svg>
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
