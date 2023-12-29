"use client";
import React from "react";

import { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { textToLetters, getItemCenter, getDistance } from "@/utils/utils";

import { useDispatch } from "react-redux";

import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

export default function Contacts() {
  return (
    <div className="contacts">
      <HugeText text="Let's talk" />

      <div className="contacts_info">
        <h2>Contacts</h2>
        <ContactLinks links={contactData} />
      </div>
    </div>
  );
}

type HugeTextProps = {
  text: string;
};
const HugeText = ({ text }: HugeTextProps) => {
  const [letters, setLetters] = useState(textToLetters(text));

  return (
    <div className="huge-text">
      {letters.map((letter, index) => (
        <Letter
          letter={letter}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};

const Letter = ({ letter, index }: { letter: string; index: number }) => {
  const letterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!letterRef.current) return;
    const letterColorAnimation = (e: MouseEvent) => {
      if (!letterRef.current) return;

      // set the distance from the center of the letter to the mouse position to run the animation
      const dist = window.innerWidth / 2;

      // get the center of the letter
      const { x: centerX, y: centerY } = getItemCenter(letterRef.current);

      // get the distance from the mouse to the letter center (pythagoras)
      const distance = getDistance(centerX, centerY, e.clientX, e.clientY);

      if (distance < dist) {
        // if the distance is less than the max distance, animate the letter color based on the distance
        const factor = distance / dist;

        letterRef.current.style.filter = `blur(${factor * 10}px)`;
      } else {
        // letterRef.current.style.color = classicColor;
      }
    };

    window.addEventListener("mousemove", (e) => letterColorAnimation(e));

    return () => {
      window.removeEventListener("mousemove", (e) => letterColorAnimation(e));
    };
  }, []);

  const lettersVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: (index: number) => {
      return {
        opacity: 1,
        y: 0,

        transition: {
          delay: 0.1 + index * 0.05,
          duration: 0.5,
        },
      };
    },
  };

  return (
    <>
      <motion.span
        className="letter"
        ref={letterRef}
        custom={index}
        variants={lettersVariants}
        initial="initial"
        animate="animate"
        key={index}
      >
        {letter}
      </motion.span>
    </>
  );
};

const ContactLinks = ({ links }: { links: { name: string; link: string }[] }) => {
  const [hoveredLink, setHoveredLink] = useState("");
  return (
    <div className="links">
      {contactData.map((contact, index) => {
        let hovered: null | boolean = null;
        if (hoveredLink !== "") {
          hovered = hoveredLink === contact.name;
        }

        return (
          <ContactLink
            link={contact.link}
            key={index + contact.name}
            onHover={() => setHoveredLink(contact.name)}
            onUnhover={() => setHoveredLink("")}
            isHovered={hovered}
          >
            {contact.name}
          </ContactLink>
        );
      })}
    </div>
  );
};

type ContactLinkProps = {
  children: React.ReactNode;
  link: string;
  onHover?: () => void;
  onUnhover?: () => void;
  isHovered?: boolean | null;
};
const ContactLink = ({ children, link, onHover, onUnhover, isHovered }: ContactLinkProps) => {
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let blur = 0;

  if (isHovered === false) {
    blur = isMobile ? 0 : 2;
  }

  const linkVariants = {
    initial: {},
    hover: {},
    unhover: {
      filter: `blur(${blur}px)`,
      transition: {
        duration: 0.25,
      },
    },
  };

  const arrowVariants = {
    initial: {},
    hover: {
      x: 20,
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.15,
      },
    },
  };

  const textVariants = {
    initial: {},
    hover: {
      x: -5,
      transition: {
        duration: 0.25,
      },
    },
    unhover: {},
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      onMouseEnter={() => {
        dispatch(setDimension({ width: 120, height: 120 }));
        dispatch(setContent("don't be shy"));
        onHover && onHover();
      }}
      onMouseLeave={() => {
        dispatch(setDimension({ width: 10, height: 10 }));
        dispatch(setContent(""));
        onUnhover && onUnhover();
      }}
      variants={linkVariants}
      initial="initial"
      animate={isHovered ? "hover" : "unhover"}
    >
      <motion.span
        className="arrow"
        variants={arrowVariants}
      >
        <ArrowSvg />
      </motion.span>
      <motion.span
        className="text"
        variants={textVariants}
      >
        {children}
      </motion.span>
    </motion.a>
  );
};

const ArrowSvg = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.19824 5.47461L11.4904 5.47461L11.4904 9.76675"
        stroke="black"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.47998 11.4941L11.4303 5.54384"
        stroke="black"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const contactData = [
  {
    name: "email",
    link: "mailto:mykhaylo.tymofyeyev@gmail.com",
  },
  {
    name: "instagram",
    link: "https://instagram.com/tymofyeyev",
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/tymofyeyev/",
  },
  {
    name: "github",
    link: "https://github.com/sargon17",
  },
  {
    name: "telegram",
    link: "https://t.me/Mykhaylo17",
  },
];
