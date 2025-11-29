import React from 'react'
import assets from '../assets/assets'
import {motion} from 'motion/react'

const Footer = ({theme}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className='bg-slate-50 dark:bg-gray-900 pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40'>
      {/* footer top */}
      <div className='flex justify-between lg:items-center max-lg:flex-col gap-10'>

        <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className='space-y-5 text-sm text-gray-700 dark:text-gray-400'>
            <img src={theme === 'dark' ? assets.logo_dark : assets.logo} className='w-32 sm:w-44' alt="" />
            <p className='max-w-md'>From strategy to execution, we craft digital solutions that move your business forward.</p>

            <ul className='flex gap-8'>
                <li><a className='hover:text-primary' href="#hero">Home</a></li>
                <li><a className='hover:text-primary' href="#products">Products</a></li>
                <li><a className='hover:text-primary' href="#services">Services</a></li>
                <li><a className='hover:text-primary' href="#our-work">Our Work</a></li>
                <li><a className='hover:text-primary' href="#contact-us">Contact Us</a></li>
            </ul>
        </motion.div>
        <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className='text-gray-600 dark:text-gray-400'>
            <h3 className='font-semibold'>Our Location</h3>
            <div className='mt-4 w-full h-40 rounded overflow-hidden border border-gray-300 dark:border-gray-500'>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.567123456789!2d76.95583231480001!3d11.016844392134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859f0f0f0f0f0%3A0x0!2sR.S%20Puram%2C%20Coimbatore!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy">
                </iframe>
            </div>
        </motion.div>
      </div>
      <hr className='border-gray-300 dark:border-gray-600  my-6'/>

      {/* footer bottom */}
      <motion.div 
      initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    viewport={{ once: true }}
      className='pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap'>
        <p>Copyright 2025 © Qubo.in - All Right Reserved.</p>
        <div className='flex items-center justify-between gap-4'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Footer
