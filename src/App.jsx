import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Products from './components/Products'

const App = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const [loading, setLoading] = useState(true)
  const [showProducts, setShowProducts] = useState(false)

  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  // Refs for custom cursor Position tracking
  const mouse = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1
      position.current.y += (mouse.current.y - position.current.y) * 0.1

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`
        outlineRef.current.style.transform = `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }

  }, [])

  if (loading) {
    return <Loader theme={theme} />
  }

  return (
    <div className='dark:bg-black relative overflow-x-hidden overflow-y-auto max-w-full'>
      <Toaster />
      <Navbar theme={theme} setTheme={setTheme} setShowProducts={setShowProducts} />

      {showProducts ? (
        <Products />
      ) : (
        <>
          <Hero />
          <TrustedBy />
          <Services />
          <OurWork />
          <Teams />
          <ContactUs />
        </>
      )}

      <Footer theme={theme} />

      {/* Custom Cursor Ring */}
      <div ref={outlineRef} className='hidden lg:block fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-[9999]'
        style={{ transition: 'transform 0.1s ease-out' }}></div>

      {/* Custom Cursor Dot */}
      <div ref={dotRef} className='hidden lg:block fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-[9999]'></div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918838362439"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="w-8 h-8"
        >
          <path d="M13.601 2.399A7.963 7.963 0 0 0 8 0C3.582 0 0 3.582 0 8c0 1.396.365 2.707 1.057 3.889L0 16l4.111-1.057A7.963 7.963 0 0 0 8 16c4.418 0 8-3.582 8-8 0-2.121-.827-4.112-2.399-5.601zM8 14.5c-1.234 0-2.406-.361-3.429-1.043l-.243-.154-2.429.623.623-2.429-.154-.243A6.472 6.472 0 0 1 1.5 8c0-3.584 2.916-6.5 6.5-6.5 1.734 0 3.364.676 4.601 1.899A6.472 6.472 0 0 1 14.5 8c0 3.584-2.916 6.5-6.5 6.5zm3.601-4.899c-.191-.096-1.131-.555-1.307-.619-.175-.064-.302-.096-.43.096-.127.191-.491.619-.602.746-.111.127-.222.143-.414.048-.191-.096-.808-.298-1.538-.949-.568-.506-.953-1.133-1.065-1.324-.111-.191-.012-.294.084-.39.086-.086.191-.222.286-.334.095-.111.127-.191.191-.318.064-.127.032-.239-.016-.334-.048-.096-.43-1.035-.588-1.414-.143-.334-.287-.287-.43-.287h-.366c-.127 0-.334.048-.51.239-.175.191-.667.651-.667 1.587s.683 1.841.778 1.969c.095.127 1.341 2.048 3.247 2.871.454.196.807.313 1.083.401.455.143.868.123 1.195.074.364-.054 1.131-.462 1.292-.91.159-.447.159-.83.111-.91-.048-.079-.175-.127-.366-.222z" />
        </svg>
      </a>

    </div>
  )
}

export default App
