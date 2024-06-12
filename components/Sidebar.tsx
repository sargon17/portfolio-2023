"use client";
import { useState, useEffect } from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import Button from "./Button";
import OpenToWork from "./OpenToWork";

import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";

import { handleScrollToElement } from "@/utils/utils";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

export default function Sidebar() {
  const dispatch = useDispatch();

  const [isOpened, setIsOpened] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpened(true);
        setIsMobile(false);
      } else {
        setIsOpened(false);
        setIsMobile(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sidebarVariants = {
    initial: {
      x: isOpened ? 0 : -100,
    },

    opened: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },

    closed: {
      x: -100,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="sidebar"
      variants={sidebarVariants}
      initial="initial"
      animate={isOpened ? "opened" : "closed"}
    >
      {isMobile && (
        <div
          className="sidebar__status"
          onClick={() => {
            setIsOpened(!isOpened);
          }}
        >
          <motion.svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: isOpened ? 180 : 0,
            }}
          >
            <path
              d="M1 12.84L5.87354 7.96646C6.44909 7.39091 6.44909 6.44909 5.87354 5.87354L1 1"
              stroke="#AEAEAE"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      )}

      <nav className="sidebar__nav">
        <Button
          className="sidebar__nav__button"
          onClick={() => {
            handleScrollToElement("#_main");
          }}
        >
          main
        </Button>
        {/* <Button className="sidebar__nav__button">skills</Button> */}
        {/* <Button className="sidebar__nav__button">services</Button> */}
        <Button
          className="sidebar__nav__button"
          onClick={() => {
            handleScrollToElement("#_projects");
          }}
        >
          projects
        </Button>
        <Button
          className="sidebar__nav__button"
          onClick={() => {
            handleScrollToElement("#_contacts");
          }}
        >
          contacts
        </Button>

        <ThemeSwitcher />
      </nav>
      <div className="sidebar__title">
        {/* <OpenToWork
          onClick={() => {
            handleScrollToElement("#_contacts");
          }}
        /> */}
        <h1
          onMouseEnter={() => {
            dispatch(setDimension({ width: 100, height: 100 }));
            dispatch(setContent("kaylo"));
          }}
          onMouseLeave={() => {
            dispatch(setDimension({ width: 10, height: 10 }));
            dispatch(setContent(""));
          }}
          className="sidebar__title__name"
        >
          {/* {isMobile ? "MT" : "Mykhaylo Tymofyeyev"} */}
          Mykhaylo Tymofyeyev
        </h1>
      </div>
    </motion.div>
  );
}

const Chevron = () => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12.84L5.87354 7.96646C6.44909 7.39091 6.44909 6.44909 5.87354 5.87354L1 1"
        stroke="#AEAEAE"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
