import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from "motion/react";
import { useHandTracking } from './useHandTracking';
import { useVoiceAssistant } from './useVoiceAssistant';
import ParticleSystem from './ParticleSystem';

function QuboAIPage() {
    const { gesture, handData, isReady, videoRef } = useHandTracking();
    const { aiResponse } = useVoiceAssistant();

    return (
        <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden fixed top-0 left-0 z-10">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-[#010115] pointer-events-none" />

            {/* Status Indicator (Non-blocking) */}
            {!isReady && (
                <div className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-cyan-500/20">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                    <span className="text-xs text-cyan-200 font-mono tracking-widest">STARTING SENSORS...</span>
                </div>
            )}

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
            <div className="absolute bottom-24 left-0 w-full text-center pointer-events-none z-50 px-4 flex justify-center">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={aiResponse || "default"}
                        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5044E5] via-[#8A84FF] to-[#4d8cea] drop-shadow-sm tracking-wide py-2"
                        style={{ lineHeight: 1.2 }}
                    >
                        {aiResponse ? aiResponse : "Hi Friend !"}
                    </motion.h1>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default QuboAIPage;
