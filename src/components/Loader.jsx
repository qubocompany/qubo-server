import React from 'react'
import { motion } from 'motion/react'
import assets from '../assets/assets'
import { PropagateLoader } from 'react-spinners'


const Loader = ({ theme }) => {
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


        </div>

        {/* Propagate Loader */}
        <div className="mt-4">
          <PropagateLoader color="var(--color-primary)" size={15} />
        </div>
      </div>
    </motion.div>
  )
}

export default Loader
