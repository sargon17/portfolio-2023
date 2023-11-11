"use client";
import React from "react";
import { useEffect, useState } from "react";

import ThemeButton from "./_ThemeButton";
import ThemeDropdown from "./_ThemeDropdown";

export default function ThemeSwitcher() {
  let systemTheme = "dark";

  if (typeof window !== "undefined") {
    systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const [theme, setTheme] = useState(systemTheme);

  //check the local storage for the theme
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      // if is already set, use it
      setTheme(localTheme);
    } else {
      // else check the system preference
      setTheme(systemTheme);
    }
  }, []);

  // when theme changes, set the local storage
  useEffect(() => {
    setMode(theme);
  }, [theme]);

  const setMode = (mode: string) => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  };

  return (
    <div>
      <ThemeButton />
      <ThemeDropdown />

      {/* <select
        name="theme"
        id="theme"
        onChange={(e) => {
          setTheme(e.target.value);
        }}
        value={theme}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="pink">Pink</option>
      </select> */}
    </div>
  );
}
