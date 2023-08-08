import React from "react";

import Magnet from "./Magnet";

export default function Experiments() {
  return (
    <div className="experiments">
      <div className="center">
        <Magnet
          returnToOrigin
          force={{ x: 1, y: 1 }}
          displayMagnetZone
          magnetZoneDiameter={600}
        >
          <div>
            <p>the incredible content</p>
          </div>
        </Magnet>
      </div>
    </div>
  );
}
