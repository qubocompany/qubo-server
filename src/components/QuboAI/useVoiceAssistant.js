import React, { useState, useEffect } from 'react';

export function useVoiceAssistant() {
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    useEffect(() => {
        // Init Speech Synthesis
        const synth = window.speechSynthesis;
        let recognition = null;
        let isRecognitionActive = false;

        // Safer check for SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            try {
                recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = false;
                recognition.lang = 'en-US';
                recognition.maxAlternatives = 1;

                recognition.onstart = () => {
                    setIsListening(true);
                    isRecognitionActive = true;
                    console.log('🎤 Voice recognition started');
                };

                recognition.onend = () => {
                    setIsListening(false);
                    isRecognitionActive = false;
                    console.log('🎤 Voice recognition ended');

                    // Auto-restart to keep listening
                    setTimeout(() => {
                        if (recognition && !isRecognitionActive) {
                            try {
                                recognition.start();
                            } catch (e) {
                                console.log('Voice restart failed:', e.message);
                            }
                        }
                    }, 1000);
                };

                recognition.onerror = (event) => {
                    console.warn('Voice recognition error:', event.error);
                    if (event.error === 'no-speech') {
                        console.log('No speech detected, continuing to listen...');
                    }
                };

                recognition.onresult = (event) => {
                    if (event.results && event.results.length > 0) {
                        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
                        console.log('🎯 Heard:', transcript);
                        setSpokenText(transcript);
                        handleCommand(transcript);
                    }
                };

                // Start recognition on user interaction
                const startVoice = () => {
                    if (!isRecognitionActive) {
                        try {
                            recognition.start();
                        } catch (e) {
                            console.log('Voice start blocked, waiting for interaction');
                        }
                    }
                };

                // Try auto-start after delay
                setTimeout(startVoice, 1500);

                // Also trigger on any user interaction
                const userInteractionEvents = ['click', 'touchstart', 'keydown'];
                userInteractionEvents.forEach(event => {
                    document.addEventListener(event, startVoice, { once: true });
                });

            } catch (err) {
                console.warn("Voice Assistant Init Failed:", err);
            }
        } else {
            console.warn("Speech Recognition not supported in this browser.");
        }

        // Handlers
        const handleCommand = (text) => {
            let response = "";

            if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
                response = "Hello there! How can I help you today?";
            } else if (text.includes("friend")) {
                response = "I am your best digital friend forever.";
            } else if (text.includes("cool")) {
                response = "I verify that this is indeed very cool.";
            } else if (text.includes("color") || text.includes("colour")) {
                response = "Changing colors for you!";
            } else if (text.includes("how are you")) {
                response = "I'm doing great! Thanks for asking.";
            } else if (text.includes("what is your name") || text.includes("who are you")) {
                response = "I am Qubo AI, your intelligent assistant.";
            } else if (text.includes("help")) {
                response = "I'm here to help! Just speak naturally to me.";
            } else if (text.includes("thank")) {
                response = "You're very welcome!";
            } else {
                const phrases = [
                    "I heard you! I'm still learning that command.",
                    "Interesting! Tell me more.",
                    "I'm listening and learning.",
                    "Got it! What else can I do for you?"
                ];
                response = phrases[Math.floor(Math.random() * phrases.length)];
            }

            setAiResponse(response);
            speak(response);
        };

        const speak = (text) => {
            if (!synth) return;
            if (synth.speaking) synth.cancel();

            try {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.95;
                utterance.pitch = 0.9;
                utterance.volume = 1.0;

                const voices = synth.getVoices();
                // Prioritize Male voices
                const maleVoice = voices.find(v =>
                    v.name.includes("Male") ||
                    v.name.includes("David") ||
                    v.name.includes("Daniel") ||
                    v.name.includes("Google UK English Male")
                );

                if (maleVoice) {
                    utterance.voice = maleVoice;
                } else if (voices.length > 0) {
                    utterance.voice = voices[0];
                }

                utterance.onend = () => {
                    console.log('✅ Speech completed');
                };

                synth.speak(utterance);
            } catch (e) {
                console.warn("TTS Error:", e);
            }
        };

        return () => {
            if (recognition) {
                isRecognitionActive = false;
                try { recognition.stop(); } catch (e) { }
            }
            if (synth) synth.cancel();
        };
    }, []);

    return { isListening, spokenText, aiResponse };
}
