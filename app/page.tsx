import Image from "next/image";
// import styles from "./page.module.css";

import { createClient } from "next-sanity";
import Gradient from "../components/Gradient";

import ThemeSwitcher from "../components/ThemeSwitcher";

type project = {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  imgWidth: number;
  imgHeight: number;
  tags: string[];
};

export default async function Home() {
  const projects: project[] = await getProjects();
  return (
    <main className="main">
      <div>
        <ThemeSwitcher />
      </div>
      <div className="background">
        {projects.map((project: project) => {
          return (
            <div
              key={project._id}
              id={project._id}
            >
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <p>{project.tags.join(", ")}</p>
              <Image
                src={project.coverImage}
                alt={project.title}
                width={project.imgWidth}
                height={project.imgHeight}
                priority
              />
            </div>
          );
        })}
      </div>
      <div className="gradient-box">
        <Gradient />
      </div>
    </main>
  );
}

const client = createClient({
  projectId: "5lwk0a0s",
  dataset: "production",
  useCdn: true,
});

async function getProjects() {
  const projects = await client.fetch(
    `*[_type == "project"]{..., "coverImage": coverImage.asset->url, "imgWidth": coverImage.asset->metadata.dimensions.width, "imgHeight": coverImage.asset->metadata.dimensions.height}`
  );
  return projects;
}
