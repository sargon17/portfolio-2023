import React from "react";

import { useDispatch } from "react-redux";
import { setPosition } from "@/contexts/features/mouse/mousePosition";

// import Gradient from "../components/Gradient";

import Sidebar from "@/components/Sidebar";
import MainContainer from "@/components/MainContainer";
import MouseHelper from "@/components/MouseHelper";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <main
        className="main"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          dispatch(setPosition({ x: clientX, y: clientY }));
        }}
      >
        <ReactLenis
          root
          options={{
            smoothWheel: true,
            duration: 1.4,
            wheelMultiplier: 1.4,
          }}
        >
          <Sidebar />
          <MainContainer />
          <MouseHelper />
        </ReactLenis>
      </main>
    </div>
  );
}
