import React from 'react'
import assets from '../assets/assets'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ContactUs = ({ isPage = false }) => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "--- Enter Web3Forms key ---");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Thank you for your submission!')
        event.target.reset();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id='contact-us'
      className={`flex justify-center items-center px-4 sm:px-12 lg:px-24 xl:px-40 ${isPage ? 'min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-black' : 'py-20'}`}>

      <div className='grid lg:grid-cols-2 gap-10 w-full max-w-6xl lg:bg-white lg:dark:bg-gray-900 lg:rounded-3xl lg:shadow-2xl lg:overflow-hidden'>

        {/* Left Side - Contact Info */}
        <div className='bg-gradient-to-br from-[#5044E5] to-[#4d8cea] p-10 sm:p-12 text-white flex flex-col justify-between gap-10 rounded-3xl shadow-2xl lg:shadow-none lg:rounded-none'>
          <div>
            <h3 className='text-3xl font-semibold mb-4'>Get in Touch</h3>
            <p className='text-white/80 mb-8'>We are here to help you with any questions or concerns you may have.</p>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <p className='font-medium'>Call Us</p>
                  <p className='text-white/80 text-sm'>+91 88383 62439</p>
                  <p className='text-white/80 text-sm'>+91 97913 34944</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className='font-medium'>Email</p>
                  <p className='text-white/80 text-sm'>qubo.company@gmail.com</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <p className='font-medium'>Location</p>
                  <p className='text-white/80 text-sm'>3, Bhagatsingh Road, Saibaba Colony,<br />Coimbatore, Tamil Nadu - 641025</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <img src={assets.facebook_icon} alt="" className='w-8 h-8 brightness-0 invert opacity-70 hover:opacity-100 cursor-pointer transition-all' />
            <img src={assets.twitter_icon} alt="" className='w-8 h-8 brightness-0 invert opacity-70 hover:opacity-100 cursor-pointer transition-all' />
            <img src={assets.instagram_icon} alt="" className='w-8 h-8 brightness-0 invert opacity-70 hover:opacity-100 cursor-pointer transition-all' />
            <img src={assets.linkedin_icon} alt="" className='w-8 h-8 brightness-0 invert opacity-70 hover:opacity-100 cursor-pointer transition-all' />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='p-10 sm:p-12 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl lg:shadow-none lg:rounded-none lg:bg-transparent'>
          <h3 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-white'>Have Any Question?</h3>
          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={onSubmit} className='space-y-6'>

            <div>
              <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-300'>Name</p>
              <input name="name" type="text" placeholder='Enter your name' className='w-full p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:border-[#5044E5] dark:bg-gray-800 dark:text-white transition-colors' required />
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div>
                <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-300'>Email</p>
                <input name="email" type="email" placeholder='Enter your email' className='w-full p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:border-[#5044E5] dark:bg-gray-800 dark:text-white transition-colors' required />
              </div>
              <div>
                <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-300'>Phone Number</p>
                <input name="mobile" type="tel" placeholder='Enter phone number' className='w-full p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:border-[#5044E5] dark:bg-gray-800 dark:text-white transition-colors' required />
              </div>
            </div>

            <div>
              <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-300'>What you need ?</p>
              <textarea name="message" rows={4} placeholder='Enter your message' className='w-full p-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 outline-none focus:border-[#5044E5] dark:bg-gray-800 dark:text-white transition-colors resize-none' required />
            </div>

            <button type="submit" className='w-full bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white font-medium py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300'>
              Send
            </button>
          </motion.form>
        </div>

      </div>
    </motion.div>
  )
}

export default ContactUs
