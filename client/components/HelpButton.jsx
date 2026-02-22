import React from "react";
import { theme } from "./theme";

export const HelpButton = ({
  onClick,
  width = "48px",
  height = "48px",
  fontSize = "1.5rem",
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: width,
        height: height,
        borderRadius: "50%",
        border: `2px solid ${theme.primary}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        cursor: "pointer",
        color: theme.primary,
        fontSize: fontSize,
        fontWeight: "bold",
        fontFamily: "sans-serif",
      }}
    >
      ?
    </button>
  );
};
