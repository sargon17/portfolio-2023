import Image from "next/image";
// import styles from "./page.module.css";

import { createClient } from "next-sanity";
import Gradient from "../components/Gradient";

import Sidebar from "@/components/Sidebar";

// type project = {
//   _id: string;
//   title: string;
//   description: string;
//   coverImage: string;
//   imgWidth: number;
//   imgHeight: number;
//   tags: string[];
// };

export default async function Home() {
  // const projects: project[] = await getProjects();
  return (
    <main className="main">
      <Sidebar />
      <div className="content"></div>
    </main>
  );
}

// const client = createClient({
//   projectId: "5lwk0a0s",
//   dataset: "production",
//   useCdn: true,
// });

// async function getProjects() {
//   const projects = await client.fetch(
//     `*[_type == "project"]{..., "coverImage": coverImage.asset->url, "imgWidth": coverImage.asset->metadata.dimensions.width, "imgHeight": coverImage.asset->metadata.dimensions.height}`
//   );
//   return projects;
// }
