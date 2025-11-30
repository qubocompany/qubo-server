import React from 'react'
import Title from './Title'
import assets from '../assets/assets'
import { motion } from 'motion/react'

const OurWork = () => {

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
        {
            title: 'Fork&Knife',
            description: 'A cutting-edge solution that transforms how businesses interact with their customers digitally.',
            image: assets.work_fork_knife,
            url: 'https://forkandknife-1.vercel.app/'
        },
        {
            title: 'Ride Infinity',
            description: 'Innovative platform designed to streamline operations and enhance user experience.',
            image: assets.work_ride_infinity,
            url: 'https://ride-infinity.vercel.app/'
        },
        {
            title: 'Agrozy Foods',
            description: 'Revolutionary app that bridges the gap between technology and everyday life.',
            image: assets.work_agrozy,
            url: 'https://agrozy-foods.vercel.app/'
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

        .shimmer-box {
          position: relative;
          overflow: hidden;
        }

        .shimmer-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 3s infinite;
          pointer-events: none;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .shimmer-box::before {
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

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
                    {
                        workData.map((work, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                key={index}
                                className='relative group overflow-hidden rounded-xl cursor-pointer shimmer-box'>
                                {/* Project Image */}
                                <img src={work.image} className='w-full h-28 object-cover' alt={work.title} />

                                {/* Project Title - Always Visible */}
                                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3'>
                                    <h3 className='text-white text-sm font-semibold'>{work.title}</h3>
                                </div>

                                {/* Hover Overlay with Description and Button */}
                                <div className='absolute inset-0 bg-gradient-to-br from-[#5044E5]/95 to-[#4d8cea]/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-white'>
                                    <h3 className='text-base font-bold mb-2'>{work.title}</h3>
                                    <p className='text-xs text-center mb-3 leading-relaxed line-clamp-3'>{work.description}</p>
                                    <a
                                        href={work.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='px-4 py-2 bg-white text-[#5044E5] rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200 shadow-lg'
                                    >
                                        View Live Project
                                    </a>
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
                    className='mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                    See More
                </motion.button>

            </motion.div>
        </>
    )
}

export default OurWork
