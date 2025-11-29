import React from 'react'
import Title from './Title'
import assets from '../assets/assets'
import {motion} from 'motion/react'

const OurWork = () => {

    const workData = [
        {
            title: 'FarmPick',
            description: 'An elegantly designed e-commerce platform that inspires people to embrace and enjoy natural foods. !',
            image: assets.work_mobile_app,
            url: 'http://farmpickshope.vercel.app/'
        },
        {
            title: 'FiberFlow',
            description: 'We created a revolution among the ISP providers and people that made the connectivity a short bridge.',
            image: assets.work_dashboard_management,
            url: 'https://fiberflow-react.vercel.app/'
        },
        {
            title: 'Dots nd Decimals',
            description: 'We improvise the unique structure of the IT Infrastructes that made this company a partner for us.',
            image: assets.work_fitness_app,
            url: 'https://dot-decimals-1.onrender.com/'
        },
    ]

  return (
    <motion.div 
        initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    id='our-work' className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
      <Title title='Our latest work' desc='From strategy to execution, we craft digital solutions that move your business forward.'/>

    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl'>
        {
            workData.map((work, index)=>(
                <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                key={index} className='hover:scale-102 duration-500 transition-all cursor-pointer'>
                    <a href={work.url} target="_blank" rel="noopener noreferrer">
                        <img src={work.image} className='w-full h-64 object-cover rounded-xl' alt="" />
                    </a>
                    <h3 className='mt-3 mb-2 text-lg font-semibold'>{work.title}</h3>
                    <p className='text-sm opacity-60 w-5/6'>{work.description}</p>
                </motion.div>
            ))
        }
    </div>

    {/* See More Button */}
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
      className='mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
    >
      See More
    </motion.button>

    </motion.div>
  )
}

export default OurWork
