import React from 'react'
import { motion } from 'motion/react'
import assets from '../assets/assets'

const Loader = ({theme}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'
    >
      <div className='flex flex-col items-center gap-8'>
        {/* Logo and Text Container */}
        <div className='flex items-center gap-1 overflow-hidden'>
          {/* Loader Logo */}
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={assets.loader_logo} 
            alt="Logo" 
            className='h-10 sm:h-12 w-auto' 
          />
          
          {/* Text coming from right */}
          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-2xl sm:text-3xl font-medium text-gray-700 dark:text-white leading-none'
          >
          technologies
          </motion.p>
        </div>
        
        {/* Spinner below */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin'
        ></motion.div>
      </div>
    </motion.div>
  )
}

export default Loader
