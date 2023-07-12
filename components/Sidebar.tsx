import React from "react";

// import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./Button";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <Button text="hero" className="sidebar__nav__button" />
        <Button text="skils" className="sidebar__nav__button" />
        <Button text="services" className="sidebar__nav__button" />
        <Button text="projects" className="sidebar__nav__button" />
        <Button text="contacts" className="sidebar__nav__button" />
        {/* <ThemeSwitcher /> */}
      </nav>
      <div className="sidebar__title">
        <h1>Mykhaylo Tymofyeyev</h1>
      </div>
    </div>
  );
}
