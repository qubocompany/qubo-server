import React, { useState } from 'react'
import assets from '../assets/assets'
import ThemeToggleBtn from './ThemeToggleBtn'
import { motion, AnimatePresence } from "motion/react"

const Navbar = ({ theme, setTheme, setShowProducts, setShowContact, setShowToolSpace, setShowOurProjects, setShowQuboAI, showQuboAI }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false) // State for popup visibility
  const [activePage, setActivePage] = useState('home') // Track active page

  const handleNavigation = (section) => {
    setSidebarOpen(false)
    if (section === 'products') {
      setActivePage('products')
      setShowProducts(true)
      setShowContact(false)
      setShowToolSpace(false)
      setShowOurProjects(false)
      setShowQuboAI(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (section === 'contact-us') {
      setActivePage('contact-us')
      setShowContact(true)
      setShowProducts(false)
      setShowToolSpace(false)
      setShowOurProjects(false)
      setShowQuboAI(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (section === 'tool-space') {
      setActivePage('tool-space')
      setShowToolSpace(true)
      setShowProducts(false)
      setShowContact(false)
      setShowOurProjects(false)
      setShowQuboAI(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (section === 'qubo-ai') {
      setActivePage('qubo-ai')
      setShowQuboAI(true)
      setShowProducts(false)
      setShowContact(false)
      setShowToolSpace(false)
      setShowOurProjects(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setActivePage(section === 'hero' ? 'home' : section)
      setShowQuboAI(false)
      setShowProducts(false)
      setShowContact(false)
      setShowToolSpace(false)
      setShowOurProjects(false)
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 fixed top-0 left-0 right-0 z-20 backdrop-blur-md font-medium shadow-sm dark:shadow-none transition-colors duration-300 ${showQuboAI ? 'bg-transparent shadow-none text-white' : 'bg-white/95 dark:bg-black'}`}>

        <img
          src={theme === 'dark' ? assets.logo_dark || 'https://via.placeholder.com/150' : assets.logo}
          className='w-24 sm:w-32'
          alt='Logo'
        />

        <div className={`text-gray-700 dark:text-white sm:text-sm ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden' : 'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-8 transition-all`}>

          <img src={assets.close_icon} alt="" className='w-5 absolute right-4 top-4 sm:hidden' onClick={() => setSidebarOpen(false)} />

          <a onClick={() => handleNavigation('hero')} href="#" className={`sm:hover:border-b cursor-pointer transition-all ${activePage === 'home' ? 'border-b-2 border-primary' : ''}`}>Home</a>
          <a onClick={() => handleNavigation('services')} className={`sm:hover:border-b cursor-pointer transition-all ${activePage === 'services' ? 'border-b-2 border-primary' : ''}`}>Services</a>
          <a onClick={() => handleNavigation('products')} className={`sm:hover:border-b cursor-pointer transition-all ${activePage === 'products' ? 'border-b-2 border-primary' : ''}`}>Products</a>
          <a onClick={() => handleNavigation('tool-space')} className={`sm:hover:border-b cursor-pointer transition-all ${activePage === 'tool-space' ? 'border-b-2 border-primary' : ''}`}>Tool Space</a>
          <a onClick={() => handleNavigation('qubo-ai')} className={`sm:hover:border-b cursor-pointer transition-all ${activePage === 'alphery-ai' ? 'border-b-2 border-primary' : ''}`}>Alphery Ai</a>
          <a onClick={() => setPopupOpen(true)} className='sm:hidden cursor-pointer'>Contact us</a>
        </div>

        <div className='flex items-center gap-2 sm:gap-4'>

          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <img src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon} alt="" onClick={() => setSidebarOpen(true)} className='w-8 sm:hidden' />

          <button
            onClick={() => setPopupOpen(true)}
            className='text-sm max-sm:hidden flex items-center gap-2 bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all'>
            Contact us <img src={assets.arrow_icon} width={14} alt="" />
          </button>
        </div>
      </motion.div>

      {/* Popup Container */}
      {/* Popup Container */}
      <AnimatePresence>
        {popupOpen && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'
            onClick={() => setPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className='relative w-[340px] p-6 rounded-[2.5rem] bg-white/70 dark:bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/50 dark:border-white/20 shadow-2xl overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative flex justify-between items-center mb-6 pl-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Connect with us</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Let's discuss what you need !</p>
                </div>
                <button
                  onClick={() => setPopupOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                </button>
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+918838362439"
                  className="flex flex-col items-center justify-center py-5 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Call</span>
                </a>

                <a
                  href="https://wa.me/918838362439"
                  target="_blank"
                  className="flex flex-col items-center justify-center py-5 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">WhatsApp</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="flex flex-col items-center justify-center py-5 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-2 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Instagram</span>
                </a>

                <a
                  href="#contact-us"
                  className="flex flex-col items-center justify-center py-5 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer group"
                  onClick={() => {
                    setPopupOpen(false);
                    handleNavigation('contact-us');
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17.6A2.05 2.05 0 0 0 2.5 19c0 1.1.9 2 2 2h15a2 2 0 0 0 2-2 2.05 2.05 0 0 0-.5-1.4l-5.6-5.9c-.3-.4-.8-.6-1.4-.6h-3c-1.1 0-2 .9-2 2" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Quote</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

