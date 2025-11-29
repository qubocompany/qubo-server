import React from 'react'
import assets from '../assets/assets'
import { motion } from "motion/react"

const Hero = () => {
  return (
    <div id='hero' className='flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-gray-700 dark:text-white'>

        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay:0.7 }}
        viewport={{ once: true }}
        className='inline-flex items-center gap-2 border border-gray-300 p-1.5 pr-4 rounded-full'>
            <img className='w-20' src={assets.group_profile} alt="" />
            <p className='text-xs font-medium'>Join our community</p>
        </motion.div>

        <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className='text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl'>Turning imagination into <span className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] bg-clip-text text-transparent'>digital</span> impact.</motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        className='text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg pb-3'>Creating meaningful connections and turning big ideas into interactive digital experiences.</motion.p>

        <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        viewport={{ once: true }}
        
        className='relative'>
            <img src={assets.hero_img} alt="" className='w-full max-w-6xl'/>
            <img src={assets.bgImage1} alt="" className='absolute -top-40 -right-40 sm:-top-100 sm:-right-70 -z-1 dark:hidden'/>
        </motion.div>
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/918838362439" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="currentColor" 
          viewBox="0 0 16 16" 
          className="w-6 h-6"
        >
          <path d="M13.601 2.399A7.963 7.963 0 0 0 8 0C3.582 0 0 3.582 0 8c0 1.396.365 2.707 1.057 3.889L0 16l4.111-1.057A7.963 7.963 0 0 0 8 16c4.418 0 8-3.582 8-8 0-2.121-.827-4.112-2.399-5.601zM8 14.5c-1.234 0-2.406-.361-3.429-1.043l-.243-.154-2.429.623.623-2.429-.154-.243A6.472 6.472 0 0 1 1.5 8c0-3.584 2.916-6.5 6.5-6.5 1.734 0 3.364.676 4.601 1.899A6.472 6.472 0 0 1 14.5 8c0 3.584-2.916 6.5-6.5 6.5zm3.601-4.899c-.191-.096-1.131-.555-1.307-.619-.175-.064-.302-.096-.43.096-.127.191-.491.619-.602.746-.111.127-.222.143-.414.048-.191-.096-.808-.298-1.538-.949-.568-.506-.953-1.133-1.065-1.324-.111-.191-.012-.294.084-.39.086-.086.191-.222.286-.334.095-.111.127-.191.191-.318.064-.127.032-.239-.016-.334-.048-.096-.43-1.035-.588-1.414-.143-.334-.287-.287-.43-.287h-.366c-.127 0-.334.048-.51.239-.175.191-.667.651-.667 1.587s.683 1.841.778 1.969c.095.127 1.341 2.048 3.247 2.871.454.196.807.313 1.083.401.455.143.868.123 1.195.074.364-.054 1.131-.462 1.292-.91.159-.447.159-.83.111-.91-.048-.079-.175-.127-.366-.222z"/>
        </svg>
      </a>
    </div>
  )
}

export default Hero
