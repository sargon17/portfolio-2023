import React from "react";

import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
  onClick?: () => void;
};
export default function Button({ children, className, styles, onClick }: Props) {
  const [params, setParams] = useState([
    {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    },
    {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    },
    {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    },
    {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    },
    {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    },
    {
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
    },
  ]);

  useEffect(() => {
    const newParams = params.map((param) => {
      return {
        cx: Math.floor(Math.random() * 83),
        cy: Math.floor(Math.random() * 43),
        rx: Math.floor(Math.random() * 83),
        ry: Math.floor(Math.random() * 43),
      };
    });
    setParams(newParams);
  }, []);

  const baseClass = "button";
  const classNames = [baseClass, className].join(" ");

  const baseStyles: React.CSSProperties = {};
  const mergedStyles = { ...baseStyles, ...styles };

  function rand(min: number, max: number): Number {
    return Number(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return (
    <div
      className={classNames}
      style={mergedStyles}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div className="background">
        <svg
          viewBox="0 0 83 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <g clipPath="url(#clip0_102_169)">
            <rect
              width="83"
              height="43"
              fill="#131313"
              className="svg-rect"
            />
            <circle
              cx="63.5"
              cy="34.2422"
              r="21.5"
              className="svg-child-1"
            />
            <ellipse
              cx={params[0].cx.toString()}
              cy={params[0].cy.toString()}
              rx={params[0].rx.toString()}
              ry={params[0].ry.toString()}
              className="svg-child-2"
            />
            <ellipse
              cx={params[1].cx.toString()}
              cy={params[1].cy.toString()}
              rx={params[1].rx.toString()}
              ry={params[1].ry.toString()}
              transform="rotate(32.9173 35.1797 37.3536)"
              className="svg-child-3"
            />
            <ellipse
              opacity="0.7"
              cx={params[2].cx.toString()}
              cy={params[2].cy.toString()}
              rx={params[2].rx.toString()}
              ry={params[2].ry.toString()}
              transform="rotate(122.3 26.5144 22.6707)"
              className="svg-child-4"
            />
            <ellipse
              cx={params[3].cx.toString()}
              cy={params[3].cy.toString()}
              rx={params[3].rx.toString()}
              ry={params[3].ry.toString()}
              transform="rotate(122.3 62.6267 -8.49272)"
              className="svg-child-5"
            />
            <ellipse
              cx={params[4].cx.toString()}
              cy={params[4].cy.toString()}
              rx={params[4].rx.toString()}
              ry={params[4].ry.toString()}
              className="svg-child-6"
            />
            <ellipse
              opacity="0.5"
              cx={params[5].cx.toString()}
              cy={params[5].cy.toString()}
              rx={params[5].rx.toString()}
              ry={params[5].ry.toString()}
              className="svg-child-6"
            />
          </g>
        </svg>
      </div>
      <button>{children}</button>
    </div>
  );
}
