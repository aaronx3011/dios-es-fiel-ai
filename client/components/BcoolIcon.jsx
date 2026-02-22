import React from "react";
import { theme } from "./theme";

export const BcoolIcon = ({ size = 64 }) => {
    return (
        <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={size}
            height={size}
            fill="none"
            stroke={theme.primary}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5.979 10.974v5.021h7.041v11.99h5.042v-11.99h6.958v-5.021h-6.958v-6.958h-5.042v6.958h-7.041z"
                fill={theme.primary}
            />
        </svg>
    );
};
