import React, { useContext, useState, useEffect, useRef } from 'react';
import { InterviewContext } from '../../main.jsx';
import { FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash, FaExpand, FaCompress } from "react-icons/fa";
import { BsThreeDotsVertical, BsRecordCircle } from "react-icons/bs";
import { IoMdChatboxes } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import Vapi from "@vapi-ai/web";
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StartInterview = () => {
    const { interviewInfo } = useContext(InterviewContext);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [timer, setTimer] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const navigateTo = useNavigate();
    const { id } = useParams();

    const vapiRef = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const timerRef = useRef(null);
    const isMountedRef = useRef(true);
    const conversationEndRef = useRef(null);

    // Scroll to bottom of conversation
    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    // Initialize Vapi and event handlers
    useEffect(() => {
        isMountedRef.current = true;

        // Load any previous conversation from localStorage
        const savedInterview = localStorage.getItem('currentInterview');
        if (savedInterview) {
            const { conversation: savedConversation, timer: savedTimer } = JSON.parse(savedInterview);
            setConversation(savedConversation || []);
            setTimer(savedTimer || 0);
        }

        const initializeVapi = async () => {
            try {
                if (!vapiRef.current) {
                    vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

                    // Setup event handlers
                    vapiRef.current.on("call-start", () => {
                        if (isMountedRef.current) {
                            setConnectionStatus('Connected');
                            toast.success("Connected to interview... Do not reload the page");
                        }
                    });

                    vapiRef.current.on("speech-start", () => {
                        if (isMountedRef.current) {
                            setIsSpeaking(true);
                        }
                    });

                    vapiRef.current.on("speech-end", () => {
                        if (isMountedRef.current) {
                            setIsSpeaking(false);
                        }
                    });

                    vapiRef.current.on("message", (message) => {
                        if (!isMountedRef.current) return;

                        if (message?.type === 'transcript' && message.transcript) {
                            // Add user transcript to conversation
                            const newMessage = {
                                role: 'user',
                                content: message.transcript,
                                timestamp: new Date().toISOString()
                            };
                            setConversation(prev => {
                                const updated = [...prev, newMessage];
                                localStorage.setItem('currentInterview', JSON.stringify({
                                    conversation: updated,
                                    timer,
                                    interviewInfo
                                }));
                                return updated;
                            });
                        }
                        else if (message?.type === 'conversation-update' && message.conversation) {
                            // Update full conversation state
                            setConversation(message.conversation);
                            localStorage.setItem('currentInterview', JSON.stringify({
                                conversation: message.conversation,
                                timer,
                                interviewInfo
                            }));
                        }
                        else if (message?.type === 'assistant-speech' && message.status === 'started') {
                            // Add assistant speech start to conversation
                            const newMessage = {
                                role: 'assistant',
                                content: '...', // Placeholder for speech
                                timestamp: new Date().toISOString()
                            };
                            setConversation(prev => {
                                const updated = [...prev, newMessage];
                                localStorage.setItem('currentInterview', JSON.stringify({
                                    conversation: updated,
                                    timer,
                                    interviewInfo
                                }));
                                return updated;
                            });
                        }
                    });

                    vapiRef.current.on("call-end", async () => {
                        if (isMountedRef.current) {
                            await handleCallEnd();
                        }
                    });

                    vapiRef.current.on("error", (error) => {
                        if (isMountedRef.current) {
                            console.error("Vapi error:", error);
                            setConnectionStatus('Connection error');
                            toast.error("Interview connection error");
                        }
                    });

                    if (interviewInfo) {
                        await startCall();
                    }
                }
            } catch (error) {
                console.error("Initialization error:", error);
                if (isMountedRef.current) {
                    setConnectionStatus('Failed to connect');
                    toast.error("Failed to initialize interview");
                }
            }
        };

        initializeVapi();

        // Timer setup
        timerRef.current = setInterval(() => {
            if (isMountedRef.current) {
                setTimer(prev => prev + 1);
            }
        }, 1000);

        // Cleanup
        return () => {
            isMountedRef.current = false;
            clearInterval(timerRef.current);

            if (vapiRef.current) {
                vapiRef.current.stop().catch(console.error);
                vapiRef.current.off("call-start");
                vapiRef.current.off("speech-start");
                vapiRef.current.off("speech-end");
                vapiRef.current.off("message");
                vapiRef.current.off("call-end");
                vapiRef.current.off("error");
            }

            localStorage.removeItem('currentInterview');
        };
    }, [interviewInfo]);

    // Update video streams when they change
    useEffect(() => {
        if (localVideoRef.current && interviewInfo?.localStream) {
            localVideoRef.current.srcObject = interviewInfo.localStream;
        }
        if (remoteVideoRef.current && interviewInfo?.remoteStream) {
            remoteVideoRef.current.srcObject = interviewInfo.remoteStream;
        }
    }, [interviewInfo?.localStream, interviewInfo?.remoteStream]);

    const startCall = async () => {
        try {
            const questionList = interviewInfo?.questions.map(item => item.question).join(", ");

            const assistantOptions = {
                name: "AI Interviewer",
                firstMessage: `Hi ${interviewInfo?.userName}! Welcome to your interview for the ${interviewInfo.jobPosition} position. I'm here to guide you through a few questions. Let's have a great conversation!`,
                transcriber: {
                    provider: "deepgram",
                    model: "nova-2",
                    language: "en-US",
                    keywords: interviewInfo?.skills?.map(skill => skill.toLowerCase()) || []
                },
                voice: {
                    provider: "playht",
                    voiceId: "jennifer",
                },
                model: {
                    provider: "openai",
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are conducting an interview for ${interviewInfo?.jobPosition} position.
                            Ask one question at a time from this list: ${questionList}
                            Provide brief feedback after each answer. Keep responses natural and conversational.`
                        },
                    ],
                }
            };

            await vapiRef.current.start(assistantOptions);
        } catch (error) {
            console.error("Failed to start call:", error);
            toast.error("Failed to start interview");
            setConnectionStatus('Failed to start');
        }
    };

    const handleCallEnd = async () => {
        try {
            setIsLoading(true);
            toast.success("Generating feedback...");

            // Generate feedback with the complete conversation
            const feedback = await generateFeedback(conversation);

            if (isMountedRef.current) {
                navigateTo('/thank-you', {
                    state: {
                        userName: interviewInfo?.userName,
                        jobPosition: interviewInfo?.jobPosition,
                        duration: formatTime(timer),
                        conversation: conversation,
                        feedback: feedback
                    }
                });
            }
        } catch (error) {
            console.error("Error ending call:", error);
            if (isMountedRef.current) {
                toast.error("Error completing interview");
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
            }
        }
    };

    const handleEndCall = async () => {
        try {
            setIsLoading(true);
            await vapiRef.current?.stop();
        } catch (error) {
            console.error("Error stopping call:", error);
            toast.error("Error ending call");
        } finally {
            setIsLoading(false);
        }
    };

    const generateFeedback = async (conversationData) => {
        try {
            if (!conversationData || conversationData.length === 0) {
                throw new Error("No conversation data available");
            }

            // Structure the conversation for the backend
            const formattedConversation = conversationData.map(msg => ({
                role: msg.role,
                content: msg.content,
                timestamp: msg.timestamp || new Date().toISOString()
            }));

            const { data } = await axios.post(
                "https://careermate-app.onrender.com/api/v1/interview/interview-feedback",
                {
                    conversation: formattedConversation,
                    interview_id: id,
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    jobPosition: interviewInfo?.jobPosition,
                    skills: interviewInfo?.skills
                },
                { withCredentials: true }
            );

            if (!data.success) {
                throw new Error(data.message || "Feedback generation failed");
            }
            return data.feedbackData;
        } catch (error) {
            console.error("Feedback error:", error);
            toast.error(error.response?.data?.message || error.message);
            throw error;
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    if (!interviewInfo) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Loading interview information...</h2>
                    <p>Please wait while we prepare your interview session.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
            {/* Video Container */}
            <div className="absolute inset-0 flex items-center justify-center" onClick={() => setShowControls(!showControls)}>
                {/* Remote Video */}
                <div className="relative w-full h-full flex items-center justify-center bg-gray-800">
                    {interviewInfo?.remoteStream ? (
                        <video
                            autoPlay
                            playsInline
                            ref={remoteVideoRef}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-white">
                            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                                <span className="text-4xl">
                                    {interviewInfo?.userName?.[0]?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <p className="text-xl">{interviewInfo?.userName || 'User'}</p>
                            <p className="text-gray-400">{connectionStatus}</p>
                        </div>
                    )}
                </div>

                {/* Local Video */}
                <div className="absolute bottom-4 right-4 w-1/4 max-w-xs h-1/4 max-h-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
                    {interviewInfo?.localStream ? (
                        <video
                            autoPlay
                            playsInline
                            muted
                            ref={localVideoRef}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                            <span className="text-xl">
                                {interviewInfo?.userName?.[0]?.toUpperCase() || 'Y'}
                            </span>
                        </div>
                    )}
                    {isVideoOff && (
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                            <FaVideoSlash className="text-white text-2xl" />
                        </div>
                    )}
                </div>

                {/* Speaking Indicator */}
                {isSpeaking && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        <span>{conversation[conversation.length - 1]?.role === 'user' ? 'You are speaking' : 'Interviewer is speaking'}</span>
                    </div>
                )}
            </div>

            {/* Conversation Panel (Optional) */}
            <div className="absolute top-20 left-4 w-80 bg-black bg-opacity-50 rounded-lg p-4 text-white max-h-96 overflow-y-auto">
                <h3 className="font-bold mb-2">Conversation</h3>
                <div className="space-y-2">
                    {conversation.map((msg, index) => (
                        <div key={index} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-900' : 'bg-gray-800'}`}>
                            <p className="font-semibold">{msg.role === 'user' ? 'You' : 'Interviewer'}:</p>
                            <p>{msg.content}</p>
                        </div>
                    ))}
                    <div ref={conversationEndRef} />
                </div>
            </div>

            {/* Top Bar */}
            {showControls && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent p-4 flex justify-between items-center z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            {interviewInfo?.userName?.[0]?.toUpperCase() || 'I'}
                        </div>
                        <div>
                            <h3 className="text-white font-medium">{interviewInfo?.userName || 'Interview'}</h3>
                            <p className="text-gray-300 text-sm">{formatTime(timer)} • {connectionStatus}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-white hover:bg-gray-700 p-2 rounded-full">
                            <RiUserSettingsLine size={20} />
                        </button>
                        <button className="text-white hover:bg-gray-700 p-2 rounded-full">
                            <BsThreeDotsVertical size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Bottom Controls */}
            {showControls && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex justify-center items-center space-x-6 z-10">
                    <button
                        className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'} text-white`}
                        onClick={() => setIsMuted(!isMuted)}
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                    </button>

                    <button
                        className={`p-3 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'} text-white`}
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        title={isVideoOff ? 'Turn on video' : 'Turn off video'}
                    >
                        {isVideoOff ? <FaVideoSlash size={20} /> : <FaVideo size={20} />}
                    </button>

                    <button
                        className={`p-3 rounded-full ${isLoading ? 'bg-gray-500' : 'bg-red-600'} text-white`}
                        onClick={handleEndCall}
                        disabled={isLoading}
                        title="End call"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <FaPhone size={20} />
                        )}
                    </button>

                    <button
                        className="p-3 rounded-full bg-gray-700 text-white"
                        title="Chat"
                    >
                        <IoMdChatboxes size={20} />
                    </button>

                    <button
                        className="p-3 rounded-full bg-gray-700 text-white"
                        onClick={toggleFullscreen}
                        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                        {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
                    </button>
                </div>
            )}

            {/* Connection Status */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${connectionStatus === 'Connected' ? 'bg-green-500' :
                    connectionStatus.includes('error') ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                {connectionStatus}
            </div>
        </div>
    );
};

export default StartInterview;