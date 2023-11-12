"use client";
import React from "react";

import { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import { textToLetters, getItemCenter, getDistance } from "@/utils/utils";

import { useDispatch } from "react-redux";

import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";

export default function Contacts() {
  return (
    <div className="contacts">
      <HugeText text="Let's talk" />

      <div className="contacts_info">
        <h2>Contacts</h2>
        <div className="links">
          {contactData.map((contact, index) => (
            <ContactLink
              link={contact.link}
              key={index + contact.name}
            >
              {contact.name}
            </ContactLink>
          ))}
        </div>
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

        console.log(factor);

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

type ContactLinkProps = {
  children: React.ReactNode;
  link: string;
};
const ContactLink = ({ children, link }: ContactLinkProps) => {
  const dispatch = useDispatch();

  return (
    <a
      href={link}
      target="_blank"
      onMouseEnter={() => {
        dispatch(setDimension({ width: 120, height: 120 }));
        dispatch(setContent("don't be shy"));
      }}
      onMouseLeave={() => {
        dispatch(setDimension({ width: 10, height: 10 }));
        dispatch(setContent(""));
      }}
    >
      <span className="arrow">
        <ArrowSvg />
      </span>
      <span className="text">{children}</span>
    </a>
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
    link: "https://www.instagram.com",
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com",
  },
  {
    name: "github",
    link: "https://github.com",
  },
  {
    name: "telegram",
    link: "https://telegram.org",
  },
];
