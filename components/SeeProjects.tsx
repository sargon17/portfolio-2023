import React from "react";

import { useEffect, useState, useRef, useLayoutEffect } from "react";

export default function SeeProjects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  const element = useRef<HTMLDivElement>(null);
  const magnetBox = useRef<HTMLDivElement>(null);

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
  }, [element, mousePosition]);

  useLayoutEffect(() => {
    if (window) {
      window.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
      });
    }
  }, []);

  const handleMouseHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsMouseOver(true);
  };

  return (
    <div
      className="magnet-animation-box"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={magnetBox}
    >
      <div
        className="see-projects"
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
          <div className="see-projects__slides__slide slide-1 ">
            <div className="see-projects__slides__slide__image">
              <img
                src="https://i.pinimg.com/564x/f3/7e/a7/f37ea737cc480d66b5ea13c3266e5491.jpg"
                alt="slide-1"
              />
            </div>
          </div>
          <div className="see-projects__slides__slide slide-2 ">
            <div className="see-projects__slides__slide__image">
              <img
                src="https://i.pinimg.com/564x/40/c6/30/40c6306493718141bb7b64d6f6698399.jpg"
                alt="slide-2"
              />
            </div>
          </div>
          <div className="see-projects__slides__slide slide-3">
            <div className="see-projects__slides__slide__image">
              <img
                src="https://i.pinimg.com/564x/40/c6/30/40c6306493718141bb7b64d6f6698399.jpg"
                alt="slide-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
