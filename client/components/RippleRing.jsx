import React from "react";
import { theme } from "./theme";

export const RippleRings = ({ isAnimating = false }) => {
  const containerStyle = {
    position: "relative",
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const styles = `
    @keyframes pulseRing {
      0%, 100% { opacity: 0; }
      50% { opacity: var(--target-opacity); }
    }
  `;

  const getRingStyle = (size, maxOpacity) => ({
    position: "absolute",
    width: `${size}%`,
    height: `${size}%`,
    borderRadius: "50%",
    border: `1px solid ${theme.primary}`,
    opacity: isAnimating ? 0 : maxOpacity,
    "--target-opacity": maxOpacity,
    animation: isAnimating ? "pulseRing 2s infinite ease-in-out" : "none",
  });

  return (
    <div style={containerStyle}>
      <style>{styles}</style>
      <div style={getRingStyle(100, 0.2)} />
      <div style={getRingStyle(75, 0.4)} />
      <div style={getRingStyle(50, 0.7)} />
    </div>
  );
};
