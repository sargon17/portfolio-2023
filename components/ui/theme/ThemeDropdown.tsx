import React from "react";

import { motion, AnimatePresence } from "framer-motion";

type ThemeDropdownProps = {
  onChange: (value: string) => void;
  isOpen: boolean;
};
export default function ThemeDropdown({ onChange, isOpen }: ThemeDropdownProps) {
  const variants = {
    initial: { scaleY: 0 },

    closed: {
      scaleY: 0,

      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delayChildren: 0,
        delay: 0.2,
      },

      when: "afterChildren",
    },

    open: {
      // opacity: 1,
      // y: 0,
      // maxHeight: 200,
      scaleY: 1,

      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },

      when: "beforeChildren",
    },
  };

  const childrenVariants = {
    initial: {
      opacity: 0,
      y: -10,
    },

    closed: {
      opacity: 0,
      // y: -10,
      transition: {
        duration: 0.1,
      },
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
      className="dropdown"
      variants={variants}
      initial="initial"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      style={{
        pointerEvents: isOpen ? "all" : "none",
      }}
      //
    >
      {themes.map((theme) => {
        return (
          <motion.div
            className="option"
            key={theme.label + "_theme"}
            onClick={() => {
              onChange(theme.value);
            }}
            variants={childrenVariants}
          >
            <div
              className="option-example"
              style={{
                background: `linear-gradient(135deg, ${theme.color1} 10%, ${theme.color2} 110%)`,
              }}
            ></div>
            <p>{theme.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const themes = [
  {
    label: "light",
    value: "light",
    color1: "#f7fafc",
    color2: "#fa9348",
  },
  {
    label: "dark",
    value: "dark",
    color1: "#303030",
    color2: "#3d3ddb",
  },
  {
    label: "candy pink",
    value: "pink",
    color1: "#f7fafc",
    color2: "#ff44d6",
  },
  {
    label: "fresh lime",
    value: "fresh-lemon",
    color1: "#416858",
    color2: "#f1ff58",
  },
  {
    label: "nordic sunset",
    value: "nordic-sunset",
    color1: "#216b88",
    color2: "#BE4236",
  },
];
