import React, { useEffect } from 'react'
import { motion } from 'motion/react'

const Launcher = ({ targetUrl, toolName }) => {

    useEffect(() => {
        if (!targetUrl) return;

        const timer = setTimeout(() => {
            window.location.href = targetUrl
        }, 2500) // 2.5 seconds animation

        return () => clearTimeout(timer)
    }, [targetUrl])

    return (
        <div className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-20 dark:opacity-20 animate-[pulse_4s_ease-in-out_infinite]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
            >
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-24 h-24 mx-auto mb-8 bg-gradient-to-tr from-[#5044E5] to-[#4d8cea] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40"
                >
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-6"
                >
                    Launching {toolName || 'Tool'}
                </motion.h1>

                <div className="w-64 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 2.2, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-[#5044E5] via-[#4d8cea] to-[#5044E5] animate-shimmer bg-[length:200%_100%]"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase"
                >
                    Initializing Environment...
                </motion.p>
            </motion.div>
        </div>
    )
}

export default Launcher
