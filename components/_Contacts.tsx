"use client";
import React from "react";

import { useState } from "react";

import { motion } from "framer-motion";

import { textToLetters } from "@/utils/utils";

export default function Contacts() {
  const [currentHover, setCurrentHover] = useState<string>("");

  type printLink = {
    text: string;
    link?: string;
    number?: string;
  };
  const printLink = ({ text, link, number }: printLink): React.ReactElement => {
    const letters = textToLetters(text);

    console.log(currentHover);
    return (
      <a
        href={link}
        onMouseEnter={() => setCurrentHover(text)}
        onMouseLeave={() => setCurrentHover("")}
      >
        <span className="number">{number}</span>
        <span className="title">
          {letters.map((letter, index) => {
            return (
              <motion.span
                key={index}
                className="letter"
                initial={{ y: 15 }}
                animate={{ y: currentHover === text ? 0 : 15 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.01,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      </a>
    );
  };

  return (
    <div className="contacts">
      <div className="bg__text">
        <p>Say Hi</p>
      </div>
      <div className="bg__color">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1550 1055"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
        >
          <g filter="url(#blurFilter)" className="bg__color__figure">
            <path d="M906.722 1235.55C724.535 805.75 224.648 335.01 208.292 1010.41C552.814 818.157 567.589 203.495 1023.88 605.865C1031.42 418.316 888.853 230.626 2377.49 159.256C1936.24 420.688 2053.51 2019.51 2085.87 2301.01C1951.86 1446.12 1698.38 2259.82 1409.33 1069.24C1344.95 1071.34 1252.14 1276.64 1104.68 1356.67C1033.36 1395.38 1008.24 1452.16 906.722 1435.55Z" />
          </g>
          <defs>
            {/* blur filter */}
            <filter id="blurFilter">
              <feGaussianBlur stdDeviation="80" />
            </filter>
          </defs>
        </svg>
        <div className="noise"></div>
      </div>
      <div className="bg__noise">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1550 1055"
          id="bg__noise__svg"
        >
          <rect
            width="1550"
            height="1055"
            fill="url(#paint0_linear)"
            filter="url(#noiseFilter)"
            className="bg__noise__rect"
          />
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="10"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
      </div>
      <main>
        <div className="contacts__container">
          <h3 className="contacts__container__title">
            Ping me for a digital <span>tête-à-tête</span>
          </h3>

          <div className="contacts__container__main">
            <p>
              In the realm of coding chaos, HTML wizards and CSS sorcerers brew
              a potion of responsive enchantment. JavaScript jesters dance atop
              browser tabs, and animated GIFs share pixelated tales. Welcome to
              the whimsical web wonderland, where creativity clicks and code
              spells come to life!
            </p>
            <div className="contacts__container__main__links">
              {printLink({ text: "Telegram", number: "001" })}
              {printLink({ text: "Email", number: "002" })}
              {printLink({ text: "Linkedin", number: "003" })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
