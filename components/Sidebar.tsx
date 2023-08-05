import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./Button";

import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";

export default function Sidebar() {
  const dispatch = useDispatch();
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
        <h1
          onMouseEnter={() => {
            dispatch(setDimension({ width: 100, height: 100 }));
            dispatch(setContent("kaylo"));
          }}
          onMouseLeave={() => {
            dispatch(setDimension({ width: 10, height: 10 }));
            dispatch(setContent(""));
          }}
        >
          Mykhaylo Tymofyeyev
        </h1>
      </div>
    </div>
  );
}
