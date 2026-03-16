import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Building2 } from 'lucide-react'

// Use Is Touch Hook
function useIsTouch() {
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])
    return touch
}

const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'FACILITIES', path: '/services' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'MEMBERSHIP', path: '/membership' },
    { name: 'EXPLORE', path: '/explore', badge: '360°' },
    { name: 'FRANCHISE BUSINESS', path: '/franchise', badge: 'BIZ' },
    { name: 'CONTACT', path: '/contact' },
]

/* ===== Magnetic Button Hook ===== */
function useMagnetic(strength = 0.3) {
    const ref = useRef(null)
    const isTouch = useIsTouch()

    const handleMouseMove = useCallback((e) => {
        if (!ref.current || window.innerWidth < 768 || isTouch) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }, [strength, isTouch])

    const handleMouseLeave = useCallback(() => {
        if (ref.current) ref.current.style.transform = 'translate(0, 0)'
    }, [])

    return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const joinNowMagnetic = useMagnetic(0.2)
    const franchiseMagnetic = useMagnetic(0.2)
    const isTouch = useIsTouch()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => { setIsOpen(false) }, [location])

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
                {/* Frosted Glass container with neon bottom border */}
                <div
                    className={`pointer-events-auto max-w-screen-2xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 relative ${scrolled ? 'shadow-[0_20px_40px_rgba(0,0,0,0.4)]' : ''}`}
                    style={{
                        background: scrolled ? 'rgba(5, 5, 12, 0.88)' : 'rgba(5, 5, 12, 0.6)',
                        backdropFilter: 'blur(30px) saturate(1.3)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        borderBottom: 'none',
                    }}
                >
                    {/* Neon bottom border glow (0.5px Pink→Violet) */}
                    <div
                        className="absolute bottom-0 left-4 right-4 h-[1px]"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #EC4899, #8B5CF6, transparent)',
                            boxShadow: '0 1px 8px rgba(236, 72, 153, 0.4), 0 1px 20px rgba(139, 92, 246, 0.2)',
                        }}
                    />

                    {/* Logo */}
                    <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 sm:gap-3 group z-[60]">
                        <img src="/asset/Logo.png" alt="Elite Fitness Clubb" className="h-8 sm:h-10 w-auto transition-all duration-300 group-hover:scale-105" style={{ filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.3))' }} />
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 leading-tight">
                            <span className="text-[10px] sm:text-sm font-heading font-black text-[#E0E0E0] tracking-widest whitespace-nowrap">ELITE FITNESS </span>
                            <span className="text-[10px] sm:text-sm font-heading font-black tracking-widest whitespace-nowrap" style={{ color: '#EC4899' }}>CLUBB</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-xs font-semibold tracking-[0.1em] transition-all duration-300 flex items-center gap-1.5 ${location.pathname === link.path ? 'text-[#E0E0E0]' : 'text-gray-500 hover:text-[#E0E0E0]'}`}
                            >
                                {link.name}
                                {/* Electric Pink "BIZ" Badge for Franchise */}
                                {link.badge && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest text-[#EC4899] bg-[#EC4899]/10 border border-[#EC4899]/30 shadow-[0_0_10px_rgba(236,72,153,0.3)] animate-pulse">
                                        {link.badge}
                                    </span>
                                )}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                                        style={{
                                            background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
                                            boxShadow: '0 0 8px rgba(139,92,246,0.5)',
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* DUAL CTAs (Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Secondary CTA: Investor Focus (Navy to Purple gap) */}
                        <div ref={franchiseMagnetic.ref} onMouseMove={franchiseMagnetic.onMouseMove} onMouseLeave={franchiseMagnetic.onMouseLeave} className="magnetic-btn">
                            <Link
                                to="/franchise"
                                className="relative px-5 py-2.5 rounded-[12px] font-bold text-[11px] tracking-widest inline-flex items-center gap-1.5 text-[#E0E0E0] border border-[#000080]/50 bg-gradient-to-r from-[#000080]/10 to-elite-purple/10 hover:from-[#000080]/30 hover:to-elite-purple/30 transition-all shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] group"
                            >
                                <Building2 size={12} className="group-hover:scale-110 transition-transform text-[#8B5CF6]" />
                                OWN A FRANCHISE
                            </Link>
                        </div>

                        {/* Primary CTA: Athlete Focus (Pink Liquid Swirl) */}
                        <div ref={joinNowMagnetic.ref} onMouseMove={joinNowMagnetic.onMouseMove} onMouseLeave={joinNowMagnetic.onMouseLeave} className="magnetic-btn">
                            <Link
                                to="/membership"
                                className="btn-liquid relative px-6 py-2.5 rounded-[14px] font-bold text-[11px] tracking-widest inline-flex items-center gap-1.5 text-[#E0E0E0] shadow-[0_0_20px_rgba(236,72,153,0.2)]"
                            >
                                <div className="absolute inset-0 rounded-[14px] bg-gradient-to-r from-elite-purple to-elite-pink" />
                                <div className="absolute inset-[1px] rounded-[13px] bg-[#0a0a14] transition-opacity duration-300" />
                                <span className="relative z-10 flex items-center gap-1.5 group-hover:text-white transition-colors">
                                    <Sparkles size={12} className="text-[#EC4899]" /> JOIN NOW
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-[#E0E0E0] hover:bg-white/5 rounded-lg transition-colors">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu (Full Screen Immersive) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center p-4"
                        >
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                            {/* Animated Orbs inside menu */}
                            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-elite-purple rounded-full blur-[100px]" />
                            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-elite-pink rounded-full blur-[100px]" />

                            <div className="relative z-10 w-full max-w-sm rounded-[32px] overflow-hidden p-6 border border-white/10" style={{ background: 'rgba(5,5,15,0.7)', backdropFilter: 'blur(40px)' }}>
                                <div className="flex flex-col items-center justify-center gap-3 mb-8">
                                    <img src="/asset/Logo.png" alt="Elite Fitness Clubb" className="h-16" style={{ filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.5))' }} />
                                    <div className="text-center">
                                        <span className="text-sm font-heading font-black text-[#E0E0E0] tracking-widest block">ELITE FITNESS</span>
                                        <span className="text-sm font-heading font-black text-[#EC4899] tracking-widest block mt-0.5">CLUBB</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {navLinks.map((link, i) => (
                                        <motion.div key={link.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center justify-between px-6 py-4 rounded-2xl text-base font-bold tracking-widest transition-all ${location.pathname === link.path ? 'bg-gradient-to-r from-elite-purple/20 to-transparent text-[#E0E0E0] border border-elite-purple/30' : 'text-gray-400 hover:bg-white/5 hover:text-[#E0E0E0]'}`}
                                            >
                                                {link.name}
                                                {link.badge && <span className="px-2 py-1 rounded-md text-[10px] text-[#EC4899] bg-[#EC4899]/10 border border-[#EC4899]/30">{link.badge}</span>}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* STICKY BOTTOM CTA BAR (Mobile Only) */}
            {isTouch && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 pointer-events-none md:hidden"
                >
                    <div className="pointer-events-auto flex items-stretch gap-2 w-full h-14 rounded-2xl p-1.5 border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(30px) saturate(1.5)' }}>
                        <Link to="/franchise" className="flex-1 rounded-xl flex items-center justify-center gap-2 font-bold text-[11px] tracking-widest text-elite-purple bg-elite-purple/10 border border-elite-purple/20 hover:bg-elite-purple/20 transition-colors">
                            <Building2 size={14} /> OWN A BIZ
                        </Link>
                        <Link to="/membership" className="flex-[1.5] rounded-xl flex items-center justify-center gap-2 font-bold text-[12px] tracking-widest text-[#E0E0E0] bg-gradient-to-r from-elite-purple to-elite-pink shadow-[0_0_15px_rgba(236,72,153,0.3)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors" />
                            <Sparkles size={14} /> JOIN CLUB
                        </Link>
                    </div>
                </motion.div>
            )}
        </>
    )
}
