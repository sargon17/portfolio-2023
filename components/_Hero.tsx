"use client";

import React, { useState, useRef } from "react";

import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";

import Gradient from "./ui/Gradient";
import SeeProjects from "./ui/SeeProjects";

import { ScopesText } from "@/utils/animations";

type HeroProps = {
  seeProjects: React.ReactNode;
};

export default function Hero(props: HeroProps) {
  const dispatch = useDispatch();
  const hero = useRef<HTMLDivElement>(null);

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
            dispatch(setDimension({ width: 100, height: 100 }));
            dispatch(setContent("based in"));
          }}
          onMouseLeave={() => {
            dispatch(setDimension({ width: 10, height: 10 }));
            dispatch(setContent(""));
          }}
        >
          <ScopesText>milan, italy</ScopesText>
        </div>
      </div>
      <div className="hero__content">
        <div className="hero__content__image">{props.seeProjects}</div>
        <div className="hero__gradient">
          {" "}
          <Gradient />{" "}
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
