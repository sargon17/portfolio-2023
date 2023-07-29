"use client";
import React from "react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

// types
import projectType from "@/types/project";

export default function Projects() {
  const [projects, setProjects] = useState<projectType[]>([]);

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
    <div className="projects-page">
      <div className="navigation">
        {projects.map((project) => {
          return (
            <div
              key={"nav" + project._id}
              className="navigation__item"
            >
              {project.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
