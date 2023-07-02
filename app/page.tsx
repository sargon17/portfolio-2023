import Image from "next/image";
// import styles from "./page.module.css";

import { createClient } from "next-sanity";

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
    <main>
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

      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>Instantly deploy your Next.js site to a shareable URL with Vercel.</p>
        </a>
      </div> */}
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
