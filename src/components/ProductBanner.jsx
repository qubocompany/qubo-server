import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ProductBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const banners = [
    {
      id: 1,
      title: 'Premium Gaming Laptops',
      subtitle: 'Unleash Your Gaming Potential',
      description: 'Experience ultimate performance',
      price: '₹1,25,999',
      discount: '15% OFF',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
      bgGradient: 'from-[#1E3A8A] to-[#3B82F6]' // Updated gradient to match image theme
    },
    {
      id: 2,
      title: 'Professional Monitors',
      subtitle: '4K Ultra HD Display',
      description: 'Crystal clear visuals',
      price: '₹32,999',
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
      bgGradient: 'from-[#9333EA] to-[#F472B6]' // Updated gradient to match image theme
    },
    {
      id: 3,
      title: 'Gaming Peripherals',
      subtitle: 'RGB Mechanical Keyboards',
      description: 'Precision and style combined',
      price: '₹5,999',
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600',
      bgGradient: 'from-[#059669] to-[#10B981]' // Updated gradient to match image theme
    },
    {
      id: 4,
      title: 'High-Performance Storage',
      subtitle: 'NVMe SSD Drives',
      description: 'Lightning-fast speeds',
      price: '₹8,499',
      discount: '10% OFF',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600',
      bgGradient: 'from-[#EA580C] to-[#F59E0B]' // Updated gradient to match image theme
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000); // Increased interval to reduce frequent updates

    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className='relative w-full h-[500px] sm:h-[380px] overflow-hidden rounded-xl mb-12'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }} // Reduced initial offset for smoother transitions
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }} // Reduced exit offset for smoother transitions
          transition={{ duration: 0.4, ease: 'easeInOut' }} // Shortened duration and added easing
          className={`absolute inset-0 bg-gradient-to-r ${banners[currentIndex].bgGradient}`}
        >
          <div className='container mx-auto h-full px-6 sm:px-10 flex items-center justify-center py-8 sm:py-0'>
            <div className='flex flex-col-reverse md:grid md:grid-cols-2 gap-4 sm:gap-8 items-center w-full h-full sm:h-auto justify-center'>

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-white space-y-3 sm:space-y-4 text-center md:text-left'
              >
                {banners[currentIndex].discount && (
                  <span className='inline-block bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full'>
                    {banners[currentIndex].discount}
                  </span>
                )}
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-tight'>
                  {banners[currentIndex].title}
                </h2>
                <p className='text-lg sm:text-xl font-medium opacity-90'>
                  {banners[currentIndex].subtitle}
                </p>
                <p className='text-sm opacity-80 hidden sm:block'>
                  {banners[currentIndex].description}
                </p>
                <div className='flex items-center justify-center md:justify-start gap-4 sm:gap-6 pt-2'>
                  <span className='text-2xl sm:text-4xl font-bold'>
                    {banners[currentIndex].price}
                  </span>
                  <button className='bg-white text-gray-900 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform'>
                    Shop Now
                  </button>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='relative h-48 sm:h-full flex items-center justify-center w-full'
              >
                <img
                  src={banners[currentIndex].image}
                  alt={banners[currentIndex].title}
                  className='w-auto h-full max-h-full object-contain drop-shadow-2xl'
                />
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10'>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-200 ${index === currentIndex
              ? 'bg-white w-8'
              : 'bg-white/50 hover:bg-white/75 w-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}

    </div>
  )
}

export default ProductBanner
