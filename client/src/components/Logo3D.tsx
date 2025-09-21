import React from "react";

type Props = {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
};

export default function Logo3D({
  size = 160,
  primaryColor = "#06b6d4",
  secondaryColor = "#0369a1",
}: Props) {
  return (
    <div style={{ width: size, height: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="NextMailz logo"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>

          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="10"
              floodColor="#000000"
              floodOpacity="0.2"
            />
          </filter>

          <radialGradient id="glow" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx="100" cy="100" r="96" fill="url(#glow)" />

        {/* Main envelope box */}
        <rect
          x="40"
          y="60"
          width="120"
          height="80"
          rx="12"
          ry="12"
          fill="url(#grad)"
          filter="url(#shadow)"
        />

        {/* Envelope flap */}
        <path
          d="M40 60 L100 110 L160 60 Z"
          fill="white"
          opacity="0.15"
        />

        {/* Inner highlight */}
        <path
          d="M44 64 L100 106 L156 64"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
          fill="none"
        />

        {/* Brand text */}
        <text
          x="100"
          y="165"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
          fill="#0f172a"
        >
          NextMailz
        </text>
      </svg>
    </div>
  );
}
