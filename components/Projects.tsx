"use client";
import React from "react";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

type project = {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
};

export default function Projects() {
  const [projects, setProjects] = useState<project[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const getProjects = async () => {
    const projects = await client.fetch(`*[_type == "project"]{
      title,
      description,
      link,
      "image": image.asset->url,
      tags,

    }`);
    setProjects(projects);
  };

  const renderProjects = () => {};

  return (
    <div className="projects-page">
      <div className="projects__container">
        <div className="projects__container__content"></div>
        <div className="projects__container__list">
          <ul>
            {projects.map((project) => {
              return <li key={project.title}>{project.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
