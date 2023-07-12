import React from "react";

type Props = {
  text: string;
  className?: string;
  styles?: React.CSSProperties;
};
export default function Button({ text, className, styles }: Props) {
  const baseClass = "button";
  const classNames = [baseClass, className].join(" ");

  const baseStyles: React.CSSProperties = {};
  const mergedStyles = { ...baseStyles, ...styles };

  return (
    <div
      className={classNames}
      style={mergedStyles}
    >
      <div className="background">
        <svg
          width="83"
          height="43"
          viewBox="0 0 83 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_102_169)">
            <rect
              width="83"
              height="43"
              fill="#131313"
            />
            <circle
              cx="63.5"
              cy="34.2422"
              r="21.5"
              fill="#3D3DDB"
            />
            <ellipse
              cx="12.6096"
              cy="1.0985"
              rx="19.0356"
              ry="33.6439"
              transform="rotate(122.3 12.6096 1.0985)"
              fill="#3D3DDB"
            />
            <ellipse
              cx="35.1797"
              cy="37.3536"
              rx="3.25373"
              ry="18.5975"
              transform="rotate(32.9173 35.1797 37.3536)"
              fill="#AEAEAE"
            />
            <ellipse
              opacity="0.7"
              cx="26.5144"
              cy="22.6707"
              rx="11.0515"
              ry="14.7041"
              transform="rotate(122.3 26.5144 22.6707)"
              fill="#458FE0"
            />
            <ellipse
              cx="62.6267"
              cy="-8.49272"
              rx="11.8924"
              ry="15.8229"
              transform="rotate(122.3 62.6267 -8.49272)"
              fill="#3D3DDB"
            />
            <ellipse
              cx="62.5"
              cy="37.7422"
              rx="8.5"
              ry="18"
              fill="#458FE0"
            />
            <ellipse
              opacity="0.5"
              cx="79"
              cy="40.2422"
              rx="7"
              ry="7.5"
              fill="#AEAEAE"
            />
            <g filter="url(#filter0_b_102_169)">
              <rect
                width="82"
                height="43"
                fill="#131313"
                fill-opacity="0.01"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_b_102_169"
              x="-12"
              y="-12"
              width="106"
              height="67"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood
                flood-opacity="0"
                result="BackgroundImageFix"
              />
              <feGaussianBlur
                in="BackgroundImageFix"
                stdDeviation="6"
              />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_102_169"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_backgroundBlur_102_169"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_102_169">
              <rect
                width="83"
                height="43"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <button>{text}</button>
    </div>
  );
}
