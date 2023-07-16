"use client";
import { Provider } from "react-redux";
import { mouseStore } from "@/contexts/mouseStore";

import App from "./app";

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
    <Provider store={mouseStore}>
      <App />
    </Provider>
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
