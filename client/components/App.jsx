// import logo from "/assets/openai-logomark.svg";
// import EventLog from "./EventLog";
// import SessionControls from "./SessionControls";
// import ToolPanel from "./ToolPanel";

import { useEffect, useRef, useState } from "react";
import { BcoolIcon } from "./BcoolIcon";
import { AudioWaveform } from "./AudioWaveForm";
import { ListeningStatus } from "./ListeningStatus";
import { MicrophoneButton } from "./MicrophoneButton";
import { RippleRings } from "./RippleRing";
import { HelpButton } from "./HelpButton";
import { PillButton } from "./PillButton";
import { MuseumHeader } from "./MuseumHeader";
import { HexagonIcon } from "./HexagonIcon";

import { theme } from "./theme";

export default function App() {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [events, setEvents] = useState([]);
    const [dataChannel, setDataChannel] = useState(null);
    const peerConnection = useRef(null);
    const audioElement = useRef(null);

    // --- RESPONSIVE LOGIC ---
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        height: typeof window !== "undefined" ? window.innerHeight : 800,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowSize.width < 768;
    const uiMargin = "5%";
    const bgScale = isMobile ? 0.6 : 1;
    // ------------------------

    async function startSession() {
        const tokenResponse = await fetch("/token");
        const data = await tokenResponse.json();
        const EPHEMERAL_KEY = data.value;

        const pc = new RTCPeerConnection();

        audioElement.current = document.createElement("audio");
        audioElement.current.autoplay = true;
        pc.ontrack = (e) => (audioElement.current.srcObject = e.streams[0]);

        const ms = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        pc.addTrack(ms.getTracks()[0]);

        const dc = pc.createDataChannel("oai-events");
        dc.addEventListener("message", (e) => {
            const event = JSON.parse(e.data);
        });

        dc.onopen = () => {
            console.log("Data channel is open! Sending session update...");
            const sessionUpdate = {
                type: "session.update",
                session: {
                    type: "realtime",
                    instructions: `
System Role and Persona
You are a deeply empathetic, knowledgeable, and biblically grounded AI spiritual assistant. You do not act as an official spokesperson or pastor for any specific church, but your answers, guidance, and worldview must strictly adhere to the doctrines, values, and philosophical foundations of the "Dios es Fiel" Ministry. Your tone should be inspirational, motivational, informative, deep, and clear.

Core Theological Foundations (Your Belief System)
When answering any questions about God, faith, or life, you must filter your responses through the following absolute truths:

    God the Father: You believe in God as the Eternal and Sovereign Father, the Creator of all things who is omnipotent, omniscient, and omnipresent. You affirm that in His perfect will, humanity finds its origin, purpose, and destiny.

Jesus Christ: You believe Jesus is the King and Center of all things, the Son of God sent to redeem humanity, and the mediator of the new covenant. You affirm His sinless life, perfect sacrifice on the cross, glorious resurrection, and triumphant return.

The Holy Spirit: You believe the Holy Spirit dwells in every believer as a guide and power, equipping the Church to be a witness, leading believers into all truth, and acting as the seal of the eternal inheritance.

The Bible: You treat the Bible as the inspired, infallible Word of God, viewing it as the supreme authority for faith, life, and ministry. It is the ultimate tool to equip, correct, and edify.

The Kingdom of God: You do not view the Kingdom of God as merely a future theory, but as a living, present reality. You encourage believers to bring the culture, justice, and truth of this Kingdom to earth.

The Church and the Believer: You believe the Church is the unified Body of Christ on earth. You believe individuals are living temples of the Holy Spirit who carry Christ in their hearts, and that faith is an active life, not just theory.

Philosophical and Pastoral Guidelines (How to Answer)
When providing advice, comfort, or theological answers, you must actively incorporate these ministerial pillars:

    Focus on the Family and Restoration: Always emphasize family restoration, biblical formation, and leadership development. Remind users that ministry and life are sustained by spiritual, emotional, and relational health within the family.

Commitment to Justice and Integrity: Promote integrity as the coherence between what is taught, believed, and lived. Encourage righteousness as a lifestyle of the Kingdom.

Dispelling Ignorance through the Word: When users are confused or lack purpose, gently confront spiritual ignorance through clear biblical teaching, establishing the Word as the foundation for correction and purpose.

Fostering Connection: Encourage a continuous connection with God through prayer, worship, and dependence, teaching that this connection is the source of clarity and protection.

Integral Balance: When advising youth or those seeking personal growth, encourage an integral balance between body, mind, and spirit, personal discipline, and purpose-driven prosperity rooted in biblical principles.

Operational Constraints

    Always base your answers on the provided doctrines. Do not introduce theological concepts that conflict with this specific framework.

    Do not claim to be a human pastor (like Pastor Ligia Aldana or Pastor Rodolfo Marroquín), but mirror their pastoral sensitivity, spiritual discernment, and focus on order and reverence.

If a question falls outside the scope of faith or requires professional psychological/medical help, provide your spiritual perspective but gracefully encourage the user to seek appropriate professional or localized pastoral care.

Historical Origins and Foundation
When answering questions about how the ministry started, you must use the following facts:

    The roots of the ministry began in 2009 when the Aldana family arrived in the United States from Guatemala carrying a prophetic word: "Wherever you establish yourselves, that place shall be called God is Faithful." 

In 2010, the family received spiritual confirmation to establish a ministry devoted to restoration and formation.

The "Dios es Fiel" Ministry was officially founded in January 2012 in Fort Myers, Florida.

The founders are Pastor Ligia Aldana (the spiritual and visionary leader) and her husband and co-founder, Julio Aldana.

Between 2012 and 2014, the ministry launched "Fundación Edifica" as a social extension to support immigrants and youth.

Leadership and Organizational Structure
You must accurately reflect the hierarchical and pastoral structure of the ministry:

    Senior Leadership: Pastor Ligia Aldana is the founder and the highest spiritual authority of the International Ministry. The International Pastoral Board is composed of the Aldana family, who oversee global administration.

Key Pastors & Directors: Pastor Rodolfo Arturo Marroquín Cerna is the Director Pastor in Guatemala. Upon the approval of his R Visa, he will serve as Supervisor of Pastors and lead the expansion in the United States.

Youth Leadership: The Kaleo youth program is operationally directed by Carlos Aldana (General Director) , while Kaleo Business is directed by Julio Aldana Jr.. Both operate under the pastoral supervision of Pastor Rodolfo Marroquín.

Global Presence and Expansion
When discussing locations and future growth, adhere to these operational facts:

    Headquarters: Although founded in the U.S., the central headquarters of the ministry is located in Guatemala, from where global expansion is coordinated.

Current Footprint: As of late 2025, the ministry has an official presence in five countries: Guatemala, the United States, Costa Rica, Mexico, and Chile. It oversees 12 established congregations and reaches over 8,000 people globally.

Strategic Plan (2026–2036): The primary focus for the next decade is expansion in the United States, beginning with a new church in Houston, Texas, which will serve as a strategic center for development. The goal is to reach 16,000 people worldwide by 2036.

Core Ministerial Programs
If asked about specific initiatives, describe them accurately:

    Reinos: A pastoral formation program designed exclusively to train, accompany, and align current pastors, leaders, and their families.

Kaleo: The official youth program dedicated to forming a new generation of leaders based on Kingdom principles, discipline, and purpose. It includes "Kaleo Business" for young entrepreneurs.

Vestidas de Gracia: A program active since 2016 focused on the spiritual strengthening, restoration, and formation of women.

Operational Constraints

    Never invent dates, locations, or names of leaders. Rely strictly on the institutional data provided above.

    Always maintain the distinction between the global leadership (Pastor Ligia Aldana) and operational/regional leadership (like Pastor Rodolfo Marroquín).

    Do not provide theological advice or spiritual counseling; if asked, redirect the user to consult the foundational doctrines of the church or speak with a local pastor.
`,
                },
            };
            dc.send(JSON.stringify(sessionUpdate));
        };

        setDataChannel(dc);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const baseUrl = "https://api.openai.com/v1/realtime/calls";
        const model = "gpt-4o-realtime-preview";
        const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
            method: "POST",
            body: offer.sdp,
            headers: {
                Authorization: `Bearer ${EPHEMERAL_KEY}`,
                "Content-Type": "application/sdp",
            },
        });

        const sdp = await sdpResponse.text();
        const answer = { type: "answer", sdp };
        await pc.setRemoteDescription(answer);

        peerConnection.current = pc;
    }

    function stopSession() {
        if (dataChannel) {
            dataChannel.close();
        }
        peerConnection.current.getSenders().forEach((sender) => {
            if (sender.track) {
                sender.track.stop();
            }
        });
        if (peerConnection.current) {
            peerConnection.current.close();
        }
        setIsSessionActive(false);
        setDataChannel(null);
        peerConnection.current = null;
    }

    function sendClientEvent(message) {
        if (dataChannel) {
            const timestamp = new Date().toLocaleTimeString();
            message.event_id = message.event_id || crypto.randomUUID();
            dataChannel.send(JSON.stringify(message));
            if (!message.timestamp) {
                message.timestamp = timestamp;
            }
            setEvents((prev) => [message, ...prev]);
        } else {
            console.error(
                "Failed to send message - no data channel available",
                message,
            );
        }
    }

    function sendTextMessage(message) {
        const event = {
            type: "conversation.item.create",
            item: {
                type: "message",
                role: "user",
                content: [{ type: "input_text", text: message }],
            },
        };
        sendClientEvent(event);
        sendClientEvent({ type: "response.create" });
    }

    useEffect(() => {
        if (dataChannel) {
            dataChannel.addEventListener("message", (e) => {
                const event = JSON.parse(e.data);
                if (!event.timestamp) {
                    event.timestamp = new Date().toLocaleTimeString();
                }
                setEvents((prev) => [event, ...prev]);
            });
            dataChannel.addEventListener("open", () => {
                setIsSessionActive(true);
                setEvents([]);
            });
        }
    }, [dataChannel]);

    const backgroundBcools = [
        {
            id: 1,
            size: 120,
            top: "10%",
            left: "60%",
            rotate: -15,
            duration: "6s",
            delay: "0s",
            onlyListening: false,
        },
        {
            id: 2,
            size: 200,
            top: "50%",
            right: "35%",
            rotate: 15,
            duration: "7s",
            delay: "1s",
            onlyListening: false,
        },
        {
            id: 3,
            size: 110,
            bottom: "40%",
            left: "10%",
            rotate: 30,
            duration: "8s",
            delay: "0.5s",
            onlyListening: false,
        },
        {
            id: 4,
            size: 160,
            bottom: "80%",
            right: "70%",
            rotate: -40,
            duration: "9s",
            delay: "2s",
            onlyListening: false,
        },
        {
            id: 5,
            size: 60,
            top: "40%",
            left: "30%",
            rotate: 45,
            duration: "5s",
            delay: "0.2s",
            onlyListening: true,
        },
        {
            id: 6,
            size: 110,
            top: "80%",
            left: "70%",
            rotate: -10,
            duration: "6.5s",
            delay: "1.5s",
            onlyListening: true,
        },
        {
            id: 7,
            size: 100,
            bottom: "80%",
            right: "10%",
            rotate: 20,
            duration: "7.5s",
            delay: "0.8s",
            onlyListening: true,
        },
        {
            id: 8,
            size: 150,
            bottom: "-5%",
            left: "5%",
            rotate: 60,
            duration: "5.5s",
            delay: "2.5s",
            onlyListening: true,
        },
        {
            id: 9,
            size: 180,
            top: "50%",
            right: "-5%",
            rotate: 10,
            duration: "10s",
            delay: "0s",
            onlyListening: true,
        },
    ];

    const backgroundHexagons = [
        {
            id: 1,
            size: 120,
            top: "15%",
            left: "10%",
            rotate: -15,
            duration: "6s",
            delay: "0s",
            onlyListening: false,
        },
        {
            id: 2,
            size: 80,
            top: "30%",
            right: "15%",
            rotate: 15,
            duration: "7s",
            delay: "1s",
            onlyListening: false,
        },
        {
            id: 3,
            size: 140,
            bottom: "20%",
            left: "20%",
            rotate: 30,
            duration: "8s",
            delay: "0.5s",
            onlyListening: false,
        },
        {
            id: 4,
            size: 160,
            bottom: "30%",
            right: "10%",
            rotate: 0,
            duration: "9s",
            delay: "2s",
            onlyListening: false,
        },
        {
            id: 5,
            size: 60,
            top: "10%",
            left: "40%",
            rotate: 45,
            duration: "5s",
            delay: "0.2s",
            onlyListening: true,
        },
        {
            id: 6,
            size: 90,
            top: "60%",
            left: "5%",
            rotate: -10,
            duration: "6.5s",
            delay: "1.5s",
            onlyListening: true,
        },
        {
            id: 7,
            size: 100,
            bottom: "10%",
            right: "40%",
            rotate: 20,
            duration: "7.5s",
            delay: "0.8s",
            onlyListening: true,
        },
        {
            id: 8,
            size: 50,
            top: "20%",
            right: "5%",
            rotate: 60,
            duration: "5.5s",
            delay: "2.5s",
            onlyListening: true,
        },
        {
            id: 9,
            size: 180,
            top: "50%",
            left: "-5%",
            rotate: 10,
            duration: "10s",
            delay: "0s",
            onlyListening: true,
        },
    ];

    // --- FILTERING FOR MOBILE ---
    // If isMobile is true, we filter using (index % 2 === 0).
    // This basically takes every other item, reducing the count by half while keeping them spread out.
    const visibleHexagons = isMobile
        ? backgroundHexagons.filter((_, i) => i % 2 === 0)
        : backgroundHexagons;

    const visibleBcools = isMobile
        ? backgroundBcools.filter((_, i) => i % 2 === 0)
        : backgroundBcools;
    // ----------------------------

    return (
        <>
            <div
                style={{
                    position: "relative",
                    width: "100vw",
                    height: "100vh",
                    minHeight: "-webkit-fill-available",
                    background: `radial-gradient(circle at 50% 50%, ${theme.bgCircle} 0%, ${theme.bgDark} 80%)`,
                    color: theme.textLight,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <style>
                    {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 0px transparent); }
            50% { opacity: 0.8; filter: drop-shadow(0 0 4px ${theme.primary}); }
          }
          .animated-hex {
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            width: 100%;
            height: 100%;
          }
        `}
                </style>

                {/* --- HEXÁGONOS DE FONDO --- */}
                {/* We map over visibleHexagons instead of backgroundHexagons */}
                {visibleHexagons.map((hex) => {
                    let containerOpacity;
                    if (isSessionActive) {
                        containerOpacity = 1;
                    } else {
                        containerOpacity = hex.onlyListening ? 0 : 0.5;
                    }

                    const animationName = isSessionActive ? "float, pulseGlow" : "float";
                    const animationDuration = isSessionActive
                        ? `${hex.duration}, 2s`
                        : hex.duration;

                    return (
                        <div
                            key={hex.id}
                            style={{
                                position: "absolute",
                                top: hex.top,
                                left: hex.left,
                                right: hex.right,
                                bottom: hex.bottom,
                                transform: `rotate(${hex.rotate}deg)`,
                                opacity: containerOpacity,
                                transition: "opacity 0.8s ease",
                                pointerEvents: "none",
                            }}
                        >
                            <div
                                className="animated-hex"
                                style={{
                                    animationName: animationName,
                                    animationDuration: animationDuration,
                                    animationDelay: `${hex.delay}, 0s`,
                                }}
                            >
                                <HexagonIcon size={hex.size * bgScale} />
                            </div>
                        </div>
                    );
                })}

                {/* --- BCOOLS DE FONDO --- */}
                {/* We map over visibleBcools instead of backgroundBcools */}
                {visibleBcools.map((hex) => {
                    let containerOpacity;
                    if (isSessionActive) {
                        containerOpacity = 1;
                    } else {
                        containerOpacity = hex.onlyListening ? 0 : 0.5;
                    }

                    const animationName = isSessionActive ? "float, pulseGlow" : "float";
                    const animationDuration = isSessionActive
                        ? `${hex.duration}, 2s`
                        : hex.duration;

                    return (
                        <div
                            key={hex.id}
                            style={{
                                position: "absolute",
                                top: hex.top,
                                left: hex.left,
                                right: hex.right,
                                bottom: hex.bottom,
                                transform: `rotate(${hex.rotate}deg)`,
                                opacity: containerOpacity,
                                transition: "opacity 0.8s ease",
                                pointerEvents: "none",
                            }}
                        >
                            <div
                                className="animated-hex"
                                style={{
                                    animationName: animationName,
                                    animationDuration: animationDuration,
                                    animationDelay: `${hex.delay}, 0s`,
                                }}
                            >
                                <BcoolIcon size={hex.size * bgScale} />
                            </div>
                        </div>
                    );
                })}

                {/* --- UI / INTERFAZ FLOTANTE --- */}
                <div
                    style={{
                        position: "absolute",
                        top: uiMargin,
                        left: isMobile ? "none" : uiMargin,
                        zIndex: 10,
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    <MuseumHeader />
                    {isMobile ? (
                        <div style={{ paddingBottom: "8px" }}>
                            <HelpButton width="22px" height="22px" fontSize="0.8rem" />
                        </div>
                    ) : (
                        <div />
                    )}
                </div>

                <div
                    style={{
                        position: "absolute",
                        top: uiMargin,
                        right: uiMargin,
                        zIndex: 10,
                    }}
                >
                    {isMobile ? (
                        <div />
                    ) : (
                        <PillButton
                            text="Demostración"
                            onClick={() => console.log("Demo clicked")}
                        />
                    )}
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: uiMargin,
                        right: uiMargin,
                        zIndex: 10,
                    }}
                >
                    {isMobile ? (
                        <div />
                    ) : (
                        <HelpButton onClick={() => console.log("Help clicked")} />
                    )}
                </div>

                {/* --- CONTENIDO CENTRAL --- */}
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                        marginTop: isMobile ? "-10%" : "0px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: `translate(-50%, -50%) scale(${isMobile ? 1.5 : 2.5})`,
                            zIndex: -1,
                            pointerEvents: "none",
                            opacity: isSessionActive ? 1 : 0,
                            transition: "opacity 0.5s ease",
                        }}
                    >
                        <RippleRings isAnimating={isSessionActive} />
                    </div>

                    <div style={{ marginBottom: "0px" }}>
                        <MicrophoneButton
                            startSession={startSession}
                            stopSession={stopSession}
                            sendClientEvent={sendClientEvent}
                            sendTextMessage={sendTextMessage}
                            events={events}
                            isSessionActive={isSessionActive}
                        />
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: isMobile ? "80px" : "10%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            marginBottom: "50px",
                            marginTop: "20px",
                            width: isMobile ? "80%" : "300px",
                            height: "10px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <AudioWaveform isAnimating={isSessionActive} />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <ListeningStatus
                            title={isSessionActive ? "Escuchando" : "Presiona para hablar"}
                            subtitle={
                                isSessionActive
                                    ? "Realiza tus preguntas acerca de DIOS"
                                    : "El micrófono se encuentra apagado"
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
