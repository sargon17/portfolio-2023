import App from "./app";

import Providers from "./Providers";

import { getDataFromDatabase, getPage } from "@/notion";

export default async function Home() {
  let data = await getDataFromDatabase();
  return (
    <Providers>
      <App projects={data} />
    </Providers>
  );
}
