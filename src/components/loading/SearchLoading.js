import * as React from "react";

function SearchLoading(props) {
  return (
    <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        className="prefix__ldl-scale prefix__running"
        style={{
          transformOrigin: "50% 50%",
        }}
      >
        <g className="prefix__ldl-ani">
          <g
            className="prefix__ldl-layer"
            style={{
              transform: `scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear -0.634921s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <ellipse
              strokeMiterlimit={10}
              strokeWidth={3.5}
              stroke="#333"
              fill="none"
              ry={39}
              rx={15}
              cy={50}
              cx={50}
              transform="scale(.728)"
            />
          </g>
          <g
            className="prefix__ldl-layer"
            style={{
              transform: ` scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear -0.714286s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <ellipse
              strokeMiterlimit={10}
              strokeWidth={3.5}
              stroke="#333"
              fill="none"
              ry={39}
              rx={15}
              cy={50}
              cx={50}
              transform="rotate(-60 36.4 36.401) scale(.728)"
            />
          </g>
          <g
            className="prefix__ldl-layer"
            style={{
              transform: ` scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear -0.793651s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <ellipse
              strokeMiterlimit={10}
              strokeWidth={3.5}
              stroke="#333"
              fill="none"
              ry={15}
              rx={39}
              cy={50}
              cx={50}
              transform="rotate(-30 36.398 36.401) scale(.728)"
            />
          </g>
          <g
            className="prefix__ldl-layer"
            style={{
              transform: ` scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear -0.873016s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <circle
              strokeMiterlimit={10}
              strokeWidth={3.5}
              stroke="#333"
              fill="#f7b26a"
              r={8}
              cy={50}
              cx={50}
              transform="scale(.728)"
            />
          </g>
          <g
            className="prefix__ldl-layer"
            style={{
              transform: ` scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear -0.952381s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <circle
              strokeMiterlimit={10}
              strokeWidth={3.5}
              stroke="#333"
              fill="#77a4bd"
              r={6}
              cy={69.814}
              cx={84.319}
              transform="scale(.728)"
            />
          </g>
          <g
            className="prefix__ldl-layer"
            style={{
              transform: ` scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear -1.03175s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <circle
              stroke="#333"
              fill="#e15c64"
              strokeMiterlimit={10}
              strokeWidth={3.5}
              r={6}
              cy={41.25}
              cx={18}
              transform="scale(.728)"
            />
          </g>
          <g
            className="prefix__ldl-layer"
            style={{
              transform: ` scale(0.91)`,
              transformOrigin: `50px 50px`,
              animation: `1.11111s linear 1.11111s infinite normal forwards running custom-breathre-animation`,
            }}
          >
            <circle
              stroke="#333"
              fill="#acbd81"
              strokeMiterlimit={10}
              strokeWidth={3.5}
              r={6}
              cy={20}
              cx={59}
              transform="scale(.728)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SearchLoading;
