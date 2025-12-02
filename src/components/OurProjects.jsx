import React, { useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'
import { motion, AnimatePresence } from 'motion/react'

const OurProjects = () => {

    const [activeCategory, setActiveCategory] = useState('Website')
    const [selectedProject, setSelectedProject] = useState(null)

    const categories = ["Website", "Apps", "Web Apps", "ERP Softwares", "AI"]

    const allProjects = [
        {
            title: 'Fork&Knife',
            description: 'A cutting-edge solution that transforms how businesses interact with their customers digitally.',
            image: assets.work_fork_knife,
            url: 'https://forkandknife-1.vercel.app/',
            category: 'Web Apps'
        },
        {
            title: 'Ride Infinity',
            description: 'Innovative platform designed to streamline operations and enhance user experience.',
            image: assets.work_ride_infinity,
            url: 'https://ride-infinity.vercel.app/',
            category: 'Website'
        },
        {
            title: 'Agrozy Foods',
            description: 'Revolutionary app that bridges the gap between technology and everyday life.',
            image: assets.work_agrozy,
            url: 'https://agrozy-foods.vercel.app/',
            category: 'Website'
        },
        {
            title: 'FarmPick',
            description: 'An elegantly designed e-commerce platform that inspires people to embrace and enjoy natural foods.',
            image: assets.work_mobile_app,
            url: 'http://farmpickshope.vercel.app/',
            category: 'Apps'
        },
        {
            title: 'FiberFlow',
            description: 'We created a revolution among the ISP providers and people that made the connectivity a short bridge.',
            image: assets.work_fiberflow,
            url: 'https://fiberflow-react.vercel.app/',
            category: 'Web Apps'
        },
        {
            title: 'Dots nd Decimals',
            description: 'We improvise the unique structure of the IT Infrastructure that made this company a partner for us.',
            image: assets.work_fitness_app,
            url: 'https://dot-decimals-1.onrender.com/',
            category: 'AI'
        },
    ]

    const filteredProjects = allProjects.filter(project => project.category === activeCategory)

    return (
        <div className='min-h-screen pt-32 pb-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-gray-700 dark:text-white'>
            <style>{`
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
      `}</style>

            <div className='flex flex-col items-center gap-8'>
                <Title title='Our Projects' desc='Explore our diverse portfolio across different domains.' />

                {/* Categories */}
                <div className='flex flex-wrap justify-center gap-3 sm:gap-4 mb-8'>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white border-transparent shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#5044E5] dark:hover:border-[#5044E5] hover:text-[#5044E5] dark:hover:text-[#5044E5]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-1.5 sm:gap-4 lg:gap-6 w-full max-w-6xl'>
                    <AnimatePresence mode='wait'>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className='relative group overflow-hidden rounded-xl cursor-pointer'
                                >

                                    {/* Glow Effect for Mobile/Tablet */}
                                    <div className="project-card-glow"></div>

                                    {/* Mobile & Tablet View - Minimalist (No Glass Box) */}
                                    <div className='lg:hidden rounded-xl p-4 h-full flex flex-col items-center justify-center text-center gap-4 min-h-[200px] relative z-10'>
                                        {/* Clickable Logo - Opens Popup */}
                                        <div
                                            onClick={() => setSelectedProject(project)}
                                            className='project-logo w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-800/90 p-4 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform'
                                        >
                                            <img
                                                src={project.image}
                                                className='w-full h-full object-contain'
                                                alt={project.title}
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3 className='text-base sm:text-lg font-bold text-gray-800 dark:text-white leading-tight'>
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Desktop View - Rectangular Box Concept */}
                                    <div className='hidden lg:flex flex-col items-center justify-center text-center gap-4 p-4 h-full min-h-[240px]'>
                                        {/* Clickable Image Box - Opens Popup */}
                                        <div
                                            onClick={() => setSelectedProject(project)}
                                            className='w-full h-40 rounded-2xl overflow-hidden shadow-lg bg-white/90 dark:bg-gray-800/90 p-2 cursor-pointer hover:scale-105 transition-transform duration-300'
                                        >
                                            <img
                                                src={project.image}
                                                className='w-full h-full object-cover rounded-xl'
                                                alt={project.title}
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3 className='text-lg font-bold text-gray-800 dark:text-white leading-tight'>
                                            {project.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='col-span-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mt-10'
                            >
                                <p className='text-lg'>No projects found in this category yet.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

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
        </div >
    )
}

export default OurProjects
