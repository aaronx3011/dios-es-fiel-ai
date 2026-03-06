import React from "react";
import { theme } from "./theme";

import { useState } from "react";

function SessionStopped({ startSession }) {
    const [isActivating, setIsActivating] = useState(false);

    function handleStartSession() {
        if (isActivating) return;

        setIsActivating(true);
        startSession();
    }

    const size = 80;
    const buttonStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: theme.primary,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: `0 4px 15px ${theme.primary}66`,
        transition: "transform 0.2s ease, background-color 0.2s ease",
    };
    return (
        <div>
            <button
                style={buttonStyle}
                onClick={handleStartSession}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label="Start listening"
            >
                <svg
                    width={size * 0.5}
                    height={size * 0.5}
                    viewBox="0 0 24 24"
                    fill={theme.textDark}
                >
                    <>

                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </>
                </svg>
            </button>
        </div>
    );
}

function SessionActive({ stopSession, sendTextMessage }) {
    const [message, setMessage] = useState("");

    const size = 80;
    const buttonStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: theme.primary,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: `0 4px 15px ${theme.primary}66`,
        transition: "transform 0.2s ease, background-color 0.2s ease",
    };
    function handleSendClientEvent() {
        sendTextMessage(message);
        setMessage("");
    }

    return (
        <div>
            <button
                style={buttonStyle}
                onClick={stopSession}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label="Stop listening"
            >
                <svg
                    width={size * 0.5}
                    height={size * 0.5}
                    viewBox="0 0 24 24"
                    fill={theme.textDark}
                >
                    <>
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        <path d="m21.12 21.89-.7-.7L3.28 4.05l.7-.7a1 1 0 0 1 1.41 0l17.14 17.13a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0z" />
                    </>
                </svg>
            </button>
        </div>
    );
}

// export default function SessionControls({
//   startSession,
//   stopSession,
//   sendClientEvent,
//   sendTextMessage,
//   serverEvents,
//   isSessionActive,
// }) {
//   return (
//     <div className="flex gap-4 border-t-2 border-gray-200 h-full rounded-md">
//       {isSessionActive ? (
//         <SessionActive
//           stopSession={stopSession}
//           sendClientEvent={sendClientEvent}
//           sendTextMessage={sendTextMessage}
//           serverEvents={serverEvents}
//         />
//       ) : (
//         <SessionStopped startSession={startSession} />
//       )}
//     </div>
//   );
// }

export const MicrophoneButton = ({
    startSession,
    stopSession,
    size = 80,
    isSessionActive,
    sendClientEvent,
    sendTextMessage,
    serverEvents,
}) => {
    const buttonStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: theme.primary,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: `0 4px 15px ${theme.primary}66`,
        transition: "transform 0.2s ease, background-color 0.2s ease",
    };

    return (
        <div>
            {isSessionActive ? (
                <SessionActive
                    stopSession={stopSession}
                    sendClientEvent={sendClientEvent}
                    sendTextMessage={sendTextMessage}
                    serverEvents={serverEvents}
                />
            ) : (
                <SessionStopped startSession={startSession} />
            )}
        </div>
    );
};
