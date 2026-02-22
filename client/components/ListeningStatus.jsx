import React from "react";
import { theme } from "./theme";

export const ListeningStatus = ({
  title = "I'm listening...",
  subtitle = "Ask your question about bees",
}) => {
  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h2
        style={{
          color: theme.primary,
          fontSize: "2rem",
          margin: "0 0 8px 0",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: theme.primary,
          fontSize: "1rem",
          opacity: 0.9,
          margin: 0,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};
