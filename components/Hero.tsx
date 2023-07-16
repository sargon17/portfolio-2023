import React from "react";

import { useLayoutEffect, useState, useRef } from "react";

import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";

import Gradient from "./Gradient";
import SeeProjects from "./SeeProjects";

export default function Hero() {
  const dispatch = useDispatch();
  const hero = useRef<HTMLDivElement>(null);

  let heroWidth = 3258;
  let gradientHigh = 1000;

  const [gradientDimensions, setGradientDimensions] = useState({
    width: 3258,
    height: 1000,
  });

  useLayoutEffect(() => {
    if (hero.current) {
      setGradientDimensions({
        ...gradientDimensions,
        width: hero.current.getBoundingClientRect().width,
      });
    }
    if (window) {
      setGradientDimensions({
        ...gradientDimensions,
        height: window.innerHeight * 0.35,
      });
    }
  }, []);

  return (
    <div
      className="hero"
      ref={hero}
    >
      <div className="hero__heading">
        <div className="hero__title">
          <h2 className="hero__title__title">
            Unleashing Digital{" "}
            <span className="row-2">
              <span className="accent">Visions</span>
              <span className="description">Crafting Bold and Mesmerizing Websites</span>
            </span>
          </h2>
        </div>
        <div
          className="hero__location"
          onMouseEnter={() => {
            dispatch(setContent("based in"));
          }}
          onMouseLeave={() => {
            dispatch(setContent(""));
          }}
        >
          <p>
            <span className="open">(</span>
            <span className="content">milan, italy</span>
            <span className="close">)</span>
          </p>
        </div>
      </div>
      <div className="hero__content">
        <div className="hero__content__image">
          <SeeProjects />
        </div>
        <div className="hero__gradient">
          <Gradient
            width={heroWidth}
            height={gradientHigh}
          />
        </div>
        <div className="hero__content__text">
          <p>
            Everyone knew it was impossible, until a{" "}
            <span className="hero__content__text--accent"> fool </span> who didn&apos;t know came along and
            did it.
          </p>
        </div>
      </div>
    </div>
  );
}
