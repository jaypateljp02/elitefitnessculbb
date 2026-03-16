import PageWrapper from '../components/PageWrapper'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Dumbbell, Zap, Heart, Waves, Coffee, Info, X, Orbit, ZoomIn, ChevronLeft, ChevronRight, PlayCircle, MapPin, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Custom hook to detect touch devices
function useIsTouch() {
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])
    return touch
}

/* =======================================
   DATA: VIRTUAL TOUR ZONES
   ======================================= */
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
   DATA: GALLERY
   ======================================= */
const categories = ['ALL', '🔥 TRANSFORMATIONS', '💪 ELITE COACHING', '🧘 THE VIBE']

const galleryImages = [
    { id: 1, src: '/asset/barbell-on-the-floor-in-gym-M46QLA3-2048x1367.jpg', category: '💪 ELITE COACHING', span: 'col-span-2 row-span-2' },
    { id: 2, src: '/asset/sportsman-make-sport-exercises-in-gym-PE2NXZL-2048x1367.jpg', category: '🔥 TRANSFORMATIONS', span: 'col-span-1 row-span-2' },
    { id: 3, src: '/asset/Pillar 1.jpeg', category: '🔥 TRANSFORMATIONS', span: 'col-span-1 row-span-1' },
    { id: 4, src: '/asset/Pillar 2.jpeg', category: '💪 ELITE COACHING', span: 'col-span-2 row-span-1' },
    { id: 5, src: '/asset/Yoga 1.jpeg', category: '🧘 THE VIBE', span: 'col-span-1 row-span-2' },
    { id: 6, src: '/asset/ice bath area.jpeg', category: '🧘 THE VIBE', span: 'col-span-1 row-span-1' },
    { id: 7, src: '/asset/Zumba.jpeg', category: '🧘 THE VIBE', span: 'col-span-2 row-span-2' },
    { id: 8, src: '/asset/Cafe wall image 1.jpeg', category: '🧘 THE VIBE', span: 'col-span-1 row-span-1' },
    { id: 9, src: '/asset/Female  Changing Room.jpeg', category: '🧘 THE VIBE', span: 'col-span-1 row-span-1' },
    { id: 10, src: '/asset/Mens  Changing Room.jpeg', category: '🧘 THE VIBE', span: 'col-span-2 row-span-1' },
]

/* =======================================
   CINEMATIC PORTAL (INTRO)
   ======================================= */
function CinematicPortal({ onEnter360, onEnterGallery }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center justify-center bg-black overflow-hidden"
            style={{ minHeight: 'calc(100vh - 80px)' }}
        >
            <motion.img
                animate={{ scale: [1, 1.2], x: [0, -50] }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                src="/asset/Sitting area wall.jpeg"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />

            <div className="relative z-10 text-center flex flex-col items-center max-w-2xl px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="w-16 h-16 rounded-full border border-elite-pink/30 flex items-center justify-center bg-elite-pink/10 mb-[-10px] animate-pulse-glow" style={{ boxShadow: '0 0 30px rgba(236,72,153,0.3)' }}>
                        <Orbit size={32} className="text-elite-pink animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-widest text-[#E0E0E0] uppercase text-shadow-glow">
                            <span className="gradient-text">EXPLORE</span> THE ELITE
                        </h1>
                        <p className="text-gray-400 font-light tracking-widest uppercase text-xs sm:text-sm mt-2">Interactive 360° & Photo Hub</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-8 w-full max-w-4xl mx-auto">
                        {/* Gallery Card */}
                        <button
                            onClick={onEnterGallery}
                            className="group relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-elite-pink/50 transition-all duration-500 focus:outline-none flex flex-col justify-end p-6 text-left"
                            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                        >
                            <img src="/asset/12.png" alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-elite-pink/40 to-transparent transition-opacity duration-500 mix-blend-overlay" />

                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-12 rounded-full bg-elite-pink/20 backdrop-blur-md border border-elite-pink/30 flex items-center justify-center mb-4 text-elite-pink group-hover:bg-elite-pink group-hover:text-white transition-colors duration-500">
                                    <ZoomIn size={20} />
                                </div>
                                <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase group-hover:text-shadow-glow">
                                    Immersive<br />Gallery
                                </h3>
                                <p className="text-gray-400 text-xs tracking-widest font-light mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Browse Transformations & Coaching
                                </p>
                            </div>
                        </button>

                        {/* 360 Tour Card */}
                        <button
                            onClick={onEnter360}
                            className="group relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-elite-purple/40 hover:border-elite-purple transition-all duration-500 focus:outline-none flex flex-col justify-end p-6 text-left"
                            style={{ boxShadow: '0 0 40px rgba(139,92,246,0.2)' }}
                        >
                            <img src="/asset/3-1.png" alt="360 Tour" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-elite-purple/40 to-transparent transition-opacity duration-500 mix-blend-overlay" />

                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-12 rounded-full bg-elite-purple/20 backdrop-blur-md border border-elite-purple/30 flex items-center justify-center mb-4 text-elite-purple group-hover:bg-elite-purple group-hover:text-white transition-colors duration-500 animate-pulse">
                                    <PlayCircle size={20} />
                                </div>
                                <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase group-hover:text-shadow-glow">
                                    Virtual 360°<br />Tour
                                </h3>
                                <p className="text-gray-400 text-xs tracking-widest font-light mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Experience the 15,000 sq.ft facility
                                </p>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

/* =======================================
   MODE A: 360 COMMAND CENTER
   ======================================= */
function TacticalMiniMap({ activeZone }) {
    const dotPos = activeZone.mapDot
    return (
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-30 w-40 h-40 sm:w-64 sm:h-64 rounded-2xl p-4 pointer-events-none border border-white/10" style={{ background: 'rgba(5,5,15,0.6)', backdropFilter: 'blur(30px) saturate(1.2)' }}>
            <div className="text-[10px] font-bold tracking-widest text-elite-purple mb-2 uppercase">Tactical Map</div>
            <div className="relative w-full h-full bg-elite-purple/5 rounded-xl border border-elite-purple/20 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] opacity-50">
                    <rect x="10" y="10" width="80" height="80" fill="none" stroke="#8B5CF6" strokeWidth="1" rx="4" opacity="0.4" />
                    <rect x="15" y="15" width="40" height="35" fill="none" stroke="#8B5CF6" strokeWidth="0.5" rx="2" />
                    <rect x="60" y="15" width="25" height="45" fill="none" stroke="#EC4899" strokeWidth="0.5" rx="2" />
                    <rect x="15" y="55" width="40" height="30" fill="none" stroke="#8B5CF6" strokeWidth="0.5" rx="2" />
                </svg>
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

function VirtualTourMode({ neonMode, onSwitchToGallery, initialLoadComplete, setInitialLoadComplete }) {
    const [activeIndex, setActiveIndex] = useState(1) // Default to Strength Zone (Most impressive)
    const [isLoading, setIsLoading] = useState(!initialLoadComplete)
    const activeZone = tourZones[activeIndex]
    const isTouch = useIsTouch()
    const pannerRef = useRef(null)
    const [panX, setPanX] = useState(0)

    // Scanning Facility Loader - Only play once per session
    useEffect(() => {
        if (!initialLoadComplete) {
            setIsLoading(true)
            const timer = setTimeout(() => {
                setIsLoading(false)
                setInitialLoadComplete(true)
            }, 1200)
            return () => clearTimeout(timer)
        } else {
            setIsLoading(false)
        }
    }, [initialLoadComplete, setInitialLoadComplete])

    useEffect(() => {
        if (!isTouch || !window.DeviceOrientationEvent) return
        const handleOrientation = (e) => setPanX(Math.max(-100, Math.min(100, (e.gamma || 0) * 2)))
        window.addEventListener('deviceorientation', handleOrientation)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
    }, [isTouch])

    // Map zones to gallery categories for the Bridge Button
    const getGalleryCategoryForZone = (zoneId) => {
        switch (zoneId) {
            case 'strength':
            case 'main':
                return '💪 ELITE COACHING';
            case 'cardio':
                return '🔥 TRANSFORMATIONS';
            default:
                return '🧘 THE VIBE';
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
                    ref={pannerRef}
                >
                    <motion.div
                        drag={!isTouch ? "x" : false}
                        dragConstraints={pannerRef}
                        dragElastic={0.1}
                        animate={isTouch ? { x: panX } : {}}
                        transition={isTouch ? { type: 'spring', damping: 20, stiffness: 100 } : undefined}
                        className="absolute top-0 bottom-0 min-w-[150vw] sm:min-w-[120vw] flex items-center justify-center origin-center"
                        style={{ filter: neonMode ? 'saturate(1.5) contrast(1.1) hue-rotate(-20deg) brightness(0.9)' : 'none', transition: 'filter 0.5s ease' }}
                    >
                        <img src={activeZone.image} alt={activeZone.title} className="w-full h-full object-cover pointer-events-none" />
                        {!isLoading && activeZone.hotspots.map((h, i) => <Hotspot key={i} data={h} />)}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Scanning Facility Loader Overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-40 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="h-full bg-elite-pink"
                                style={{ boxShadow: '0 0 15px #EC4899' }}
                            />
                        </div>
                        <span className="text-elite-pink font-bold tracking-[0.2em] text-[10px] uppercase animate-pulse">
                            Scanning Facility...
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Live Counter (Fake Data for FOMO) */}
            <div className="absolute top-24 sm:top-28 left-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider">🟢 14 MEMBERS TRAINING</span>
            </div>

            {/* Bottom Info & 360 Bridge to Gallery */}
            <div className="absolute bottom-32 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
                <motion.div
                    key={activeIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center px-6 sm:px-8 py-4 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] pointer-events-auto"
                    style={{ background: 'rgba(5,5,15,0.7)', backdropFilter: 'blur(30px) saturate(1.2)' }}
                >
                    <h2 className="text-lg sm:text-2xl font-heading font-black tracking-widest text-white uppercase">{activeZone.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light tracking-wide max-w-sm hidden sm:block mb-3">{activeZone.desc}</p>
                    <button
                        onClick={() => onSwitchToGallery(getGalleryCategoryForZone(activeZone.id))}
                        className="text-[10px] font-bold tracking-widest text-elite-pink hover:text-white transition-colors border-b border-elite-pink/30 pb-0.5"
                    >
                        📸 VIEW {activeZone.title.split(' ')[0]} PHOTOS
                    </button>
                </motion.div>
            </div>

            <TacticalMiniMap activeZone={activeZone} />

            {/* Zone Sidebar */}
            <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 sm:gap-3">
                {tourZones.map((zone, i) => (
                    <div key={zone.id} className="relative group flex items-center justify-end">
                        <div className="absolute right-12 sm:right-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 backdrop-blur-md whitespace-nowrap">
                            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#E0E0E0] uppercase">{zone.title}</span>
                        </div>
                        <button
                            onClick={() => setActiveIndex(i)}
                            className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border backdrop-blur-md ${i === activeIndex ? 'bg-gradient-to-r from-elite-purple/30 to-elite-pink/30 border-elite-pink/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'bg-black/40 border-white/10 hover:border-elite-purple/40 hover:bg-white/5'}`}
                        >
                            <zone.icon size={18} className={i === activeIndex ? "text-elite-pink" : "text-gray-400"} />
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

/* =======================================
   MODE B: SPOTLIGHT GALLERY
   ======================================= */
function GalleryMode({ initialCategory }) {
    const [activeCategory, setActiveCategory] = useState(initialCategory || 'ALL')
    const [selectedImage, setSelectedImage] = useState(null)
    const filteredImages = activeCategory === 'ALL' ? galleryImages : galleryImages.filter(img => img.category === activeCategory)

    const handleNextImage = (e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
    };

    const handlePrevImage = (e) => {
        if (e) e.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
    };

    // Ambient Music Audio Ref (Mock)
    useEffect(() => {
        // Here we would play the Deep House / Lo-Fi track for the gallery
        // const audio = new Audio('/asset/lofi-gym.mp3'); audio.play();
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full bg-[#050508] z-0 overflow-y-auto overscroll-contain"
        >
            <div className="pt-20 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-elite-purple to-elite-pink text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[220px]">
                        <AnimatePresence>
                            {filteredImages.map((img, i) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    key={img.id}
                                    onClick={() => setSelectedImage(img)}
                                    className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span} border border-white/10 bg-black`}
                                >
                                    {/* Unlit image that turns bright on hover (Spotlight Reveal) */}
                                    <img src={img.src} alt={img.category} className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:scale-110 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal" loading="lazy" />
                                    <div className="absolute inset-0 bg-black/50 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Center Zoom Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500 delay-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-white/50">
                                            <ZoomIn size={20} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                                        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase text-shadow-glow">{img.category}</span>
                                        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-elite-pink uppercase border border-elite-pink/30 bg-elite-pink/10 px-2 py-1 rounded-md backdrop-blur-md">ENLARGE</span>
                                    </div>
                                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-elite-purple/50 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
                    >
                        {/* Close Button - pure X */}
                        <button onClick={() => setSelectedImage(null)} className="absolute top-24 right-4 sm:top-28 sm:right-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-elite-pink hover:border-elite-pink transition-all z-[110] shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
                            <X size={24} className="group-hover:rotate-90 transition-transform" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-6xl w-full h-[60vh] sm:h-[80vh] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.3)] mt-12 sm:mt-0 flex items-center justify-center group/lightbox"
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={selectedImage.src} alt={selectedImage.category} className="max-w-full max-h-full object-contain" />

                            {/* Navigation Arrows */}
                            <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/lightbox:opacity-100 hover:bg-elite-pink hover:border-elite-pink transition-all z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <ChevronLeft size={24} className="mr-0.5" />
                            </button>
                            <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/lightbox:opacity-100 hover:bg-elite-pink hover:border-elite-pink transition-all z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <ChevronRight size={24} className="ml-0.5" />
                            </button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                {selectedImage.category}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

/* =======================================
   MAIN EXPERIENCE HUB
   ======================================= */
export default function Explore() {
    const [hasEntered, setHasEntered] = useState(false)
    const [mode, setMode] = useState('360') // '360' or 'gallery'
    const [neonMode, setNeonMode] = useState(false)
    const [initialCategory, setInitialCategory] = useState('ALL')
    const [tourInitialLoadComplete, setTourInitialLoadComplete] = useState(false)

    const navigate = useNavigate()

    const handleEnter360 = () => {
        setMode('360')
        setHasEntered(true)
    }

    const handleEnterGallery = () => {
        setMode('gallery')
        setHasEntered(true)
    }

    return (
        <PageWrapper>
            <AnimatePresence>
                {!hasEntered && <CinematicPortal onEnter360={handleEnter360} onEnterGallery={handleEnterGallery} />}
            </AnimatePresence>

            {hasEntered && (
                <div className="fixed inset-0 bg-black z-[90] overflow-hidden">

                    {/* Top Controls Bar */}
                    <div className="absolute top-0 left-0 right-0 w-full p-4 sm:p-6 flex flex-wrap justify-between items-start gap-4 z-[110] pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-10">
                        
                        {/* Back Button */}
                        <button
                            onClick={() => {
                            setHasEntered(false)
                            setMode('360') // reset mode for next entry
                        }}
                            className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-md bg-black/40 shrink-0"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-[10px] font-bold tracking-widest uppercase hidden sm:inline">BACK</span>
                        </button>

                        {/* Center Toggle (360/Gallery) */}
                        <div className="pointer-events-auto flex p-1 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md bg-black/40 mx-auto sm:mx-0 order-3 sm:order-2 w-full sm:w-auto justify-center mt-2 sm:mt-0">
                            <button
                                onClick={() => setMode('360')}
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${mode === '360' ? 'bg-elite-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <PlayCircle size={14} /> 360° TOUR
                            </button>
                            <button
                                onClick={() => setMode('gallery')}
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${mode === 'gallery' ? 'bg-elite-pink text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <ZoomIn size={14} /> GALLERY
                            </button>
                        </div>

                        {/* Optional: Elite Neon Mode Toggle (only in 360) */}
                        <div className="pointer-events-auto sm:order-3 shrink-0 flex justify-end min-w-[100px]">
                            <AnimatePresence>
                                {mode === '360' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md bg-black/40">
                                        <span className={`text-[9px] sm:text-[10px] font-bold tracking-widest ${neonMode ? 'text-elite-pink' : 'text-gray-500'} hidden sm:inline`}>ELITE</span>
                                        <button
                                            onClick={() => setNeonMode(!neonMode)}
                                            className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full relative transition-colors duration-300 ${neonMode ? 'bg-elite-purple border border-elite-pink' : 'bg-gray-800 border border-gray-600'}`}
                                        >
                                            <motion.div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white absolute top-1" animate={{ left: neonMode ? 'calc(100% - 1.25rem)' : '0.25rem' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mode Content Wrapper */}
                    <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                            {mode === '360' ? (
                                <VirtualTourMode
                                    key="360"
                                    neonMode={neonMode}
                                    onSwitchToGallery={(category) => {
                                        setInitialCategory(category)
                                        setMode('gallery')
                                    }}
                                    initialLoadComplete={tourInitialLoadComplete}
                                    setInitialLoadComplete={setTourInitialLoadComplete}
                                />
                            ) : (
                                <GalleryMode key="gallery" initialCategory={initialCategory} />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </PageWrapper>
    )
}
