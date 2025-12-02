import React from 'react'
import assets from '../assets/assets'
import { motion } from "motion/react"

const Hero = () => {
  return (
    <div id='hero' className='flex flex-col items-center gap-8 pt-32 pb-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white'>

      <motion.a
        href="https://www.linkedin.com/in/the-qubo-company-66701a393"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className='inline-flex items-center gap-2 border border-gray-300 p-1.5 pr-4 rounded-full mb-4 cursor-pointer hover:scale-105 transition-transform'>
        <img className='w-20' src={assets.group_profile} alt="" />
        <p className='text-xs font-medium'>Join our community</p>
      </motion.a>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl mb-6'>
        Turning imagination into{' '}
        <span
          className='bg-clip-text text-transparent bg-[linear-gradient(to_right,#5044E5,#4d8cea,#8A84FF,#4d8cea,#5044E5)] bg-[length:400%_auto] animate-shimmer'
        >
          digital
        </span>{' '}
        impact.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className='text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg mb-8'>Creating meaningful connections and turning big ideas into interactive digital experiences.</motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}

        className='relative mt-4'>
        <img src={assets.hero_img} alt="" className='w-full max-w-6xl relative z-10' />
        <img src={assets.bgImage1} alt="" className='absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-1 dark:hidden pointer-events-none' />
      </motion.div>

      {/* WhatsApp Floating Button */}

    </div>
  )
}

export default Hero
