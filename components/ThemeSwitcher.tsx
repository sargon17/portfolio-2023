"use client";
import React from "react";
import { useEffect, useState } from "react";

import ThemeButton from "./ThemeButton";
import ThemeDropdown from "./ThemeDropdown";

export default function ThemeSwitcher() {
  let systemTheme = "dark";

  if (typeof window !== "undefined") {
    systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const [theme, setTheme] = useState(systemTheme);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <div
      className="theme-switcher"
      onMouseLeave={() => {
        setIsDropdownOpen(false);
      }}
    >
      <ThemeButton
        onClick={() => {
          handleButtonClick();
        }}
        isOpen={isDropdownOpen}
      />
      <ThemeDropdown
        onChange={(value) => {
          handleThemeChange(value);
        }}
        isOpen={isDropdownOpen}
      />
    </div>
  );
}
