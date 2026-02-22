import React from "react";
import { theme } from "./theme";

export const PillButton = ({ text = "Demostración", onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: theme.primary,
                color: theme.bgDark,
                border: "none",
                borderRadius: "9999px",
                padding: "12px 32px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
        >
            {text}
        </button>
    );
};
