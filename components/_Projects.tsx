"use client";
import React from "react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

import ListItem from "@/components/ListItem";
import ListShowcase from "@/components/ListShowcase";

// types
import projectType from "@/types/project";

export default function Projects() {
  const [projects, setProjects] = useState<projectType[]>([]);
  const [currentProject, setCurrentProject] = useState<projectType | null>(projects[0] || null);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    console.log(projects);
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

  const handleItemHover = (id: string) => {
    const project = projects.find((project) => project._id === id);
    if (!project) return;
    setCurrentProject(project);
  };

  const renderProjectsList = () => {
    return projects.map((project, index) => {
      return (
        <ListItem
          id={project._id}
          key={project._id}
          onHover={handleItemHover}
          isActive={currentProject?._id === project._id}
        >
          {project.title}
        </ListItem>
      );
    });
  };

  return (
    <div className="projects-page">
      <div className="projects__container">
        <div className="projects__container__content">
          <ListShowcase
            projects={projects}
            currentProject={currentProject}
          />
        </div>
        <div className="projects__container__list">{renderProjectsList()}</div>
      </div>
    </div>
  );
}
