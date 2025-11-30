import React from 'react'
import { motion } from 'motion/react'
import assets from '../assets/assets'

const Loader = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'
    >
      <style>
        {`
          .loader-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .loader {
            position: absolute;
            transform: rotateZ(45deg);
            perspective: 1000px;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            color: #5044E5;
          }
          .loader:before,
          .loader:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: inherit;
            height: inherit;
            border-radius: 50%;
            transform: rotateX(70deg);
            animation: 1s spin linear infinite;
          }
          .loader:after {
            color: #4d8cea;
            transform: rotateY(70deg);
            animation-delay: .4s;
          }

          @keyframes spin {
            0%,
            100% {
              box-shadow: .4em 0px 0 0px currentcolor;
            }
            12% {
              box-shadow: .4em .4em 0 0 currentcolor;
            }
            25% {
              box-shadow: 0 .4em 0 0px currentcolor;
            }
            37% {
              box-shadow: -.4em .4em 0 0 currentcolor;
            }
            50% {
              box-shadow: -.4em 0 0 0 currentcolor;
            }
            62% {
              box-shadow: -.4em -.4em 0 0 currentcolor;
            }
            75% {
              box-shadow: 0px -.4em 0 0 currentcolor;
            }
            87% {
              box-shadow: .4em -.4em 0 0 currentcolor;
            }
          }
        `}
      </style>
      <div className='loader-container'>
        {/* 3D Spinner Behind/Around Logo */}
        <div className="loader"></div>

        {/* Logo in Center */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={assets.loader_logo}
          alt="Logo"
          className='h-12 sm:h-14 w-auto relative z-10'
        />
      </div>
    </motion.div>
  )
}

export default Loader
