import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneCall } from 'lucide-react'

export default function PhoneCallWidget() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {scrolled && (
                <motion.div
                    initial={{ opacity: 0, y: 30, rotate: 20 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: 30, rotate: -20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="fixed bottom-[170px] right-6 sm:bottom-[110px] sm:right-8 z-50 pointer-events-auto"
                >
                    <a
                        href="tel:+918888161216"
                        className="group relative flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_-4px_10px_rgba(0,0,0,0.9),inset_0_4px_8px_rgba(255,255,255,0.2)]"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #222 40%, #111 100%)',
                            border: '3px solid #1a1a1a',
                        }}
                        aria-label="Call Now"
                    >
                        {/* Outer Plate Lip (The ridge) */}
                        <div className="absolute inset-1 rounded-full border border-white/10 shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)]" />

                        {/* Inner Grip Ring */}
                        <div className="absolute inset-3 rounded-full border-2 border-[#111] shadow-[0_2px_4px_rgba(255,255,255,0.1),inset_0_3px_6px_rgba(0,0,0,0.9)] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />

                        {/* Weight Label (Top curved text - simulated with position) */}
                        <div className="absolute top-[4px] tracking-widest text-[7px] sm:text-[8px] font-black text-white/40 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] font-heading">ELITE</div>
                        {/* Weight Label (Bottom curved text) */}
                        <div className="absolute bottom-[4px] tracking-widest text-[7px] sm:text-[8px] font-black text-white/40 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] font-heading">15KG</div>

                        {/* Center Hub (where the bar goes) */}
                        <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black shadow-[inset_0_3px_5px_rgba(0,0,0,1),0_1px_2px_rgba(255,255,255,0.2)] group-hover:bg-[#050505] transition-colors overflow-hidden">
                            {/* The Phone Icon shining out from the center hole */}
                            <PhoneCall size={16} className="text-[#06b6d4] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] z-10 sm:scale-110" fill="currentColor" strokeWidth={1} />

                            {/* Inner hub glow */}
                            <div className="absolute inset-0 bg-[#06b6d4]/20 rounded-full blur-[4px] animate-pulse" />
                        </div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
