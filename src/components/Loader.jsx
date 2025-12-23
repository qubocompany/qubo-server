import React from 'react'
import { motion } from 'motion/react'
import './AlpheriLoader.css'

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ backgroundColor: '#F9FAFA' }}
    >
      <div className='alpheri-loader-container'>
        {/* The word container with the orbiting dot */}
        <div className='alpheri-word-wrapper'>
          {/* Main text */}
          <span className='alpheri-letter alpheri-purple'>A</span>
          <span className='alpheri-letter'>l</span>
          <span className='alpheri-letter'>p</span>
          <span className='alpheri-letter'>h</span>
          <span className='alpheri-letter'>e</span>
          <span className='alpheri-letter'>r</span>
          <span className='alpheri-letter'>y</span>
          <span className='alpheri-letter'>&nbsp;</span>
          <span className='alpheri-letter alpheri-purple'>A</span>
          <span className='alpheri-letter alpheri-i-container'>
            <span className='alpheri-i-stem'>ı</span>
            <span className='alpheri-dot-placeholder'></span>
            {/* The orbiting dot - Moved inside i-container for precise starting position */}
            <div className='alpheri-orbiting-dot'></div>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default Loader
