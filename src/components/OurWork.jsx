import React, { useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'
import { motion, AnimatePresence } from 'motion/react'

const OurWork = ({ setShowOurProjects }) => {

    const [selectedProject, setSelectedProject] = useState(null)

    const workData = [
        {
            title: 'FarmPick',
            description: 'An elegantly designed e-commerce platform that inspires people to embrace and enjoy natural foods.',
            image: assets.work_mobile_app,
            url: 'http://farmpickshope.vercel.app/'
        },
        {
            title: 'FiberFlow',
            description: 'We created a revolution among the ISP providers and people that made the connectivity a short bridge.',
            image: assets.work_fiberflow,
            url: 'https://fiberflow-react.vercel.app/'
        },
        {
            title: 'Dots nd Decimals',
            description: 'We improvise the unique structure of the IT Infrastructure that made this company a partner for us.',
            image: assets.work_fitness_app,
            url: 'https://dot-decimals-1.onrender.com/'
        },
    ]

    return (
        <>
            <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .glassmorphism-popup {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .dark .glassmorphism-popup {
          background: rgba(30, 30, 40, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 40px 0 rgba(80, 68, 229, 0.2),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .dark .glassmorphism-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 40px 0 rgba(80, 68, 229, 0.3),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .project-logo {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-logo:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .project-card-glow {
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, #5044E5, #4d8cea);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          filter: blur(12px);
        }

        .glassmorphism-card:hover .project-card-glow {
          opacity: 0.6;
        }

        @media (min-width: 768px) {
          .glassmorphism-card {
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            border: none;
            box-shadow: none;
          }

          .dark .glassmorphism-card {
            background: transparent;
            border: none;
            box-shadow: none;
          }

          .project-card-glow {
            display: none;
          }
        }
      `}</style>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.2 }}
                id='our-work' className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
                <Title title='Our Projects' desc='From strategy to execution, we craft digital solutions that move your business forward.' />

                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1.5 sm:gap-4 lg:gap-6 w-full max-w-6xl'>
                    {
                        workData.map((work, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                key={index}
                                className='relative group overflow-hidden rounded-xl cursor-pointer'>

                                {/* Glow Effect for Mobile/Tablet */}
                                <div className="project-card-glow"></div>

                                {/* Mobile & Tablet View - Minimalist (No Glass Box) */}
                                <div className='lg:hidden rounded-xl p-4 h-full flex flex-col items-center justify-center text-center gap-4 min-h-[200px] relative z-10'>
                                    {/* Clickable Logo - Opens Popup */}
                                    <div
                                        onClick={() => setSelectedProject(work)}
                                        className='project-logo w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-800/90 p-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform'
                                    >
                                        <img
                                            src={work.image}
                                            className='w-full h-full object-contain'
                                            alt={work.title}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className='text-base sm:text-lg font-bold text-gray-800 dark:text-white leading-tight'>
                                        {work.title}
                                    </h3>
                                </div>

                                {/* Desktop View - Rectangular Box Concept */}
                                <div className='hidden lg:flex flex-col items-center justify-center text-center gap-4 p-4 h-full min-h-[240px]'>
                                    {/* Clickable Image Box - Opens Popup */}
                                    <div
                                        onClick={() => setSelectedProject(work)}
                                        className='w-full h-40 rounded-2xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-800/90 p-2 cursor-pointer hover:scale-105 transition-transform duration-300'
                                    >
                                        <img
                                            src={work.image}
                                            className='w-full h-full object-cover rounded-xl'
                                            alt={work.title}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className='text-lg font-bold text-gray-800 dark:text-white leading-tight'>
                                        {work.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>

                {/* See More Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    onClick={() => {
                        setShowOurProjects(true)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className='mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                    See More
                </motion.button>

            </motion.div>

            {/* Frosty Glassy Popup Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="glassmorphism-popup w-full max-w-sm p-6 rounded-3xl flex flex-col items-center text-center relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
                            >
                                <img src={assets.close_icon} alt="Close" className="w-4 h-4 dark:invert" />
                            </button>

                            {/* Project Image */}
                            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-lg">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                                {selectedProject.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {selectedProject.description}
                            </p>

                            {/* View Live Project Button */}
                            <a
                                href={selectedProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <span>View Live Project</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default OurWork
