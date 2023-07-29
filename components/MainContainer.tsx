import React from "react";

import Button from "./Button";
import { useLenis } from "@studio-freight/react-lenis";

import Slide from "./Slide";
import Hero from "./_Hero";
import Projects from "./_Projects";
export default function MainContainer() {
  //on scroll update mouse position

  return (
    <div className="main-content-container">
      <Slide>
        <Hero />
      </Slide>
      {/* <Slide>
        <h1>Skills</h1>
      </Slide> */}
      <Slide id="_projects">
        <Projects />
      </Slide>
      {/* <Slide>
        <h1>Slide 4</h1>
      </Slide> */}
      {/* <Slide>
        <h1>Slide 5</h1>
      </Slide> */}
    </div>
  );
}
