import React from "react";
import { theme } from "./theme";

export const MuseumHeader = () => {
    return (
        <h3
            style={{
                color: theme.primary,
                fontSize: "1.2rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                letterSpacing: "3px",
                borderBottom: `0.2rem solid ${theme.primary}`,
                paddingBottom: "8px",
                display: "inline-block",
            }}
        >
            Dios es fiel
        </h3>
    );
};
