import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
};
export default function Button({ children, className, styles }: Props) {
  const baseClass = "button";
  const classNames = [baseClass, className].join(" ");

  const baseStyles: React.CSSProperties = {};
  const mergedStyles = { ...baseStyles, ...styles };

  function rand(min: number, max: number): Number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={classNames} style={mergedStyles}>
      <div className="background">
        <svg
          viewBox="0 0 83 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
        >
          <g clip-path="url(#clip0_102_169)">
            <rect width="83" height="43" fill="#131313" className="svg-rect" />
            <circle cx="63.5" cy="34.2422" r="21.5" className="svg-child-1" />
            <ellipse
              cx={rand(10, 83).toString()}
              cy={rand(10, 34).toString()}
              rx={rand(10, 83 / 2).toString()}
              ry={rand(10, 43 / 2).toString()}
              className="svg-child-2"
            />
            <ellipse
              cx={rand(10, 83).toString()}
              cy={rand(10, 34).toString()}
              rx={rand(10, 83 / 2).toString()}
              ry={rand(10, 43 / 2).toString()}
              transform="rotate(32.9173 35.1797 37.3536)"
              className="svg-child-3"
            />
            <ellipse
              opacity="0.7"
              cx={rand(10, 83).toString()}
              cy={rand(10, 34).toString()}
              rx={rand(10, 83 / 2).toString()}
              ry={rand(10, 43 / 2).toString()}
              transform="rotate(122.3 26.5144 22.6707)"
              className="svg-child-4"
            />
            <ellipse
              cx={rand(10, 83).toString()}
              cy={rand(10, 34).toString()}
              rx={rand(10, 83 / 2).toString()}
              ry={rand(10, 43 / 2).toString()}
              transform="rotate(122.3 62.6267 -8.49272)"
              className="svg-child-5"
            />
            <ellipse
              cx={rand(10, 83).toString()}
              cy={rand(10, 34).toString()}
              rx={rand(10, 83 / 2).toString()}
              ry={rand(10, 43 / 2).toString()}
              className="svg-child-6"
            />
            <ellipse
              opacity="0.5"
              cx={rand(10, 83).toString()}
              cy={rand(10, 34).toString()}
              rx={rand(10, 83 / 2).toString()}
              ry={rand(10, 43 / 2).toString()}
              className="svg-child-6"
            />
          </g>
        </svg>
      </div>
      <button>{children}</button>
    </div>
  );
}
