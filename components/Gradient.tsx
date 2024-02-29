"use client";
import { useEffect, useRef, useState, useMemo, use } from "react";
// import { useFrame } from "@react-three/fiber";

// import { Canvas } from "@react-three/fiber";

import { useTheme } from "next-themes";
import { current } from "@reduxjs/toolkit";
import { motion } from "framer-motion";

export default function Gradient() {
  const { theme, setTheme } = useTheme();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    getColors();
  }, [theme]);

  useEffect(() => {
    getColors();
  }, []);

  const getColors = () => {
    const col = colorsVariants.find((item) => item.name === theme) || colorsVariants[0];
    console.log("col", col);
    setColors(col.colors as any);
  };

  return (
    <div className="gradient">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="filter">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="27"
              result="blur"
            />
          </filter>
        </defs>

        <motion.path
          d="M303.606 111.531C60.3922 52.3879 -98.5834 58.3242 69.8928 27.7635C238.369 -2.7972 372.644 -148.345 397.345 -1.47803C422.046 145.389 131.963 176.829 524.019 136.815C607.85 128.258 670.947 115.953 719.862 103.431C735.11 93.1329 744.846 91.1199 753.781 94.1163C898.709 51.5676 896.058 16.7971 1009.81 132.198C1164.99 289.618 1277.73 301.491 1111.15 352.059C944.576 402.627 548.72 546.856 902.773 463.089C1256.83 379.322 1216.92 205.851 1419.6 352.059C1622.28 498.266 1957.33 490.351 1526.64 553.452C1095.95 616.552 1385.4 514.756 1038.95 534.104C692.495 553.452 468.282 648.871 454.982 542.678C441.681 436.485 396.712 444.181 603.823 393.173C810.935 342.165 1071.25 404.825 893.273 311.604C715.296 218.383 738.097 200.354 807.135 188.482C876.172 176.609 1059.85 192 893.273 162.099C795.23 144.499 777.273 101.994 753.781 94.1163C743.282 97.1985 732.009 100.321 719.862 103.431C707.087 112.059 690.443 126.502 667.16 148.687C543.02 266.972 690.595 328.973 473.983 256.419C257.37 183.865 -0.4107 160.779 104.729 142.091C188.84 127.141 272.36 115.488 303.606 111.531Z"
          fill={colors[0]}
          animate={{
            d: "M11.7493 73.5046C405.749 100.005 310.249 -127.495 478.749 107.505C484.799 115.942 490.568 124.395 496.075 132.84C668.471 23.6462 590.826 114.019 576.817 292.336C635.843 439.466 641.501 517.267 757.749 324.005C917.749 58.0049 700.249 39.5046 1006.75 73.5046C1313.25 107.505 1509.25 -142.995 1341.25 196.505C1173.25 536.005 1221.75 710.505 1070.75 444.005C919.749 177.505 1139.25 93.5049 907.249 280.505C675.249 467.505 719.249 856.505 605.249 526.505C575.327 439.887 571.515 359.815 576.817 292.336C557.518 244.231 532.514 188.716 496.075 132.84C485.162 139.752 473.246 147.465 460.249 156.005C164.249 350.505 91.7493 685.005 100.749 420.505C109.749 156.005 130.249 246.505 49.2493 156.005C-15.5507 83.6049 -2.75067 70.838 11.7493 73.5046Z",
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.path
          d="M11.7493 73.5046C405.749 100.005 310.249 -127.495 478.749 107.505C484.799 115.942 490.568 124.395 496.075 132.84C668.471 23.6462 590.826 114.019 576.817 292.336C635.843 439.466 641.501 517.267 757.749 324.005C917.749 58.0049 700.249 39.5046 1006.75 73.5046C1313.25 107.505 1509.25 -142.995 1341.25 196.505C1173.25 536.005 1221.75 710.505 1070.75 444.005C919.749 177.505 1139.25 93.5049 907.249 280.505C675.249 467.505 719.249 856.505 605.249 526.505C575.327 439.887 571.515 359.815 576.817 292.336C557.518 244.231 532.514 188.716 496.075 132.84C485.162 139.752 473.246 147.465 460.249 156.005C164.249 350.505 91.7493 685.005 100.749 420.505C109.749 156.005 130.249 246.505 49.2493 156.005C-15.5507 83.6049 -2.75067 70.838 11.7493 73.5046Z"
          fill={colors[1]}
          animate={{
            d: "M413.858 148.916C322.103 89.4002 84.8481 28.3111 84.8481 28.3111C35.5084 15.9195 -44.3706 -13.3475 30.8316 -31.2821C124.834 -53.7003 125.536 28.3111 256.719 40.5132C387.902 52.7152 332.482 40.5132 345.811 -12.8367C359.14 -66.1865 432.799 -0.6343 476.994 80.8093C521.189 162.253 491.726 132.456 545.041 199.144C598.356 265.831 585.729 223.832 737.957 203.4C890.185 182.969 952.62 210.211 1050.13 148.916C1147.64 87.6205 1015.05 107.768 810.213 148.916C605.371 190.064 585.729 65.7695 432.799 -56.8216C279.869 -179.413 580.818 -59.9431 693.06 35.1217C805.302 130.187 878.26 55.2698 1140.63 55.2698C1402.99 55.2698 1262.69 61.5129 1174.3 219.86C1085.91 378.206 1242.34 249.089 1753.05 322.586C2263.75 396.084 1836.53 334.505 1670.27 498.243C1537.26 629.234 1369.32 575.903 1301.97 532.864C1234.63 489.825 1200.69 435.587 1109.76 379.342C1013.42 319.752 995.095 229.698 820.735 239.44C732.894 244.348 657.07 255.43 630.625 289.668C593.474 337.77 790.592 337.499 860.02 379.342C928.943 420.88 999.737 449.004 977.874 498.243C940.222 583.044 646.246 445.567 526.801 374.234C402.33 299.898 531.307 225.098 413.858 148.916Z",
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.path
          d="M704.5 220C1002.5 238.5 804 170 939 8.49976C922.334 -19.1668 916.3 -67.9 1025.5 -41.5C1162 -8.5 992 -119.5 939 -600.5C886.001 -1081.5 1040.5 -695 1238.5 -507C1436.5 -319 1379.5 -414 1769 -394C2158.5 -374 1617.5 8.49976 1544.5 140C1471.5 271.499 1642.5 155 1952 131.5C2261.5 108 2181.5 -229.5 2580.5 -58.0004C2979.5 113.5 2637.5 258 2409.5 131.5C2181.5 4.99957 2253 193 2028.5 414.5C1804 636 2060 557.5 2401 739C2742 920.5 2331 933.5 1804 990C1277 1046.5 1539.5 832 1769 519C1998.5 206 1923.5 170 1682.5 220C1441.5 270 1538 334.5 1238.5 -187.5C939 -709.5 1103.5 -103 1155 34.9998C1206.5 173 1080.5 135 917.5 208C754.5 281 859 281.5 1115.5 396C1372 510.5 1172 487.5 969 727C766 966.5 894 660.5 880.5 429.5C867 198.5 751 338 458 361C165 384 503 491 659.5 672.5C816 854 633 813.5 400 727C167 640.5 172 763.5 45.5003 519C-80.9997 274.5 75.5003 393 297 240C518.5 86.9998 406.5 201.5 704.5 220Z"
          fill={colors[2]}
          animate={{
            d: "M530 269.5C632.5 311.167 859.2 430.8 946 576C965.833 607.5 989.9 687.2 927.5 754C849.5 837.5 771 589 628 697C485 805 556.5 655.5 129 396C-187 361 129 467.5 556.5 840.5C984 1213.5 711.5 790.5 1177 830.5C1642.5 870.5 1223.5 787 1544.5 597.5C1865.5 408 1633 544 1932 527.5C2231 511 2023.5 534 2308 697C2592.5 860 2454.5 747 2719 617.5C2983.5 488 2749 531 2582.5 288C2416 45 2576 77 2220 56.9999C1864 36.9997 2210 188 2444.5 489.5C2679 791 2424.5 567.5 2042 509C1659.5 450.5 2030.5 269.5 1781 96.5C1531.5 -76.4998 1569.5 35 1243.5 118.5C917.5 202 1340 146.5 1689.5 336C2039 525.5 1544.5 388 1370 597.5C1195.5 807 1173.5 444.5 816 349.5C458.5 254.5 733 269.5 556.5 56.9999C380 -155.5 480 39.9999 299 66.9999C118 93.9998 155.5 58.4998 335.5 215C479.5 340.2 525.167 303.5 530 269.5Z",
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
}

{
  /* <svg
  width="2592"
  height="704"
  viewBox="0 0 2592 704"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M530 269.5C632.5 311.167 859.2 430.8 946 576C965.833 607.5 989.9 687.2 927.5 754C849.5 837.5 771 589 628 697C485 805 556.5 655.5 129 396C-187 361 129 467.5 556.5 840.5C984 1213.5 711.5 790.5 1177 830.5C1642.5 870.5 1223.5 787 1544.5 597.5C1865.5 408 1633 544 1932 527.5C2231 511 2023.5 534 2308 697C2592.5 860 2454.5 747 2719 617.5C2983.5 488 2749 531 2582.5 288C2416 45 2576 77 2220 56.9999C1864 36.9997 2210 188 2444.5 489.5C2679 791 2424.5 567.5 2042 509C1659.5 450.5 2030.5 269.5 1781 96.5C1531.5 -76.4998 1569.5 35 1243.5 118.5C917.5 202 1340 146.5 1689.5 336C2039 525.5 1544.5 388 1370 597.5C1195.5 807 1173.5 444.5 816 349.5C458.5 254.5 733 269.5 556.5 56.9999C380 -155.5 480 39.9999 299 66.9999C118 93.9998 155.5 58.4998 335.5 215C479.5 340.2 525.167 303.5 530 269.5Z"
    fill="#3D3DDB"
    stroke="black"
  />
</svg>; */
}

{
  /* <svg
  width="1423"
  height="1217"
  viewBox="0 0 1423 1217"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M295 455.001C229.603 350.137 60.5005 242.501 60.5005 242.501C25.3338 220.667 -31.5995 169.1 22.0005 137.5C89.0005 98 89.5005 242.501 183 264C276.5 285.499 237 264 246.5 170C256 76 308.5 191.5 340 335C371.5 478.5 350.5 426 388.5 543.5C426.5 661 417.5 587 526 551C634.5 515 679 563 748.5 455.001C818 347.001 723.5 382.5 577.5 455.001C431.5 527.501 417.5 308.501 308.5 92.5005C199.5 -123.499 414 87.0005 494 254.501C574 422.001 626 290.001 813 290.001C1000 290.001 900 301.001 837 580.001C774 859.001 885.5 631.501 1249.5 761.001C1613.5 890.501 1309 782 1190.5 1070.5C1095.7 1301.3 976 1207.33 928 1131.5C880 1055.67 855.812 960.102 791 861.001C722.335 756.006 709.275 597.336 585 614.501C522.392 623.148 468.348 642.674 449.5 703.001C423.021 787.753 563.516 787.275 613 861.001C662.125 934.189 712.583 983.742 697 1070.5C670.164 1219.91 460.634 977.687 375.5 852.001C286.784 721.025 378.712 589.23 295 455.001Z"
    fill="#3D3DDB"
  />
</svg>; */
}

{
  /* <svg
  width="2246"
  height="1722"
  viewBox="0 0 2246 1722"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="1719.5"
    cy="1202.5"
    r="645.5"
    fill="#3D3DDB"
  />
  <ellipse
    cx="436.826"
    cy="690.333"
    rx="576.263"
    ry="1018.5"
    transform="rotate(122.3 436.826 690.333)"
    fill="#3D3DDB"
  />
  <ellipse
    cx="514.637"
    cy="1485.14"
    rx="98.5"
    ry="563"
    transform="rotate(32.9173 514.637 1485.14)"
    fill="#AEAEAE"
  />
  <ellipse
    opacity="0.7"
    cx="555.031"
    cy="1040.65"
    rx="334.563"
    ry="445.136"
    transform="rotate(122.3 555.031 1040.65)"
    fill="#458FE0"
  />
  <ellipse
    cx="1648.26"
    cy="97.2694"
    rx="360.019"
    ry="479.006"
    transform="rotate(122.3 1648.26 97.2694)"
    fill="#3D3DDB"
  />
  <ellipse
    cx="1652"
    cy="1498"
    rx="257"
    ry="539"
    fill="#458FE0"
  />
</svg>; */
}

// type GradientParams = {
//   className?: string;
//   styles?: object;
//   width?: number;
//   height?: number;
// };

// type Color = {
//   r: number;
//   g: number;
//   b: number;
// };

// type Colors = {
//   name: string;
//   colors: Color[];
// };

// export default function Gradient({ className, styles }: GradientParams) {
//   const [dimensions, setDimensions] = useState({
//     width: 0,
//     height: 0,
//   });

//   const canvas = useRef<any>(null!);
//   const baseClass = "gradient";
//   const gradientClass = className ? `${baseClass} ${className}` : baseClass;
//   const gradientStyles = styles ? styles : {};
//   const { theme, setTheme } = useTheme();

//   // // const colors: Colors = useMemo(() => {
//   // //   return colorsVariants.find((item) => item.name === theme) || colorsVariants[0];
//   // // }, [theme]);

//   useEffect(() => {
//     // throw custom event to update the gradient colors
//     const event = new Event("themeChange");
//     window.dispatchEvent(event);
//   }, [theme]);

//   // useEffect(() => {}, []);

//   useEffect(() => {
//     setDimensions({
//       width: window.innerWidth,
//       height: window.innerHeight,
//     });
//   }, []);

//   return (
//     <div
//       className={gradientClass}
//       style={gradientStyles}
//       ref={canvas}
//     >
//       <Canvas>
//         <GradientCanvas dimensions={dimensions} />
//       </Canvas>
//     </div>
//   );
// }

// const vertexShader = /* glsl */ `

// // varying vec3 vPosition;

// uniform float u_time;

//   void main () {

//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//   vec4 viewPosition = viewMatrix * modelPosition;
//   vec4 projectedPosition = projectionMatrix * viewPosition;

//   gl_Position = vec4(position, 1.0);
// }`;

// const fragmentShader = /* glsl */ `

//     	precision highp float;
// uniform float u_time;
// uniform vec2 resolution;

// uniform vec3 u_colorbg;
// uniform vec3 u_color1;
// uniform vec3 u_color2;
// uniform vec3 u_color3;

// float random (vec2 st) {
//     return fract(sin(dot(st.xy,
//                          vec2(12.9898,78.233)))
//         * 43758.5453123);
// }

// float noise (vec2 st) {
//   vec2 i = floor(st);
//   vec2 f = fract(st);

//   // Four corners in 2D of a tile
//   float a = random(i);
//   float b = random(i + vec2(1.0, 0.0));
//   float c = random(i + vec2(0.0, 1.0));
//   float d = random(i + vec2(1.0, 1.0));

//   // Smooth Interpolation

//   // Cubic Hermine Curve.  Same as SmoothStep()
//   vec2 u = f*f*(3.0-2.0*f);
//   // u = smoothstep(0.,1.,f);

//   // Mix 4 corners percentages
//   float n = mix(a, b, u.x) +
//           (c - a)* u.y * (1.0 - u.x) +
//           (d - b) * u.x * u.y;

//   return n;
// }

// void main() {

//   vec3 colorbg = vec3(u_colorbg.rgb);
// vec3 color1 = vec3(u_color1.rgb);
// vec3 color2 = vec3(u_color2.rgb);
// vec3 color3 = vec3(u_color3.rgb);

//   vec2 st = gl_FragCoord.xy/resolution.xy;

//   vec2 pos = vec2(st.x * 0.8 + 0.5 , st.y * 1.8);

//   float tSin = abs(sin(u_time * 0.1)) * 0.3 - 0.2;

//   float n = noise(pos * 2.0 + tSin * 1.2);

//   n = n + tSin;

//   // mix all the 3 colors
//   vec3 colorStep1 = mix(colorbg, color1, smoothstep(0.15, 0.60, n ));
//   vec3 colorStep2 = mix(colorStep1, color2, smoothstep(0.40, 0.90, n ));
//   vec3 color = mix(colorStep2, color3, smoothstep(0.8, 1.0, n ));

//   gl_FragColor = vec4(color, 0.8);
// }
// `;

// function GradientCanvas({ dimensions }: { dimensions: any }) {
//   const mesh = useRef<any>(null!);

//   const [uniforms, setUniforms] = useState({
//     u_time: { value: 0 },
//     resolution: { value: { x: 0, y: 0 } },
//     u_colorbg: { value: { r: 0, g: 255, b: 0 } },
//     u_color1: { value: { r: 0, g: 0, b: 0 } },
//     u_color2: { value: { r: 0, g: 0, b: 0 } },
//     u_color3: { value: { r: 0, g: 0, b: 0 } },
//   });

//   const { theme, setTheme } = useTheme();

//   // const colors: Colors = useMemo(() => {
//   //   return colorsVariants.find((item) => item.name === theme) || colorsVariants[0];
//   // }, [theme]);

//   const time = useRef(0);

//   useFrame(() => {
//     time.current += 0.1;

//     setUniforms((prev) => ({
//       ...prev,
//       u_time: { value: time.current },
//       u_colorbg: { value: { r: 0, g: time.current, b: 0 } },
//     }));
//   });

//   useEffect(() => {
//     setResolution();
//     setShaderColors();
//   }, []);

//   useEffect(() => {
//     setShaderColors();
//   }, [theme]);

//   const setResolution = () => {
//     setUniforms((prev) => ({
//       ...prev,
//       resolution: { value: { x: dimensions.width, y: dimensions.height } },
//     }));
//   };

//   const setShaderColors = () => {
//     const col = colorsVariants.find((item) => item.name === theme) || colorsVariants[0];

//     console.log("setShaderColors", col);

//     setUniforms((prev) => ({
//       ...prev,
//       u_colorbg: { value: col.colors[0] },
//       u_color1: { value: col.colors[1] },
//       u_color2: { value: col.colors[2] },
//       u_color3: { value: col.colors[3] },
//     }));
//   };

//   // useEffect(() => {
//   //   console.log("uniforms", uniforms);
//   // }, [uniforms]);

//   const setMouse = (e: any) => {
//     mesh.current.material.uniforms.u_mouse.value = {
//       x: e.clientX,
//       y: e.clientY,
//     };
//   };

//   return (
//     <mesh ref={mesh}>
//       <planeGeometry
//         attach="geometry"
//         args={[35, 20, 1]}
//       />
//       <shaderMaterial
//         fragmentShader={fragmentShader}
//         vertexShader={vertexShader}
//         uniforms={uniforms}
//       />
//     </mesh>
//   );
// }

const colorsVariants = [
  {
    name: "dark",
    colors: ["#212175", "#79c3b5", "#f7fafc"],
  },
  {
    name: "light",
    colors: ["#79c3b5", "#fa9348", "#e67a2a"],
  },
  {
    name: "pink",
    colors: ["#ff6edf", "#ff20ce", "#ff335a"],
  },
];
