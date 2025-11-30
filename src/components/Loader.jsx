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
      <div className='relative flex items-center justify-center'>
        <video
          src={assets.qubo_loader}
          autoPlay
          loop
          muted
          playsInline
          className='w-80 h-80 object-contain relative z-10'
          style={{ backgroundColor: '#F9FAFA' }}
        />
        {/* Radial gradient overlay to blend edges */}
        <div
          className='absolute inset-0 pointer-events-none z-20'
          style={{
            background: 'radial-gradient(circle, transparent 40%, #F9FAFA 80%)',
            mixBlendMode: 'normal'
          }}
        />
      </div>
    </motion.div>
  )
}

export default Loader
