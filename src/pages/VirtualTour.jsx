import PageWrapper from '../components/PageWrapper'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Dumbbell, Zap, Heart, Waves, Coffee, Info, X, MapPin, Orbit } from 'lucide-react'

// Custom hook to detect touch devices
function useIsTouch() {
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])
    return touch
}

const tourZones = [
    {
        id: 'main',
        title: 'MAIN TRAINING FLOOR',
        desc: 'Our expansive 5000 sq ft main floor with premium strength training equipment, free weights, and neon-lit ambiance.',
        image: '/asset/Pillar 1.jpeg',
        icon: Dumbbell,
        hotspots: [
            { top: '50%', left: '30%', title: 'Hammer Strength Racks', desc: 'Industrial-grade equipment with high-durability and low maintenance costs.' },
            { top: '65%', left: '70%', title: 'Custom Plate Loaded', desc: 'Ergonomic machines maximizing member retention.' },
        ],
        mapDot: { top: '30%', left: '40%' }
    },
    {
        id: 'strength',
        title: 'STRENGTH ZONE',
        desc: 'Dedicated heavy lifting area with Olympic platforms, deadlift stations, and specialized equipment.',
        image: '/asset/Pillar 2.jpeg',
        icon: Zap,
        hotspots: [
            { top: '55%', left: '40%', title: 'Olympic Platforms', desc: 'Custom branded Elite shock-absorbing platforms.' },
        ],
        mapDot: { top: '50%', left: '30%' }
    },
    {
        id: 'cardio',
        title: 'CARDIO SECTION',
        desc: 'State-of-the-art smart treadmills, ellipticals, rowing machines, and assault bikes.',
        image: '/asset/Pillar 3.jpeg',
        icon: Heart,
        hotspots: [
            { top: '60%', left: '25%', title: 'Smart Treadmills', desc: 'Connected cardio fleet for high member engagement.' },
        ],
        mapDot: { top: '30%', left: '60%' }
    },
    {
        id: 'recovery',
        title: 'ICE BATH RECOVERY',
        desc: 'Premium recovery area with ice bath therapy for inflammation and muscle recovery.',
        image: '/asset/ice bath area.jpeg',
        icon: Waves,
        hotspots: [
            { top: '70%', left: '50%', title: 'Cryotherapy Tubs', desc: 'High-margin premium add-on service for members.' },
        ],
        mapDot: { top: '70%', left: '70%' }
    },
    {
        id: 'yoga',
        title: 'YOGA & MEDITATION',
        desc: 'Serene studio with wooden flooring, mirrors, and ambient lighting for mindful practice.',
        image: '/asset/Yoga 1.jpeg',
        icon: Heart,
        hotspots: [],
        mapDot: { top: '75%', left: '40%' }
    },
    {
        id: 'cafe',
        title: 'LOUNGE & CAFE',
        desc: 'Relax at our in-gym cafe with protein shakes, smoothies, and healthy snacks.',
        image: '/asset/Cafe wall image 1.jpeg',
        icon: Coffee,
        hotspots: [
            { top: '50%', left: '60%', title: 'Nutrition Bar', desc: 'Secondary revenue stream generating high daily ROI.' },
        ],
        mapDot: { top: '80%', left: '20%' }
    }
]

/* =======================================
   CINEMATIC PORTAL (INTRO)
   ======================================= */
function CinematicPortal({ onEnter }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
            {/* Simulated 3D Fly-through video loop via massive pan/zoom on image */}
            <motion.img
                animate={{ scale: [1, 1.2], x: [0, -50] }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                src="/asset/Sitting area wall.jpeg"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            {/* Cinematic 3% TV Static Overlay */}
            <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

            {/* Content Core */}
            <div className="relative z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="w-16 h-16 rounded-full border border-elite-pink/30 flex items-center justify-center bg-elite-pink/10 mb-[-10px] animate-pulse-glow" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.3)' }}>
                        <Orbit size={32} className="text-elite-pink animate-spin-slow" />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-widest text-[#E0E0E0] uppercase text-shadow-glow">
                        COMMAND <span className="gradient-text">CENTER</span>
                    </h1>
                    <p className="text-gray-400 font-light tracking-widest uppercase text-sm -mt-4">Interactive 360° Digital Twin</p>

                    <button
                        onClick={onEnter}
                        className="mt-8 btn-liquid relative px-10 py-5 rounded-full font-bold text-sm tracking-widest text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] group overflow-hidden border border-elite-purple/50 focus:outline-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-elite-purple to-elite-pink opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 flex items-center gap-3">ENTER THE ELITE</span>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    )
}

/* =======================================
   TACTICAL MINI-MAP
   ======================================= */
function TacticalMiniMap({ activeZone }) {
    const dotPos = activeZone.mapDot
    return (
        <div className="absolute bottom-8 left-8 z-30 w-48 h-48 sm:w-64 sm:h-64 rounded-2xl p-4 pointer-events-none border border-white/10" style={{ background: 'rgba(5,5,15,0.6)', backdropFilter: 'blur(30px) saturate(1.2)' }}>
            <div className="text-[10px] font-bold tracking-widest text-elite-purple mb-2 uppercase">Tactical Map</div>
            <div className="relative w-full h-full bg-elite-purple/5 rounded-xl border border-elite-purple/20 overflow-hidden flex items-center justify-center">
                {/* Abstract Floor Plan SVG */}
                <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] opacity-50">
                    <rect x="10" y="10" width="80" height="80" fill="none" stroke="#8B5CF6" strokeWidth="1" rx="4" opacity="0.4" />
                    <rect x="15" y="15" width="40" height="35" fill="none" stroke="#8B5CF6" strokeWidth="0.5" rx="2" />
                    <rect x="60" y="15" width="25" height="45" fill="none" stroke="#EC4899" strokeWidth="0.5" rx="2" />
                    <rect x="15" y="55" width="40" height="30" fill="none" stroke="#8B5CF6" strokeWidth="0.5" rx="2" />
                    <path d="M 60 65 L 85 65 L 85 85 L 60 85 Z" fill="none" stroke="#8B5CF6" strokeWidth="0.5" />
                </svg>

                {/* Pulsing Locator Dot */}
                <motion.div
                    className="absolute w-3 h-3 bg-elite-pink rounded-full shadow-[0_0_15px_#EC4899]"
                    initial={false}
                    animate={{ top: dotPos.top, left: dotPos.left }}
                    transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                >
                    <div className="absolute inset-0 w-full h-full rounded-full bg-elite-pink animate-ping opacity-75" />
                </motion.div>
            </div>
        </div>
    )
}

/* =======================================
   ZONE SIDEBAR
   ======================================= */
function ZoneSidebar({ zones, activeIndex, setActiveIndex }) {
    return (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
            {zones.map((zone, i) => (
                <div key={zone.id} className="relative group flex items-center justify-end">
                    {/* Tooltip on hover */}
                    <div className="absolute right-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 backdrop-blur-md whitespace-nowrap">
                        <span className="text-[10px] font-bold tracking-widest text-[#E0E0E0] uppercase">{zone.title}</span>
                    </div>

                    <button
                        onClick={() => setActiveIndex(i)}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border backdrop-blur-md ${i === activeIndex
                            ? 'bg-gradient-to-r from-elite-purple/30 to-elite-pink/30 border-elite-pink/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                            : 'bg-black/40 border-white/10 hover:border-elite-purple/40 hover:bg-white/5'
                            }`}
                    >
                        {/* Always use neon icon draw for active item */}
                        <div className={i === activeIndex ? "icon-draw gradient-icon flex items-center justify-center" : "flex items-center justify-center"}>
                            <zone.icon size={20} className={i === activeIndex ? "text-transparent" : "text-gray-400"} />
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
}

/* =======================================
   ELITE DETAIL HOTSPOTS
   ======================================= */
function Hotspot({ data }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="absolute z-20" style={{ top: data.top, left: data.left }}>
            <button
                onClick={() => setOpen(!open)}
                className="relative w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-elite-pink flex items-center justify-center bg-black/50 backdrop-blur-md text-elite-pink hover:scale-110 hover:bg-elite-pink/20 transition-all font-bold group"
                style={{ boxShadow: '0 0 15px rgba(236,72,153,0.4)' }}
            >
                {open ? <X size={14} /> : '+'}
                <div className="absolute inset-0 rounded-full border border-elite-pink animate-ping opacity-40 pointer-events-none" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-10 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(30px) saturate(1.5)' }}
                    >
                        <div className="flex gap-3 mb-2">
                            <Info size={16} className="text-elite-purple shrink-0 mt-0.5" />
                            <h4 className="text-sm font-bold tracking-widest uppercase text-[#E0E0E0] leading-tight">{data.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400 font-light pl-7">{data.desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* =======================================
   MAIN COMMAND CENTER
   ======================================= */
export default function VirtualTour() {
    const [entered, setEntered] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [neonMode, setNeonMode] = useState(false)
    const activeZone = tourZones[activeIndex]
    const isTouch = useIsTouch()

    // Gyroscope / Mouse Panning state
    const pannerRef = useRef(null)
    const [panX, setPanX] = useState(0)

    // Handle Gyroscope for Mobile Panning
    useEffect(() => {
        if (!entered || !isTouch || !window.DeviceOrientationEvent) return
        const handleOrientation = (e) => {
            // gamma is left-to-right tilt in degrees (-90 to 90)
            const gamma = e.gamma || 0
            // Map gamma tilt to a pan offset
            // When tilted right (positive gamma), pan image left (negative X).
            const panAmount = Math.max(-100, Math.min(100, gamma * 2)) // clamp -100 to 100
            setPanX(-panAmount)
        }
        window.addEventListener('deviceorientation', handleOrientation)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
    }, [entered, isTouch])

    return (
        <PageWrapper>
            <AnimatePresence>
                {!entered && <CinematicPortal onEnter={() => setEntered(true)} />}
            </AnimatePresence>

            {/* COMMAND CENTER UI (Only visible after entry) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="fixed inset-0 bg-black z-40 overflow-hidden" // Absolute fixed, takes over screen
            >
                {/* Header: Logo & Neon Mode Toggle */}
                <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
                    <div className="px-5 py-2.5 rounded-xl border border-white/10 pointer-events-auto" style={{ background: 'rgba(5,5,15,0.6)', backdropFilter: 'blur(20px)' }}>
                        <span className="text-sm font-black tracking-widest text-[#E0E0E0] uppercase"><span className="text-elite-pink">ELITE</span> COMMAND CENTER</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/10 pointer-events-auto" style={{ background: 'rgba(5,5,15,0.6)', backdropFilter: 'blur(20px)' }}>
                        <span className={`text-[10px] font-bold tracking-widest ${neonMode ? 'text-elite-pink' : 'text-gray-500'}`}>ELITE MODE</span>
                        <button
                            onClick={() => setNeonMode(!neonMode)}
                            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${neonMode ? 'bg-elite-purple border border-elite-pink' : 'bg-gray-800 border border-gray-600'}`}
                        >
                            <motion.div
                                className="w-4 h-4 rounded-full bg-white absolute top-1"
                                animate={{ left: neonMode ? '24px' : '6px' }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                style={{ boxShadow: neonMode ? '0 0 10px rgba(255,255,255,0.8)' : 'none' }}
                            />
                        </button>
                    </div>
                </div>

                {/* THE 360 PANNER VIEWER */}
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
                            ref={pannerRef}
                        >
                            {/* Draggable Ultra-Wide Image Container */}
                            <motion.div
                                drag={!isTouch ? "x" : false} // Touch devices use gyro or framer drag handles it if we want, but gyro is separate
                                dragConstraints={pannerRef}
                                dragElastic={0.1}
                                animate={isTouch ? { x: panX } : {}}
                                transition={isTouch ? { type: 'spring', damping: 20, stiffness: 100 } : undefined}
                                className="absolute top-0 bottom-0 min-w-[150vw] sm:min-w-[120vw] flex items-center justify-center origin-center"
                                style={{
                                    // Elite Neon filter applier
                                    filter: neonMode ? 'saturate(1.5) contrast(1.1) hue-rotate(-20deg) brightness(0.9)' : 'none',
                                    transition: 'filter 0.5s ease'
                                }}
                            >
                                <img
                                    src={activeZone.image}
                                    alt={activeZone.title}
                                    className="w-full h-full object-cover pointer-events-none"
                                />

                                {/* Render Hotspots relative to the panning image */}
                                {activeZone.hotspots.map((h, i) => (
                                    <Hotspot key={i} data={h} />
                                ))}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Vignette Overlay for depth */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />
                </div>

                {/* Bottom Center: Zone Info */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <motion.div
                        key={activeIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center px-8 py-4 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        style={{ background: 'rgba(5,5,15,0.7)', backdropFilter: 'blur(30px) saturate(1.2)' }}
                    >
                        <h2 className="text-xl sm:text-2xl font-heading font-black tracking-widest text-white uppercase">{activeZone.title}</h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light tracking-wide max-w-sm hidden sm:block">{activeZone.desc}</p>
                    </motion.div>
                </div>

                <TacticalMiniMap activeZone={activeZone} />
                <ZoneSidebar zones={tourZones} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

            </motion.div>
        </PageWrapper>
    )
}
