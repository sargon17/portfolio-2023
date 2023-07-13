import React from "react";

import Button from "./Button";
import { useLenis } from "@studio-freight/react-lenis";

import Slide from "./Slide";
export default function MainContainer() {
  const lenis = useLenis((scroll: Event) => {
    console.log(scroll);
  });

  return (
    <div className="main-content-container">
      <Slide>
        <h1>Hero</h1>
        <Button> supeeeeeer long button </Button>
      </Slide>
      <Slide>
        <h1>Skills</h1>
      </Slide>
      <Slide>
        <h1>Slide 3</h1>
      </Slide>
      <Slide>
        <h1>Slide 4</h1>
      </Slide>
      <Slide>
        <h1>Slide 5</h1>
      </Slide>
    </div>
  );
}
