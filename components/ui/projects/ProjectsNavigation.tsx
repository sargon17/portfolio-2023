"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import Button from "../Button";

type NavigationProps = {
  children: React.ReactNode | React.ReactNode[];
};

function ProjectsNavigation(props: NavigationProps) {
  return <div className="projects-page__navigation">{props.children}</div>;
}

type Desktop = {
  children: React.ReactNode | React.ReactNode[];
};

const Desktop = (props: Desktop) => {
  return <div className="navigation navigation--desktop">{props.children}</div>;
};

type Mobile = {
  children: React.ReactNode | React.ReactNode[];
  label: string;
};
const Mobile = (props: Mobile) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const variants = {
    initial: {
      opacity: 0,
      y: -20,
      maxHeight: 0,
    },

    closed: {
      opacity: 0,
      y: -20,
      maxHeight: 0,

      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        delayChildren: 0,
        delay: 0.3,
      },

      when: "afterChildren",
    },

    open: {
      opacity: 1,
      y: 0,
      maxHeight: 200,

      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },

      when: "beforeChildren",
    },
  };

  return (
    <div className="navigation navigation--mobile">
      <div className="navigation__button">
        <Button
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {props.label}
          <ChevronSVG isOpen={isDropdownOpen} />
        </Button>
      </div>
      <motion.div
        className="navigation__dropdown dropdown"
        variants={variants}
        initial="initial"
        animate={isDropdownOpen ? "open" : "closed"}
        exit="closed"
      >
        {props.children}
      </motion.div>
    </div>
  );
};

// Desktop Button
type NavigationButtonProps = {
  onClick: () => void;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  isActive?: boolean;
};
const NavigationButton = (props: NavigationButtonProps) => {
  return (
    <div
      className={"navigation__item" + (props.className ? " " + props.className : "")}
      data-active={props.isActive}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </div>
  );
};

// Mobile Button (dropdown)
type NavigationOptionProps = {
  onClick: () => void;
  children: React.ReactNode | React.ReactNode[];
  isActive?: boolean;
};
const NavigationOptions = (props: NavigationOptionProps) => {
  const childrenVariants = {
    initial: {
      opacity: 0,
      y: -10,
    },

    closed: {
      opacity: 0,
      y: -10,
    },

    open: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.1,
      },
    },
  };
  return (
    <motion.div
      className="option"
      data-active={props.isActive}
      variants={childrenVariants}
      onClick={props.onClick}
    >
      {props.children}
    </motion.div>
  );
};

ProjectsNavigation.Desktop = Desktop;
ProjectsNavigation.Mobile = Mobile;
ProjectsNavigation.DesktopButton = NavigationButton;
ProjectsNavigation.MobileButton = NavigationOptions;

export default ProjectsNavigation;

type ChevronSVGProps = {
  isOpen: boolean;
};
const ChevronSVG = ({ isOpen }: ChevronSVGProps) => {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 180 : 0 }}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.96876 3.9082H5.37293H3.03543C2.63543 3.9082 2.43543 4.39154 2.71876 4.67487L4.87709 6.8332C5.22293 7.17904 5.78543 7.17904 6.13126 6.8332L6.95209 6.01237L8.28959 4.67487C8.56876 4.39154 8.36876 3.9082 7.96876 3.9082Z"
          fill="#9A9A9A"
        />
      </svg>
    </motion.div>
  );
};
