import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./Button";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <Button className="sidebar__nav__button">hero</Button>
        <Button className="sidebar__nav__button">skills</Button>
        <Button className="sidebar__nav__button">services</Button>
        <Button className="sidebar__nav__button">projects</Button>
        <Button className="sidebar__nav__button">contacts</Button>

        <ThemeSwitcher />
      </nav>
      <div className="sidebar__title">
        <h1>Mykhaylo Tymofyeyev</h1>
      </div>
    </div>
  );
}
