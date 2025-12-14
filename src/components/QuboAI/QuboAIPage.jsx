import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from "motion/react";
import { useHandTracking } from './useHandTracking';
import { useVoiceAssistant } from './useVoiceAssistant';
import ParticleSystem from './ParticleSystem';

function QuboAIPage() {
    const { gesture, handData, isReady, videoRef } = useHandTracking();
    const { aiResponse } = useVoiceAssistant();
    const [showSensors, setShowSensors] = useState(true);

    useEffect(() => {
        // Hide the sensors indicator after 4 seconds
        const timer = setTimeout(() => {
            setShowSensors(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#010115] pointer-events-none" />

            {/* Status Indicator (Non-blocking) */}
            <AnimatePresence>
                {showSensors && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-3"
                    >
                        <div className="flex items-center gap-3 px-6 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
                            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
                            <div className="w-3 h-3 rounded-full bg-cyan-500 absolute" />
                            <span className="text-sm md:text-base text-cyan-200 font-mono tracking-[0.3em] font-bold uppercase">Starting Sensors...</span>
                        </div>
                        <p className="text-xs text-cyan-400/70 font-mono">Initializing AI Systems</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Scene */}
            <Canvas
                className="absolute inset-0 w-full h-full"
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100vw', height: '100vh' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.5} />
                <ParticleSystem handData={handData} gesture={gesture} />
                <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
            </Canvas>

            {/* Hidden Video Feed for Tracking */}
            <video ref={videoRef} className="hidden" autoPlay playsInline muted />

            {/* AI Friend UI Overlay */}
            {aiResponse && (
                <div className="absolute bottom-24 left-0 w-full text-center pointer-events-none z-50 px-4 flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={aiResponse}
                            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
                            exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5044E5] via-[#8A84FF] to-[#4d8cea] drop-shadow-sm tracking-wide py-2"
                            style={{ lineHeight: 1.2 }}
                        >
                            {aiResponse}
                        </motion.h1>
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default QuboAIPage;
