import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

// Lazy-load pages for faster initial load
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Membership = lazy(() => import('./pages/Membership'))
const Services = lazy(() => import('./pages/Services'))
const Franchise = lazy(() => import('./pages/Franchise'))
const Explore = lazy(() => import('./pages/Explore'))
const Contact = lazy(() => import('./pages/Contact'))

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
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        })

        // Expose globally so immersive pages can stop/start it
        window.lenis = lenis

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            window.lenis = null
            lenis.destroy()
        }
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
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-2 border-elite-purple/30 border-t-elite-purple rounded-full animate-spin" />
                            <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">Loading...</span>
                        </div>
                    </div>
                }>
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
                </Suspense>
                <WhatsAppWidget />
                <PhoneCallWidget />
                <Footer />
            </div>
        </div>
    )
}

export default App
