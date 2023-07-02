"use client";
import React from "react";
import { useEffect } from "react";

export default function ThemeSwitcher() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  console.log(systemTheme);

  //check the local storage for the theme
  let theme = localStorage.getItem("theme");

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, [systemTheme]);

  return (
    <div>
      <select
        name="theme"
        id="theme"
        onChange={(e) => {
          const theme = e.target.value;
          document.documentElement.setAttribute("data-theme", theme);
          localStorage.setItem("theme", theme);
        }}
        value={theme}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="pink">Pink</option>
      </select>
    </div>
  );
}
