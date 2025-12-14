import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useHandTracking } from './useHandTracking';
import { useVoiceAssistant } from './useVoiceAssistant';
import ParticleSystem from './ParticleSystem';

function App() {
    const { gesture, handData, isReady, videoRef } = useHandTracking();
    const { aiResponse } = useVoiceAssistant();

    return (
        <div className="relative w-full h-screen bg-black text-white font-sans overflow-hidden">
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
            {aiResponse && (
                <div className="absolute bottom-24 left-0 w-full text-center pointer-events-none z-50 px-4">
                    <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] tracking-tight"
                        style={{ textShadow: "0 0 30px cyan" }}
                    >
                        {aiResponse}
                    </h1>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-ping shadow-[0_0_20px_red]" />
                        <p className="text-sm text-cyan-200 uppercase tracking-[0.3em] font-bold bg-black/50 px-4 py-2 rounded-full border border-cyan-500/50 backdrop-blur-md">
                            Listening...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
