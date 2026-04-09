import PageWrapper from '../components/PageWrapper'
import useSEO from '../hooks/useSEO'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, Orbit, ZoomIn, ChevronLeft, ChevronRight, PlayCircle, ArrowLeft } from 'lucide-react'


/* =======================================
   DATA: GALLERY
   ======================================= */
const categories = ['ALL', 'GYM FLOOR', 'EQUIPMENT', 'RECOVERY', 'AMBIANCE']

const galleryImages = [
    { id: 1, src: '/asset/new/20260404_130238.webp', category: 'GYM FLOOR', span: 'col-span-2 row-span-2' },
    { id: 2, src: '/asset/new/20260404_130257 (1).webp', category: 'AMBIANCE', span: 'col-span-1 row-span-1' },
    { id: 3, src: '/asset/new/20260404_130314.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-1' },
    { id: 4, src: '/asset/new/20260404_130338.webp', category: 'GYM FLOOR', span: 'col-span-2 row-span-1' },
    { id: 5, src: '/asset/new/20260404_130412.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-2' },
    { id: 6, src: '/asset/new/20260404_130426 .webp', category: 'AMBIANCE', span: 'col-span-1 row-span-1' },
    { id: 7, src: '/asset/new/20260404_130434 .webp', category: 'RECOVERY', span: 'col-span-2 row-span-2' },
    { id: 8, src: '/asset/new/20260404_130446.webp', category: 'GYM FLOOR', span: 'col-span-1 row-span-1' },
    { id: 9, src: '/asset/new/20260404_130852.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-1' },
    { id: 10, src: '/asset/new/20260404_130859.webp', category: 'AMBIANCE', span: 'col-span-2 row-span-1' },
    { id: 11, src: '/asset/new/20260404_130917.webp', category: 'GYM FLOOR', span: 'col-span-1 row-span-2' },
    { id: 12, src: '/asset/new/20260404_130932.webp', category: 'RECOVERY', span: 'col-span-1 row-span-1' },
    { id: 13, src: '/asset/new/20260404_130940.webp', category: 'AMBIANCE', span: 'col-span-2 row-span-2' },
    { id: 14, src: '/asset/new/20260404_131006.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-1' },
    { id: 15, src: '/asset/new/20260404_131034.webp', category: 'GYM FLOOR', span: 'col-span-1 row-span-1' },
]

/* =======================================
   CINEMATIC PORTAL (INTRO)
   ======================================= */
function CinematicPortal({ onEnter360, onEnterGallery }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex items-center justify-center bg-black overflow-hidden"
            style={{ minHeight: 'calc(100vh - 80px)' }}
        >
            <img
                src="/asset/new/20260404_130238.webp"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                style={{ animation: 'slowZoom 25s ease-in-out infinite alternate' }}
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
                    <div className="w-16 h-16 rounded-full border border-elite-orange/30 flex items-center justify-center bg-elite-orange/10 mb-[-10px]" style={{ boxShadow: '0 0 30px rgba(233,111,73,0.3)' }}>
                        <Orbit size={32} className="text-purple-400 animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-widest text-[#E0E0E0] uppercase text-shadow-glow text-center">
                            <span className="gradient-text">EXPLORE</span><br />THE ELITE
                        </h1>
                        <p className="text-gray-400 font-light tracking-widest uppercase text-xs sm:text-sm mt-2">Interactive 360° & Photo Hub</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-8 w-full max-w-4xl mx-auto">
                        {/* Gallery Card */}
                        <button
                            onClick={onEnterGallery}
                            className="group relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-white/10 hover:border-elite-orange/50 transition-all duration-500 focus:outline-none flex flex-col justify-end p-6 text-left"
                            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                        >
                            <img src="/asset/12.webp" alt="Gallery" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-elite-orange/40 to-transparent transition-opacity duration-500 mix-blend-overlay" />

                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-500">
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
                            className="group relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-elite-orange/40 hover:border-elite-orange transition-all duration-500 focus:outline-none flex flex-col justify-end p-6 text-left"
                            style={{ boxShadow: '0 0 40px rgba(233,111,73,0.2)' }}
                        >
                            <img src="/asset/3-1.webp" alt="360 Tour" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-elite-orange/40 to-transparent transition-opacity duration-500 mix-blend-overlay" />

                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-500">
                                    <PlayCircle size={20} />
                                </div>
                                <h3 className="text-2xl font-heading font-black tracking-widest text-white uppercase group-hover:text-shadow-glow">
                                    Virtual 360°<br />Tour
                                </h3>
                                <p className="text-gray-400 text-xs tracking-widest font-light mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Experience the 6,000 sq.ft facility
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
   MODE A: 360 VIRTUAL TOUR (KUULA EMBED)
   ======================================= */
function VirtualTourMode({ onSwitchToGallery, initialLoadComplete, setInitialLoadComplete }) {
    const [isLoading, setIsLoading] = useState(false)
    const [tourStarted, setTourStarted] = useState(false)
    const iframeRef = useRef(null)

    const handleStartTour = () => {
        setTourStarted(true);
        setIsLoading(true);
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
        setInitialLoadComplete(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden flex items-center justify-center"
        >
            {/* Ambient Background Glow (Static, no animation for performance) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-elite-orange/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-elite-orange/10 rounded-full blur-[100px]" />
            </div>

            {/* Noise texture overlay */}
            <div className="absolute inset-0 noise-overlay opacity-[0.03] mix-blend-overlay pointer-events-none" />



            {/* Main Tour Container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-8 flex flex-col items-center h-full">

                {/* Tour Title Bar */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex items-center gap-3 mb-4 sm:mb-6"
                >
                    <div className="w-10 h-10 rounded-full bg-elite-orange/20 border border-elite-orange/30 flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(233,111,73,0.3)' }}>
                        <Orbit size={20} className="text-elite-orange" />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-2xl font-heading font-black tracking-widest text-white uppercase">
                            <span className="gradient-text">360°</span> VIRTUAL TOUR
                        </h2>
                        <p className="text-[10px] sm:text-xs text-gray-500 tracking-widest font-light uppercase">Drag to explore • Pinch to zoom • Click hotspots</p>
                    </div>
                </motion.div>

                {/* Kuula Iframe Wrapper */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full flex-1 min-h-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10"
                    style={{
                        boxShadow: '0 0 80px rgba(233,111,73,0.15), 0 0 40px rgba(233,111,73,0.1), 0 20px 60px rgba(0,0,0,0.8)',
                    }}
                >
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-elite-orange/40 rounded-tl-2xl sm:rounded-tl-3xl pointer-events-none z-20" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-elite-orange/40 rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none z-20" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-elite-orange/40 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none z-20" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-elite-orange/40 rounded-br-2xl sm:rounded-br-3xl pointer-events-none z-20" />

                    {tourStarted ? (
                        <iframe
                            ref={iframeRef}
                            onLoad={handleIframeLoad}
                            className="ku-embed w-full h-full relative z-10"
                            frameBorder="0"
                            allow="xr-spatial-tracking; gyroscope; accelerometer"
                            allowFullScreen
                            scrolling="no"
                            src="https://kuula.co/share/collection/7MFMk?logo=1&info=1&fs=1&vr=0&zoom=1&sd=1&thumbs=1"
                            style={{ border: 'none', display: 'block', minHeight: '400px' }}
                        />
                    ) : (
                        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-black relative group">
                            <img 
                                src="/asset/Sitting area wall.webp" 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700" 
                                alt="360 Tour Preview"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#05050c] via-black/40 to-[#05050c]" />
                            <button 
                                onClick={handleStartTour}
                                className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-elite-orange/20 border border-elite-orange flex items-center justify-center btn-glow hover:bg-elite-orange hover:border-elite-orange group-hover:scale-105 transition-all duration-300"
                            >
                                <PlayCircle size={40} className="text-white sm:w-12 sm:h-12" />
                            </button>
                            <span className="relative z-10 mt-6 text-white font-heading font-black tracking-widest text-lg sm:text-xl uppercase text-shadow-glow">
                                ENTER 360° TOUR
                            </span>
                            <span className="relative z-10 mt-2 text-elite-orange text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                                Click to load interactive experience
                            </span>
                        </div>
                    )}

                    {/* Scanning Facility Loader Overlay */}
                    <AnimatePresence>
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-none"
                            >
                                {/* Pulsing ring animation */}
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 rounded-full border-2 border-elite-orange/30 animate-ping" />
                                    <div className="absolute inset-2 rounded-full border border-elite-orange/40 animate-ping" style={{ animationDelay: '0.3s' }} />
                                    <div className="absolute inset-4 rounded-full border border-elite-orange/50 animate-ping" style={{ animationDelay: '0.6s' }} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Orbit size={32} className="text-elite-orange animate-spin" style={{ animationDuration: '3s' }} />
                                    </div>
                                </div>
                                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        className="h-full bg-gradient-to-r from-elite-orange to-amber-400"
                                        style={{ boxShadow: '0 0 15px #e96f49' }}
                                    />
                                </div>
                                <span className="text-elite-orange font-bold tracking-[0.3em] text-[10px] uppercase animate-pulse">
                                    Loading Virtual Tour...
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Bridge to Gallery */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-4 sm:mt-6 flex items-center gap-4"
                >
                    <button
                        onClick={() => onSwitchToGallery('ALL')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-elite-orange/30 bg-elite-orange/10 backdrop-blur-md text-elite-orange hover:bg-elite-orange/20 hover:border-elite-orange/50 transition-all duration-300 group"
                    >
                        <ZoomIn size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">📸 Browse Photo Gallery</span>
                    </button>
                </motion.div>
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
    
    // Swipe state for mobile
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

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

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEndHandler = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            handleNextImage();
        } else if (isRightSwipe) {
            handlePrevImage();
        }
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
            className="relative w-full min-h-screen z-[90]"
        >
            <div className="pt-44 sm:pt-40 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-elite-orange to-amber-400 text-white shadow-[0_0_20px_rgba(233,111,73,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
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
                                        <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-purple-400 uppercase border border-purple-500/30 bg-purple-500/10 px-2 py-1 rounded-md backdrop-blur-md">ENLARGE</span>
                                    </div>
                                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-elite-orange/50 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                        <button onClick={() => setSelectedImage(null)} className="absolute top-24 right-4 sm:top-28 sm:right-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-elite-orange hover:border-elite-orange transition-all z-[110] shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
                            <X size={24} className="group-hover:rotate-90 transition-transform" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-6xl w-full h-[50vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(233,111,73,0.3)] mt-12 sm:mt-0 flex items-center justify-center group/lightbox touch-pan-y"
                            onClick={e => e.stopPropagation()}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEndHandler}
                        >
                            <img src={selectedImage.src} alt={selectedImage.category} className="max-w-full max-h-full object-contain pointer-events-none select-none" draggable="false" />

                            {/* Navigation Arrows */}
                            <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/lightbox:opacity-100 hover:bg-elite-orange hover:border-elite-orange transition-all z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <ChevronLeft size={24} className="mr-0.5" />
                            </button>
                            <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/lightbox:opacity-100 hover:bg-elite-orange hover:border-elite-orange transition-all z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <ChevronRight size={24} className="ml-0.5" />
                            </button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                {selectedImage.category}
                            </div>
                        </motion.div>

                        {/* Thumbnail Swipe Strip */}
                        <div className="w-full max-w-6xl mt-4 overflow-x-auto scrollbar-hide relative z-50 py-2 pointer-events-auto" onClick={e => e.stopPropagation()}>
                            <div className="flex gap-2 justify-start sm:justify-center px-4 w-max sm:w-auto mx-auto">
                                {filteredImages.map((img) => (
                                    <button
                                        key={img.id}
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                                        className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer pointer-events-auto ${selectedImage.id === img.id ? 'ring-2 ring-elite-orange scale-110 opacity-100 shadow-[0_0_15px_rgba(233,111,73,0.5)]' : 'opacity-40 hover:opacity-80 border border-white/10'}`}
                                    >
                                        <img src={img.src} alt={img.category} className="w-full h-full object-cover pointer-events-none select-none" draggable="false" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        </div>
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
    useSEO({
        title: 'Explore Our Gym',
        description: 'Take a 360° virtual tour or browse the gallery of The Elite Fitness Clubb. See our lifting studio, recovery suite, and premium ambiance.',
        path: '/explore'
    })
    const [hasEntered, setHasEntered] = useState(false)
    const [mode, setMode] = useState('360') // '360' or 'gallery'

    const [initialCategory, setInitialCategory] = useState('ALL')
    const [tourInitialLoadComplete, setTourInitialLoadComplete] = useState(false)


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
                <div className="relative w-full min-h-screen bg-black z-[90]">

                    {/* Top Controls Bar */}
                    <div className="fixed top-16 left-0 right-0 w-full p-4 sm:p-6 flex flex-wrap justify-between items-start gap-2 sm:gap-4 z-[110] pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-10">
                        
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
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${mode === '360' ? 'bg-elite-orange text-white shadow-[0_0_15px_rgba(233,111,73,0.5)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <PlayCircle size={14} /> 360° TOUR
                            </button>
                            <button
                                onClick={() => setMode('gallery')}
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${mode === 'gallery' ? 'bg-elite-orange text-white shadow-[0_0_15px_rgba(233,111,73,0.5)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <ZoomIn size={14} /> GALLERY
                            </button>
                        </div>

                        {/* Spacer for layout balance */}
                        <div className="pointer-events-auto sm:order-3 shrink-0 flex justify-end min-w-[100px]" />
                    </div>

                    {/* Mode Content Wrapper */}
                    <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                            {mode === '360' ? (
                                <div className="fixed inset-0 w-full h-full">
                                    <VirtualTourMode
                                        key="360"
                                        onSwitchToGallery={(category) => {
                                            setInitialCategory(category)
                                            setMode('gallery')
                                        }}
                                        initialLoadComplete={tourInitialLoadComplete}
                                        setInitialLoadComplete={setTourInitialLoadComplete}
                                    />
                                </div>
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
