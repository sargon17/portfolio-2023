"use client";
import React from "react";
import { useState } from "react";
import { useTheme } from "next-themes";

import ThemeButton from "./ThemeButton";
import ThemeDropdown from "./ThemeDropdown";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
