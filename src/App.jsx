import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Membership from './pages/Membership'
import Services from './pages/Services'
import Franchise from './pages/Franchise'
import Explore from './pages/Explore'
import Contact from './pages/Contact'

import WhatsAppWidget from './components/WhatsAppWidget'
import PhoneCallWidget from './components/PhoneCallWidget'

/* ===== Scroll Progress Bar ===== */
function ScrollProgress() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

/* ===== Deep Space Background (animated orbs + noise) ===== */
function DeepSpaceBackground() {
    return (
        <div className="deep-space-bg">
            <div className="orb-pink" />
            <div className="orb-navy" />
        </div>
    )
}

/* ===== Mouse-Follower Spotlight ===== */
function MouseSpotlight() {
    const spotRef = useRef(null)
    useEffect(() => {
        if ('ontouchstart' in window && navigator.maxTouchPoints > 0) return
        const handleMouseMove = (e) => {
            if (spotRef.current) {
                spotRef.current.style.left = `${e.clientX}px`
                spotRef.current.style.top = `${e.clientY}px`
            }
        }
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])
    return <div ref={spotRef} className="mouse-spotlight" />
}

/* ===== Global SVG Gradient Defs (for duotone icons) ===== */
function GradientDefs() {
    return (
        <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#000080" />
                    <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
            </defs>
        </svg>
    )
}

function App() {
    const location = useLocation()

    /* ===== Lenis Smooth Scroll (all devices) ===== */
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 1.5,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => lenis.destroy()
    }, [])

    return (
        <div className="min-h-screen text-[#E0E0E0] font-body relative" style={{ background: '#050508' }}>
            {/* Global layers */}
            <DeepSpaceBackground />
            <div className="noise-overlay" />
            <MouseSpotlight />
            <GradientDefs />
            <CustomCursor />
            <ScrollProgress />

            {/* Content (above background layers) */}
            <div className="relative z-10">
                <Navbar />
                <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/membership" element={<Membership />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/franchise" element={<Franchise />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/gallery" element={<Navigate to="/explore" replace />} />
                        <Route path="/virtual-tour" element={<Navigate to="/explore" replace />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </AnimatePresence>
                <WhatsAppWidget />
                <PhoneCallWidget />
                <Footer />
            </div>
        </div>
    )
}

export default App
