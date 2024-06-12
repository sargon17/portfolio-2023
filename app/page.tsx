import App from "./app";

import Providers from "./Providers";

import { getDataFromDatabase, getPage } from "@/notion";

export default async function Home() {
  let data = await getDataFromDatabase();

  // for each project, get the page
  data.forEach(async (project: any) => {
    const page = await getPage(project.id);
    console.log(page);
  });

  console.log(data[0]);

  return (
    <Providers>
      <App projects={data} />
    </Providers>
  );
}
