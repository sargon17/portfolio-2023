"use client";
import React from "react";

import { useDispatch } from "react-redux";
import { setPosition } from "@/contexts/features/mouse/mousePosition";

import Sidebar from "@/components/Sidebar";
import MainContainer from "@/components/MainContainer";
import MouseHelper from "@/components/MouseHelper";

import Slide from "@/components/Slide";

import Hero from "@/components/_Hero";
import Projects from "@/components/_Projects";
import Contacts from "@/components/_Contacts";

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
        <div className="main-background">
          <BGSvg />
        </div>
        <ReactLenis
          root
          options={{
            smoothWheel: true,
            duration: 1.4,
            wheelMultiplier: 1.4,
          }}
        >
          <Sidebar />
          <MainContainer>
            <Slide id="_main">
              <Hero />
            </Slide>
            {/* <Slide>
        <h1>Skills</h1>
      </Slide> */}
            <Slide id="_projects">
              <Projects />
            </Slide>
            <Slide id="_contacts">
              <Contacts />
            </Slide>
            {/* <Slide>
        <Experiments />
      </Slide> */}
          </MainContainer>
          <MouseHelper />
        </ReactLenis>
      </main>
    </div>
  );
}

const BGSvg = () => {
  return (
    <svg
      width="1482"
      height="1022"
      viewBox="0 0 1482 1022"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.0002 174.001C16.846 131.869 -5.3778 96.8041 2.50023 42.5008C16.3235 -52.7834 99.7436 234.147 190.5 202.001C269.934 173.865 185.233 10.1847 269 1.00076C344.811 -7.31082 349.356 88.819 402 144.001C454.231 198.75 537.5 282.501 537.5 282.501C537.5 282.501 575.801 341.559 585.5 384.501C617.529 526.311 396.77 119.141 269 188.501C236.891 205.931 233.344 239.012 198.5 250.001C137.032 269.386 93.2923 223.489 52.0002 174.001Z"
        fill="#FA9348"
      />
      <path
        d="M246 232.001C205.795 232.221 259.378 294.79 280.5 329.001C334.005 415.66 441.67 372.946 514.5 444.139C577.648 505.866 555.974 588.214 627.5 640.001C751.507 729.785 883.171 498.718 1014.5 577.403C1063.68 606.866 1061.69 688.68 1118.5 681.001C1189.75 671.369 1120.21 559.605 1078 501.403C1003.92 399.257 862.305 518.005 760 444.139C701.786 402.107 701.398 262.796 642 303.139C592.618 336.68 664.795 400.828 642 456.001C582.719 599.49 295 262.001 295 262.001C295 262.001 268.437 231.878 246 232.001Z"
        fill="#FA9348"
      />
      <path
        d="M874.5 613.501C961.036 586.344 988.262 715.393 1078.5 724.501C1182.35 734.983 1228.5 600.121 1328.5 630.001C1449.15 666.05 1505.84 797.85 1471.5 919.001C1459.24 962.249 1457.27 1005.18 1414.5 1019C1356 1037.91 1343.04 952.574 1312 899.501C1280.85 846.234 1302.29 793.968 1258 751.001C1162.66 658.514 1035.78 1002.58 952 899.501C917.726 857.333 948.843 807.614 914.5 765.501C876.732 719.188 777.76 761.219 775.5 701.501C773.544 649.81 825.146 628.99 874.5 613.501Z"
        fill="#FA9348"
      />
    </svg>
  );
};
