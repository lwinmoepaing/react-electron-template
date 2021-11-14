import React from "react";

function CrystalLoading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <defs>
        <mask id="ldio-s55mxt6h66-mask">
          <path
            fill="#fff"
            stroke="#000"
            strokeWidth="0"
            d="M50 13l25 17v40L50 87 25 70V30l25-17z"
          ></path>
        </mask>
      </defs>
      <path fill="#007fff" d="M50 13l25 17v40L50 87 25 70V30l25-17z"></path>
      <path
        fill="#007fff"
        d="M50 13l25 17v40L50 87l8.3-17V30z"
        mask="url(#ldio-s55mxt6h66-mask)"
      >
        <animate
          attributeName="d"
          begin="-0.2s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
        ></animate>
        <animate
          attributeName="fill"
          begin="-0.2s"
          dur="1s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="#007fff;#ffffff;#6494ff"
        ></animate>
      </path>
      <path
        fill="#007fff"
        d="M50 13l25 17v40L50 87l8.3-17V30z"
        mask="url(#ldio-s55mxt6h66-mask)"
      >
        <animate
          attributeName="d"
          begin="-0.4s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
        ></animate>
        <animate
          attributeName="fill"
          begin="-0.4s"
          dur="1s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="#007fff;#ffffff;#6494ff"
        ></animate>
      </path>
      <path
        fill="#007fff"
        d="M50 13l25 17v40L50 87l8.3-17V30z"
        mask="url(#ldio-s55mxt6h66-mask)"
      >
        <animate
          attributeName="d"
          begin="-0.6s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
        ></animate>
        <animate
          attributeName="fill"
          begin="-0.6s"
          dur="1s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="#007fff;#ffffff;#6494ff"
        ></animate>
      </path>
      <path
        fill="#007fff"
        d="M50 13l25 17v40L50 87l8.3-17V30z"
        mask="url(#ldio-s55mxt6h66-mask)"
      >
        <animate
          attributeName="d"
          begin="-0.8s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
        ></animate>
        <animate
          attributeName="fill"
          begin="-0.8s"
          dur="1s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="#007fff;#ffffff;#6494ff"
        ></animate>
      </path>
      <path
        fill="#007fff"
        d="M50 13l25 17v40L50 87l8.3-17V30z"
        mask="url(#ldio-s55mxt6h66-mask)"
      >
        <animate
          attributeName="d"
          begin="-1s"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="M50 13L90 30L90 70L50 87L75 70L75 30Z;M50 13L25 30L25 70L50 87L10 70L10 30Z"
        ></animate>
        <animate
          attributeName="fill"
          begin="-1s"
          dur="1s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="#007fff;#ffffff;#6494ff"
        ></animate>
      </path>
      <path fill="#007fff" d="M25 30h50M25 70h50"></path>
    </svg>
  );
}

export default CrystalLoading;
