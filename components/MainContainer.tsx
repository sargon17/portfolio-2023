import React from "react";

import Button from "./Button";
import { useLenis } from "@studio-freight/react-lenis";

import Slide from "./Slide";
import Hero from "./_Hero";
import Projects from "./_Projects";
import Contacts from "./_Contacts";
import Experiments from "./_Experiments";
export default function MainContainer() {
  //on scroll update mouse position

  return (
    <div className="main-content-container">
      {/* <Slide id="_main">
        <Hero />
      </Slide> */}
      {/* <Slide>
        <h1>Skills</h1>
      </Slide> */}
      <Slide id="_projects">
        <Projects />
      </Slide>
      {/* <Slide id="_contacts">
        <Contacts />
      </Slide> */}
      {/* <Slide>
        <Experiments />
      </Slide> */}
    </div>
  );
}
