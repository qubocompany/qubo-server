import React, { useState, useEffect } from 'react';

export function useVoiceAssistant() {
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    useEffect(() => {
        // Init Speech Synthesis
        const synth = window.speechSynthesis;
        let recognition = null;

        // Safer check for SpeechRecognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            try {
                recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => setIsListening(true);
                recognition.onend = () => setIsListening(false);

                recognition.onresult = (event) => {
                    if (event.results && event.results.length > 0) {
                        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
                        setSpokenText(transcript);
                        handleCommand(transcript);
                    }
                };

                // Try starting, might fail without user interaction
                // We wrap in timeout to delay it slightly
                setTimeout(() => {
                    try { recognition.start(); } catch (e) { console.log('Auto-start voice blocked'); }
                }, 1000);

            } catch (err) {
                console.warn("Voice Assistant Init Failed:", err);
            }
        } else {
            console.warn("Speech Recognition not supported in this browser.");
        }

        // Handlers
        const handleCommand = (text) => {
            console.log("Heard:", text);
            let response = "";

            if (text.includes("hello") || text.includes("hi")) {
                response = "Hello there! How can I help you today?";
            } else if (text.includes("friend")) {
                response = "I am your best digital friend forever.";
            } else if (text.includes("cool")) {
                response = "I verify that this is indeed very cool.";
            } else if (text.includes("color")) {
                response = "Changing colors for you!";
            } else {
                const phrases = [
                    "I am still in development...",
                    "I am listening."
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
                utterance.rate = 1.0;
                utterance.pitch = 0.9; // Deeper pitch for male voice

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
                } else {
                    // Fallback to first available if no specific male voice found,
                    // attempting to avoid high pitched default if possible
                    utterance.voice = voices[0];
                }

                synth.speak(utterance);
            } catch (e) {
                console.warn("TTS Error:", e);
            }
        };

        return () => {
            if (recognition) {
                try { recognition.stop(); } catch (e) { }
            }
            if (synth) synth.cancel();
        };
    }, []);

    return { isListening, spokenText, aiResponse };
}
