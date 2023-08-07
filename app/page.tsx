"use client";
import { Provider } from "react-redux";
import { mouseStore } from "@/contexts/mouseStore";

import App from "./app";

export default async function Home() {
  // const projects: project[] = await getProjects();

  return (
    <Provider store={mouseStore}>
      <App />
    </Provider>
  );
}
