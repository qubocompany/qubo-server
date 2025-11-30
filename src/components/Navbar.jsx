import React, { useState } from 'react'
import assets from '../assets/assets'
import ThemeToggleBtn from './ThemeToggleBtn'
import { motion } from "motion/react"

const Navbar = ({ theme, setTheme, setShowProducts, setShowContact }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false) // State for popup visibility

  const handleNavigation = (section) => {
    setSidebarOpen(false)
    if (section === 'products') {
      setShowProducts(true)
      setShowContact(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (section === 'contact-us') {
      setShowContact(true)
      setShowProducts(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setShowProducts(false)
      setShowContact(false)
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        } else if (section === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 fixed top-0 left-0 right-0 z-20 backdrop-blur-xl font-medium bg-white/50 dark:bg-gray-900/70'>

        <img
          src={theme === 'dark' ? assets.logo_dark || 'https://via.placeholder.com/150' : assets.logo}
          className='w-32 sm:w-40'
          alt='Logo'
        />

        <div className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden' : 'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}>

          <img src={assets.close_icon} alt="" className='w-5 absolute right-4 top-4 sm:hidden' onClick={() => setSidebarOpen(false)} />

          <a onClick={() => handleNavigation('hero')} href="#" className='sm:hover:border-b'>Home</a>
          <a onClick={() => handleNavigation('products')} className='sm:hover:border-b cursor-pointer'>Products</a>
          <a onClick={() => handleNavigation('services')} className='sm:hover:border-b cursor-pointer'>Services</a>
          <a onClick={() => handleNavigation('our-work')} className='sm:hover:border-b cursor-pointer'>Tool Space</a>
          <a onClick={() => handleNavigation('contact-us')} className='sm:hover:border-b cursor-pointer'>Contact us</a>
        </div>

        <div className='flex items-center gap-2 sm:gap-4'>

          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <img src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon} alt="" onClick={() => setSidebarOpen(true)} className='w-8 sm:hidden' />

          <button
            onClick={() => setPopupOpen(true)}
            className='text-sm max-sm:hidden flex items-center gap-2 bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all'>
            Connect <img src={assets.arrow_icon} width={14} alt="" />
          </button>
        </div>
      </motion.div>

      {/* Popup Container */}
      {popupOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center z-30 bg-black/40 backdrop-blur-md'
          onClick={() => setPopupOpen(false)} // Close popup when clicking outside
        >
          <div
            className='bg-white/70 dark:bg-gray-900/70 p-10 rounded-lg shadow-lg w-96 sm:w-[550px] flex flex-col gap-8'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className='absolute top-4 right-4 text-gray-700 dark:text-white'
              onClick={() => setPopupOpen(false)}
            >
              ✖
            </button>
            <div className='grid grid-cols-2 gap-6'>
              <button className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-8 rounded-lg text-center'>Call Us</button>
              <button className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-8 rounded-lg text-center'>Connect with WhatsApp</button>
              <button className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-8 rounded-lg text-center'>Check with Instagram</button>
              <button className='bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-8 rounded-lg text-center'>Quote Us</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
