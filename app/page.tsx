"use client";
import Image from "next/image";

import { createClient } from "next-sanity";
import Gradient from "../components/Gradient";

import Sidebar from "@/components/Sidebar";
import MainContainer from "@/components/MainContainer";
import { ReactLenis } from "@studio-freight/react-lenis";

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
      <ReactLenis
        root
        options={{
          smoothWheel: true,
          duration: 1.4,
          wheelMultiplier: 1.4,
        }}
      >
        <Sidebar />
        <MainContainer />
      </ReactLenis>
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
