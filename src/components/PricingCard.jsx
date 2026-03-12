import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Check, Sparkles } from 'lucide-react'

// Hook for touch detection
export function useIsTouch() {
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])
    return touch
}

// Animated Counter Component
export function AnimatedCounter({ value }) {
    const spring = useSpring(value, { stiffness: 400, damping: 30 })
    const [display, setDisplay] = useState(value)

    useEffect(() => {
        spring.set(value)
    }, [value, spring])

    useEffect(() => {
        return spring.on('change', (latest) => {
            setDisplay(Math.round(latest))
        })
    }, [spring])

    return <span>{display.toLocaleString('en-IN')}</span>
}

/* =======================================
   HOLOGRAPHIC TILT CARD
   ======================================= */
export default function HolographicCard({ plan, isAnnual }) {
    const isTouch = useIsTouch()
    const cardRef = useRef(null)

    // Motion values for Mouse / Gyro mapping
    const mouseX = useMotionValue(0.5) // 0 to 1
    const mouseY = useMotionValue(0.5) // 0 to 1

    // Spring physics for smooth tilt
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 })
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 })

    // Map 0-1 values to degrees for rotation (perspective)
    // 1000px perspective set on parent
    const rotateX = useTransform(smoothY, [0, 1], [15, -15])
    const rotateY = useTransform(smoothX, [0, 1], [-15, 15])

    // Map 0-1 to highlight/glare positions
    const glareX = useTransform(smoothX, [0, 1], [0, 100])
    const glareY = useTransform(smoothY, [0, 1], [0, 100])

    // Math
    const baseMonthly = plan.monthlyPrice
    const currentPrice = isAnnual ? Math.round(baseMonthly * 0.8) : baseMonthly
    const totalAnnual = Math.round(baseMonthly * 12 * 0.8)
    const exactSavings = Math.round(baseMonthly * 12 - totalAnnual)

    const handleMouseMove = (e) => {
        if (isTouch || !cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        // Map mouse position within card to 0 - 1
        const xPos = (e.clientX - rect.left) / rect.width
        const yPos = (e.clientY - rect.top) / rect.height
        mouseX.set(xPos)
        mouseY.set(yPos)
    }

    const handleMouseLeave = () => {
        if (isTouch) return
        mouseX.set(0.5)
        mouseY.set(0.5)
    }

    // Gyroscope Effect Setup
    useEffect(() => {
        if (!isTouch || !window.DeviceOrientationEvent) return
        const handleOrientation = (e) => {
            const gamma = e.gamma || 0 // Left/Right -90 to 90
            const beta = e.beta || 0   // Front/Back -180 to 180 (usually 0 to 90 held upright)

            // Normalize tilt around standard held posture
            const normalizedGamma = Math.max(-45, Math.min(45, gamma))
            const normalizedBeta = Math.max(0, Math.min(90, beta)) - 45

            // Map to 0 - 1
            mouseX.set((normalizedGamma + 45) / 90)
            mouseY.set((normalizedBeta + 45) / 90)
        }
        window.addEventListener('deviceorientation', handleOrientation)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
    }, [isTouch, mouseX, mouseY])

    return (
        <div style={{ perspective: 1000 }} className="h-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className={`relative h-full rounded-2xl w-full p-[1px] group cursor-pointer ${plan.popular ? '' : plan.isElite ? 'border border-elite-purple/50 shadow-[0_0_40px_rgba(139,92,246,0.2)]' : 'border border-white/10'}`}
            >
                {/* 1. Liquid Swirl Border for Popular Tier */}
                {plan.popular && (
                    <div className="absolute inset-0 rounded-[16px] overflow-hidden -z-10 bg-gradient-to-br from-elite-purple via-elite-pink to-elite-purple bg-[length:400%_400%] animate-pulse-glow" style={{ animation: 'liquidSwirl 4s ease infinite', opacity: 0.8 }} />
                )}

                {/* Main Card Body */}
                <div className="relative h-full rounded-[15px] p-8 flex flex-col z-10 overflow-hidden" style={{ background: 'rgba(5,5,15,0.95)', backdropFilter: 'blur(30px) saturate(1.2)' }}>

                    {/* 2. Dynamic Specular Shine (tracks mouse/gyro) */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
                        style={{
                            background: "radial-gradient(circle at center, rgba(236,72,153,0.3) 0%, transparent 50%)",
                            left: useTransform(glareX, x => `${x}%`),
                            top: useTransform(glareY, y => `${y}%`),
                            transform: 'translate(-50%, -50%)',
                            width: '200%',
                            height: '200%'
                        }}
                    />

                    {/* 3. "Elite" Shimmer Light Beam (Automated without hover) */}
                    {plan.isElite && (
                        <motion.div
                            className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30"
                            style={{
                                background: 'linear-gradient(45deg, transparent 40%, #fff 50%, transparent 60%)',
                                backgroundSize: '300% 300%'
                            }}
                            animate={{ backgroundPosition: ['200% -100%', '-100% 200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                        />
                    )}

                    {/* 4. Tier Ribbon */}
                    {plan.popular && (
                        <div className="absolute top-0 right-0 z-10">
                            <div className="bg-gradient-to-r from-elite-purple to-elite-pink text-[9px] font-black uppercase text-white tracking-widest px-8 py-1 truncate shadow-[0_0_15px_rgba(236,72,153,0.5)] transform translate-x-[30%] translate-y-[100%] rotate-45">
                                RECOMMENDED
                            </div>
                        </div>
                    )}

                    {/* Content (Z-10 floats above 3D glare) */}
                    <div className="relative z-10 flex-col flex h-full" style={{ transform: 'translateZ(40px)' }}>
                        <h3 className="text-2xl font-heading font-black tracking-widest uppercase mb-2 text-[#E0E0E0]">{plan.name}</h3>
                        <p className="text-gray-400 text-xs mb-8 font-light min-h-[32px]">{plan.description}</p>

                        {/* Price Display */}
                        <div className="mb-6 flex flex-col gap-1">
                            <div className="flex items-start">
                                <sup className="text-2xl font-bold text-gray-500 mt-3 mr-1">₹</sup>
                                <span className="text-6xl font-heading font-black italic tracking-tighter pb-2 pr-4 leading-none" style={{ background: plan.popular ? 'linear-gradient(135deg, #EC4899, #8B5CF6)' : plan.isElite ? 'linear-gradient(135deg, #a78bfa, #e879f9)' : 'linear-gradient(135deg, #E0E0E0, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: plan.popular ? 'drop-shadow(0 0 15px rgba(236,72,153,0.3))' : plan.isElite ? 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' : 'none' }}>
                                    <AnimatedCounter value={currentPrice} />
                                </span>
                                <span className="text-gray-500 text-sm font-light mt-auto mb-2 ml-1">/mo</span>
                            </div>

                            {/* Value Math Subtext */}
                            <AnimatePresence mode="wait">
                                {isAnnual ? (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] font-bold tracking-widest text-[#E0E0E0] uppercase mt-1">
                                        BILLED ₹{totalAnnual.toLocaleString('en-IN')} YR.
                                        <span className="text-emerald-400 ml-1">SAVE ₹{exactSavings.toLocaleString('en-IN')}!</span>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-gray-600 font-medium tracking-widest mt-1 min-h-[15px]">
                                        BILLED MONTHLY
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Value List (Positive only) */}
                        <ul className="flex-1 space-y-4 mb-8">
                            {plan.features.filter(f => f.ok).map((f, j) => (
                                <li key={j} className="flex items-start gap-3 text-sm text-[#E0E0E0] font-light">
                                    <div className="w-5 h-5 rounded-full bg-elite-purple/20 border border-elite-purple/40 flex items-center justify-center shrink-0 mt-[-2px]" style={{ boxShadow: '0 0 8px rgba(139,92,246,0.3)' }}>
                                        <Check size={12} className="text-elite-pink" />
                                    </div>
                                    <span className="leading-tight">{f.text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <div className="mt-auto">
                            <a
                                href={`https://wa.me/918888161216?text=${encodeURIComponent(`Hi, I'm interested in the ${plan.name} Membership Plan (${isAnnual ? 'Annually' : 'Monthly'}).`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${plan.popular
                                    ? 'btn-liquid text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-elite-purple/40 text-[#E0E0E0]'
                                    }`}>
                                {plan.popular && <Sparkles size={14} />}
                                Begin My Elite Journey
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
