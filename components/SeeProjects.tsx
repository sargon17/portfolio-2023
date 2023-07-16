import React, { use } from "react";

import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { useLenis } from "@studio-freight/react-lenis";

// next image
import Image from "next/image";

import { useEffect, useState, useRef, useLayoutEffect } from "react";

export default function SeeProjects() {
  const dispatch = useDispatch();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [isMouseOverElement, setIsMouseOverElement] = useState(false);

  const element = useRef<HTMLDivElement>(null);
  const magnetBox = useRef<HTMLDivElement>(null);
  const singleProject1 = useRef<HTMLDivElement>(null);
  const singleProject2 = useRef<HTMLDivElement>(null);
  const singleProject3 = useRef<HTMLDivElement>(null);

  const lenis = useLenis((e: any) => console.log(e));

  useLayoutEffect(() => {
    if (element.current && magnetBox.current) {
      if (isMouseOver) {
        const { x, y } = mousePosition;

        const { width, height } = magnetBox.current.getBoundingClientRect();

        //get element x and y position
        const elementY = element.current.getBoundingClientRect().top;

        const magnetX = magnetBox.current.getBoundingClientRect().left;
        const magnetXCenter = magnetX + width / 2;

        //get mouse position relative to element
        const xPosition = x - magnetXCenter;
        const yPosition = y - elementY;
        //get percentage of mouse position relative to element
        const xPercent = (xPosition / width) * 50;
        const yPercent = (yPosition / height) * 10;
        // console.log(yPercent);

        //animate element position based on mouse position
        element.current.animate(
          [
            {
              transform: `translate(${xPercent}%, ${yPercent}%)`,
            },
          ],
          {
            duration: 1000,
            fill: "forwards",
          }
        );

        if (singleProject1.current && singleProject2.current && singleProject3.current) {
          const baseSingleTransforms = [
            {
              x: -30,
              y: -40,
              rotate: -10,
            },
            {
              x: 0,
              y: -140,
              rotate: 0,
            },
            {
              x: 30,
              y: -230,
              rotate: 10,
            },
          ];

          if (isMouseOverElement) {
            singleProject1.current.animate(
              [
                {
                  transform: `translate(${baseSingleTransforms[0].x + xPercent / 8}%, ${
                    baseSingleTransforms[0].y
                  }%) rotate(${baseSingleTransforms[0].rotate}deg)`,
                },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );

            singleProject2.current.animate(
              [
                {
                  transform: `translate(${baseSingleTransforms[1].x + xPercent / 4}%, ${
                    baseSingleTransforms[1].y - 10
                  }%) rotate(${baseSingleTransforms[1].rotate}deg)`,
                },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );

            singleProject3.current.animate(
              [
                {
                  transform: `translate(${baseSingleTransforms[2].x + xPercent / 2}%, ${
                    baseSingleTransforms[2].y
                  }%) rotate(${baseSingleTransforms[2].rotate}deg)`,
                },
              ],
              {
                duration: 1000,
                fill: "forwards",
              }
            );
          }
        }
      } else {
        element.current.animate(
          [
            {
              transform: `translate(0%, 0%)`,
            },
          ],
          {
            duration: 2000,
            fill: "forwards",
          }
        );
      }
    }
  }, [element, mousePosition, isMouseOverElement]);

  useLayoutEffect(() => {
    if (!isMouseOverElement) {
      if (singleProject1.current && singleProject2.current && singleProject3.current) {
        singleProject1.current.animate(
          [
            {
              transform: `translate(0%, 0%)`,
            },
          ],
          {
            duration: 200,
            fill: "forwards",
          }
        );

        singleProject2.current.animate(
          [
            {
              transform: `translate(0%, -100%)`,
            },
          ],
          {
            duration: 200,
            fill: "forwards",
          }
        );

        singleProject3.current.animate(
          [
            {
              transform: `translate(0%, -200%)`,
            },
          ],
          {
            duration: 200,
            fill: "forwards",
          }
        );
      }
    }
  }, [isMouseOverElement]);

  function handleScrollToElement(element: string) {
    const el = document.querySelector(element);
    console.log(el);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  useLayoutEffect(() => {
    if (window) {
      window.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      });
    }
  }, []);

  return (
    <div
      className="magnet-animation-box"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={magnetBox}
    >
      <div
        className="see-projects"
        onMouseEnter={() => {
          setIsMouseOverElement(true);
          dispatch(setContent("See more"));
        }}
        onMouseLeave={() => {
          setIsMouseOverElement(false);
          dispatch(setContent(""));
        }}
        onClick={() => {
          handleScrollToElement("#_projects");
        }}
        ref={element}
      >
        <div className="see-projects__cta">
          <div className="see-projects__cta__text">
            <p>
              Give a look to my <span className="accent">Projects</span>
            </p>
          </div>
        </div>
        <div className="see-projects__slides">
          <div
            className="see-projects__slides__slide slide-1"
            ref={singleProject1}
          >
            <div className="see-projects__slides__slide__image">
              <Image
                src="/edi.deseip.png"
                alt="slide-1"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div
            className="see-projects__slides__slide slide-2 "
            ref={singleProject2}
          >
            <div className="see-projects__slides__slide__image">
              <Image
                src="/edi.deseip-1.png"
                alt="slide-2"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div
            className="see-projects__slides__slide slide-3"
            ref={singleProject3}
          >
            <div className="see-projects__slides__slide__image">
              <Image
                src="/edi.deseip-2.png"
                alt="slide-2"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
