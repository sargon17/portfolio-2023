import React from "react";

import Gradient from "./Gradient";
import SeeProjects from "./SeeProjects";

export default function Hero() {
  return (
    <div className="hero">
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
        <div className="hero__location">
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
          <Gradient />
        </div>
      </div>
    </div>
  );
}
