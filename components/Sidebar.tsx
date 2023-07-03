import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <button className="sidebar__button">hero</button>
        <button className="sidebar__button">hero</button>
        <button className="sidebar__button">hero</button>
        <button className="sidebar__button">hero</button>
        <button className="sidebar__button">hero</button>
        <ThemeSwitcher />
      </nav>
      <div className="sidebar__title">
        <h1>Mykhaylo Tymofyeyev</h1>
      </div>
    </div>
  );
}
