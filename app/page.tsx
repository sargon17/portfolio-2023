"use client";
import { Provider } from "react-redux";
import { mouseStore } from "@/contexts/mouseStore";
import { ThemeProvider } from "next-themes";

import App from "./app";

export default async function Home() {
  // const projects: project[] = await getProjects();

  return (
    <ThemeProvider>
      <Provider store={mouseStore}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}
