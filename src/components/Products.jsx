import React, { useState } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { productsData } from '../assets/assets'
import { motion } from 'motion/react'
import assets from '../assets/assets'
import ProductBanner from './ProductBanner'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', 'Laptops', 'Desktops', 'Monitors', 'Keyboards', 'Mouse', 'Headphones', 'Storage', 'Graphics Cards', 'Processors']
  
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory)

  return (
    <div className='relative min-h-screen px-4 sm:px-12 lg:px-24 xl:px-40 py-20 text-gray-700 dark:text-white'>
      
      {/* Background Gradient */}
      <img src={assets.bgImage1} alt="" className='absolute -top-40 -left-40 -z-1 dark:hidden opacity-50'/>
      <img src={assets.bgImage2} alt="" className='absolute top-1/2 -right-40 -z-1 dark:hidden opacity-50'/>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className='flex flex-col items-center gap-10'
      >
        
        {/* Page Title */}
        <Title 
          title='Our Products' 
          desc='Browse our collection of premium computer hardware and peripherals'
        />

        {/* Product Banner Carousel */}
        <ProductBanner />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='flex flex-wrap justify-center gap-3 max-w-4xl'
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl'
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-20'
          >
            <p className='text-xl text-gray-500 dark:text-gray-400'>No products found in this category</p>
          </motion.div>
        )}

      </motion.div>
    </div>
  )
}

export default Products
