"use client";
import React, { use } from "react";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { Canvas } from "@react-three/fiber";

type GradientParams = {
  className?: string;
  styles?: object;
  width?: number;
  height?: number;
};

export default function Gradient({ className, styles }: GradientParams) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const canvas = useRef<any>(null!);
  const baseClass = "gradient";
  const gradientClass = className ? `${baseClass} ${className}` : baseClass;
  const gradientStyles = styles ? styles : {};

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <div
      className={gradientClass}
      style={gradientStyles}
      ref={canvas}
    >
      <Canvas>
        <GradientCanvas dimensions={dimensions} />
      </Canvas>
    </div>
  );
}

const vertexShader = /* glsl */ `

// varying vec3 vPosition;

uniform float u_time;

  void main () {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = vec4(position, 1.0);
}`;

const fragmentShader = /* glsl */ `


    	precision highp float;
uniform float u_time;
uniform vec2 resolution;

uniform vec3 u_colorbg;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;


float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
        * 43758.5453123);
}

float noise (vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smooth Interpolation


  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f*f*(3.0-2.0*f);
  // u = smoothstep(0.,1.,f);

  // Mix 4 corners percentages
  float n = mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;



  return n;
}


void main() {

  vec3 colorbg = vec3(u_colorbg.rgb);
vec3 color1 = vec3(u_color1.rgb);
vec3 color2 = vec3(u_color2.rgb);
vec3 color3 = vec3(u_color3.rgb);


  vec2 st = gl_FragCoord.xy/resolution.xy;


  vec2 pos = vec2(st.x * 2.8 , st.y * 3.4);

  float tSin = abs(sin(u_time * 0.1)) * 0.3 - 0.2;

  float n = noise(pos + tSin * 1.2);

  n = n + tSin;

  // mix all the 3 colors
  vec3 colorStep1 = mix(colorbg, color1, smoothstep(0.15, 0.60, n ));
  vec3 colorStep2 = mix(colorStep1, color2, smoothstep(0.40, 0.90, n ));
  vec3 color = mix(colorStep2, color3, smoothstep(0.8, 1.0, n ));


  gl_FragColor = vec4(color, 0.8);
}
`;

function GradientCanvas({ dimensions }: { dimensions: any }) {
  const mesh = React.useRef<any>(null!);

  const time = useRef(0);

  useFrame(() => {
    time.current += 0.01;

    mesh.current.material.uniforms.u_time.value = time.current;

    setShaderColors();
  });

  useEffect(() => {
    setResolution();
    // document.addEventListener("mousemove", setMouse);
    // document.addEventListener("resize", setResolution);

    return () => {
      // document.removeEventListener("mousemove", setMouse);
      // document.removeEventListener("resize", setResolution);
    };
  }, []);

  const setResolution = () => {
    console.log(dimensions);
    mesh.current.material.uniforms.resolution.value = {
      x: dimensions.width,
      y: dimensions.height,
    };
  };

  const setShaderColors = () => {
    // get data-theme from html
    const theme = document.documentElement.getAttribute("data-theme");

    let colors: any = colorsVariants.find((item) => item.name === theme);

    // convert hex to rgb and then to vec3
    colors = colors.colors.map((color: string) => {
      // remove the # from the hex

      const rgb = hexToRgb(color);

      if (!rgb) return;

      const r = rgb.r / 255;
      const g = rgb.g / 255;
      const b = rgb.b / 255;

      return { r, g, b };
    });

    mesh.current.material.uniforms.u_colorbg.value = {
      r: colors[0].r,
      g: colors[0].g,
      b: colors[0].b,
    };
    mesh.current.material.uniforms.u_color1.value = {
      r: colors[1].r,
      g: colors[1].g,
      b: colors[1].b,
    };

    mesh.current.material.uniforms.u_color2.value = {
      r: colors[2].r,
      g: colors[2].g,
      b: colors[2].b,
    };

    mesh.current.material.uniforms.u_color3.value = {
      r: colors[3].r,
      g: colors[3].g,
      b: colors[3].b,
    };
  };

  const setMouse = (e: any) => {
    mesh.current.material.uniforms.u_mouse.value = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  let uniforms = {
    u_time: { value: 0 },
    resolution: { value: { x: 0, y: 0 } },
    u_colorbg: { value: { r: 0, g: 0, b: 0 } },
    u_color1: { value: { r: 0, g: 0, b: 0 } },
    u_color2: { value: { r: 0, g: 0, b: 0 } },
    u_color3: { value: { r: 0, g: 0, b: 0 } },
  };

  return (
    <mesh ref={mesh}>
      <planeGeometry
        attach="geometry"
        args={[35, 20, 1]}
      />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

const colorsVariants = [
  {
    name: "dark",
    colors: ["#131313", "#212175", "#79c3b5", "#f7fafc"],
  },
  {
    name: "light",
    colors: ["#f7fafc", "#79c3b5", "#fa9348", "#e67a2a"],
  },
  {
    name: "pink",
    colors: ["#ffeafa", "#ff6edf", "#ff20ce", "#ff335a"],
  },
];
