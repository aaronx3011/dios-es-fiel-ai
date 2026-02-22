import React from "react";
import { theme } from "./theme";

export const AudioWaveform = ({ isAnimating = false }) => {
  const bars = [40, 70, 30, 80, 50, 90, 60, 40, 75, 45, 85, 55, 35, 65, 40];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        height: "30px",
      }}
    >
      <style>
        {`
          @keyframes waveBounce {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.5); }
          }
        `}
      </style>
      {bars.map((height, i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: isAnimating ? `${height}%` : "10%",
            backgroundColor: theme.primary,
            borderRadius: "4px",
            animation: isAnimating
              ? `waveBounce 2s infinite ease-in-out`
              : "none",
            animationDelay: isAnimating ? `${i * 0.06 - 0.45}s` : "0s",
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
};
