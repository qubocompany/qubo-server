import React from 'react'
import { motion } from 'motion/react'
import assets from '../assets/assets'

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ backgroundColor: '#F9FAFA' }}
    >
      <div className='flex items-center justify-center'>
        <video
          src={assets.qubo_loader}
          autoPlay
          loop
          muted
          playsInline
          className='w-80 h-80 object-contain'
          style={{ backgroundColor: '#F9FAFA' }}
        />
      </div>
    </motion.div>
  )
}

export default Loader
