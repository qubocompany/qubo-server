import React from 'react'
import assets from '../assets/assets'
import { motion } from 'motion/react'

const Footer = ({ theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='bg-slate-50 dark:bg-gray-900 py-6 px-4 sm:px-10 lg:px-24 xl:px-40 mt-10 sm:mt-20'>

      {/* Main Footer Content */}
      <div className='max-w-6xl mx-auto'>

        {/* Top Section - Logo, Description, Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className='flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-8 mb-6'>

          {/* Logo & Description - Full Width */}
          <div className='space-y-4 md:max-w-md'>
            <img src={theme === 'dark' ? assets.logo_dark : assets.logo} className='w-32 sm:w-40' alt="Qubo Logo" />
            <p className='text-sm text-gray-700 dark:text-gray-400'>
              From strategy to execution, we craft digital solutions that move your business forward.
            </p>
          </div>

          {/* Quick Links & Docs - 2 Column Grid on All Screens */}
          <div className='grid grid-cols-2 gap-6 w-full md:w-auto'>
            {/* Navigation Links */}
            <div className='pr-6 border-r border-gray-300 dark:border-gray-600'>
              <h3 className='font-semibold text-gray-800 dark:text-gray-200 mb-4'>Quick Links</h3>
              <ul className='space-y-2 text-sm text-gray-700 dark:text-gray-400'>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#hero">Home</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#products">Products</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#services">Services</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#our-work">Our Work</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#contact-us">Contact Us</a></li>
              </ul>
            </div>

            {/* Docs Links */}
            <div className='pl-6'>
              <h3 className='font-semibold text-gray-800 dark:text-gray-200 mb-4'>Support</h3>
              <ul className='space-y-2 text-sm text-gray-700 dark:text-gray-400'>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#terms">Terms and Conditions</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#faqs">FAQs</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#legal">Legal Formalities</a></li>
                <li><a className='hover:text-[#5044E5] transition-colors' href="#attestations">Attestations</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <hr className='border-gray-300 dark:border-gray-600 my-4' />

        {/* Bottom Section - Copyright & Social Media */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className='flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>

          <p>© 2025 The Qubo.company - All Rights Reserved.</p>

          {/* Social Media Icons */}
          <div className='flex items-center gap-4'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='hover:opacity-70 transition-opacity'>
              <img src={assets.facebook_icon} alt="Facebook" className='w-5 h-5' />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='hover:opacity-70 transition-opacity'>
              <img src={assets.twitter_icon} alt="Twitter" className='w-5 h-5' />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='hover:opacity-70 transition-opacity'>
              <img src={assets.instagram_icon} alt="Instagram" className='w-5 h-5' />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='hover:opacity-70 transition-opacity'>
              <img src={assets.linkedin_icon} alt="LinkedIn" className='w-5 h-5' />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Footer
