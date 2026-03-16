import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppWidget() {
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
                    initial={{ opacity: 0, y: 30, rotate: -20 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: 30, rotate: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto"
                >
                    <a
                        href="https://wa.me/918888161216?text=Hi%20Elite!%20I%20would%20like%20to%20know%20more%20about%20starting%20my%20transformation."
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_-4px_10px_rgba(0,0,0,0.9),inset_0_4px_8px_rgba(255,255,255,0.2)]"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #222 40%, #111 100%)',
                            border: '3px solid #1a1a1a',
                        }}
                        aria-label="Chat on WhatsApp"
                    >
                        {/* Outer Plate Lip (The ridge) */}
                        <div className="absolute inset-1 rounded-full border border-white/10 shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)]" />

                        {/* Inner Grip Ring */}
                        <div className="absolute inset-3 rounded-full border-2 border-[#111] shadow-[0_2px_4px_rgba(255,255,255,0.1),inset_0_3px_6px_rgba(0,0,0,0.9)] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />

                        {/* Weight Label (Top curved text - simulated with position) */}
                        <div className="absolute top-[6px] tracking-widest text-[8px] sm:text-[9px] font-black text-white/40 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] font-heading">ELITE</div>
                        {/* Weight Label (Bottom curved text) */}
                        <div className="absolute bottom-[6px] tracking-widest text-[8px] sm:text-[9px] font-black text-white/40 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] font-heading">20KG</div>

                        {/* Center Hub (where the bar goes) */}
                        <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black shadow-[inset_0_3px_5px_rgba(0,0,0,1),0_1px_2px_rgba(255,255,255,0.2)] group-hover:bg-[#050505] transition-colors overflow-hidden">
                            {/* The WhatsApp Icon shining out from the center hole */}
                            <MessageCircle size={18} className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] z-10 sm:scale-110" fill="currentColor" strokeWidth={1} />

                            {/* Inner hub glow */}
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[4px] animate-pulse" />
                        </div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
