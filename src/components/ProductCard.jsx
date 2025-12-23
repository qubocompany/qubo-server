import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import toast from 'react-hot-toast'

const ProductCard = ({ product, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const divRef = useRef(null)

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top })
  }

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${product.name}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className='relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-100 dark:shadow-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-lg bg-white/30 dark:bg-gray-800/30'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={divRef}
      onMouseMove={handleMouseMove}
    >
      
      {/* Gradient Effect */}
      <div
        className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-[#5044E5] to-[#4d8cea] w-[200px] h-[200px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${
          visible ? 'opacity-50' : 'opacity-0'
        }`}
        style={{ top: position.y - 100, left: position.x - 100 }}
      />

      <div className='relative z-10 p-4 flex flex-col h-full'>
        
        {/* Product Image */}
        <div className='relative h-48 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-contain p-4'
          />
          {product.inStock ? (
            <span className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full'>
              In Stock
            </span>
          ) : (
            <span className='absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <p className='text-xs text-gray-500 dark:text-gray-400 mb-1'>{product.category}</p>
          <h3 className='font-bold text-sm mb-2 line-clamp-2'>{product.name}</h3>
          <p className='text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2'>
            {product.description}
          </p>
        </div>

        {/* Price and Actions */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-2xl font-bold text-primary'>₹{product.price.toLocaleString()}</p>
              {product.originalPrice && (
                <p className='text-xs text-gray-400 line-through'>₹{product.originalPrice.toLocaleString()}</p>
              )}
            </div>
            {product.discount && (
              <span className='bg-red-500 text-white text-xs px-2 py-1 rounded'>
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className='flex gap-2'>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className='flex-1 py-2 px-3 text-xs font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md bg-white/20 dark:bg-gray-800/20'
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className='flex-1 py-2 px-3 text-xs font-medium bg-gradient-to-r from-[#5044E5] to-[#4d8cea] text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
