import Slide from "@/components/Slide";
import Hero from "@/components/_Hero";
import Projects from "@/components/_Projects";
import Contacts from "@/components/_Contacts";

import { getDataFromDatabase } from "@/notion";

export default async function Home() {
  let projects = await getDataFromDatabase();

  return (
    <>
      <Slide id="_main">
        <Hero />
      </Slide>
      <Slide id="_projects">
        <Projects projects={projects} />
      </Slide>
      <Slide id="_contacts">
        <Contacts />
      </Slide>
    </>
  );
}
