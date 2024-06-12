"use client";
import { Provider } from "react-redux";
import { mouseStore } from "@/contexts/mouseStore";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <Provider store={mouseStore}>{children}</Provider>
      </ThemeProvider>
    </>
  );
}
