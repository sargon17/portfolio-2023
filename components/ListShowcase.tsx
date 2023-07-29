import React, { use } from "react";
import { useState, useEffect, useRef } from "react";

import projectType from "@/types/project";

type ListShowcaseProps = {
  projects: projectType[];
  currentProject: projectType | null;
};

export default function ListShowcase({ projects, currentProject }: ListShowcaseProps) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll to the project box
    if (currentProject && box.current) {
      const element = box.current.querySelector(`[data-id="${currentProject._id}"]`);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentProject]);

  const renderProjectsBoxes = () => {
    return projects.map((project) => {
      return (
        <div
          className="project-box"
          key={"box-" + project._id}
          data-id={project._id}
        >
          <div className="project-box__image--primary">
            <img
              src={project.image}
              alt={project.title}
            />
          </div>
          <div className="project-box__content">{project.description}</div>
          <div className="project-box__image--secondary">
            <img
              src={project.secondaryImage}
              alt={project.title}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="list-showcase"
      ref={box}
    >
      {renderProjectsBoxes()}
    </div>
  );
}
