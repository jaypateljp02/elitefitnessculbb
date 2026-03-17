import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import useCountUp from '../hooks/useCountUp'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Dumbbell, Heart, Users, Zap, Trophy, Target, ChevronLeft, ChevronRight, Star, ArrowRight, Sparkles, Shield, Crown, Play } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import HolographicCard from '../components/PricingCard'

/* ===== Magnetic Hook (reusable) ===== */
function useMagnetic(strength = 0.3) {
    const ref = useRef(null)
    const handleMouseMove = useCallback((e) => {
        if (!ref.current || window.innerWidth < 768) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }, [strength])
    const handleMouseLeave = useCallback(() => {
        if (ref.current) ref.current.style.transform = 'translate(0, 0)'
    }, [])
    return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}

/* ===== Touch detection ===== */
function useIsTouch() {
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])
    return touch
}

/* =======================================
   HERO — VIDEO TEXT MASK + 3D DUMBBELL
   ======================================= */
function Hero() {
    const isTouch = useIsTouch()
    const heroRef = useRef(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [imgIndex, setImgIndex] = useState(0)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])

    const heroImages = ['/asset/Pillar 1.jpeg', '/asset/Pillar 2.jpeg', '/asset/Pillar 3.jpeg', '/asset/Pillar 4.jpeg']

    // Crossfade slideshow (mimics video)
    useEffect(() => {
        const timer = setInterval(() => setImgIndex((p) => (p + 1) % heroImages.length), 4000)
        return () => clearInterval(timer)
    }, [])

    // Mouse tracking for 3D dumbbell
    const handleMouseMove = (e) => {
        if (isTouch) return
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        })
    }

    const mag1 = useMagnetic(0.3)
    const mag2 = useMagnetic(0.3)

    return (
        <section
            ref={heroRef}
            className="relative h-screen flex items-center justify-center pt-32 pb-8 sm:pb-12 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* SEO: Hidden accessible h1 */}
            <h1 className="sr-only" aria-label="Elite Fitness Clubb — Best Gym in Hinjewadi, Pune">
                Elite Fitness Clubb — Best Premium Gym in Hinjewadi, Pune
            </h1>

            {/* Background: Crossfading Image Slideshow with zoom-in parallax */}
            {heroImages.map((img, i) => (
                <motion.div
                    key={img}
                    className="absolute inset-0"
                    animate={{
                        opacity: i === imgIndex ? 1 : 0,
                        scale: i === imgIndex ? 1.12 : 1,
                    }}
                    transition={{
                        opacity: { duration: 1.5, ease: 'easeInOut' },
                        scale: { duration: 4, ease: 'easeOut' },
                    }}
                >
                    <img
                        src={img}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                    />
                </motion.div>
            ))}

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 50%, rgba(236,72,153,0.06) 100%)' }} />

            {/* Top neon accents */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-elite-purple to-transparent opacity-50" />

            {/* === TEXT MASK: "BECOME ELITE" with image showing through === */}
            <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center px-4 max-w-6xl w-full">

                {/* The masked text — slideshow plays THROUGH the letters */}
                <div className="relative mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl sm:text-6xl lg:text-[6rem] xl:text-[8rem] font-heading font-black leading-[0.85] tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        START YOUR
                    </motion.div>

                    {/* Masked text: images play inside these letters */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="relative text-[2.5rem] sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-heading font-black leading-[0.9] tracking-tight"
                    >
                        <span
                            className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-elite-purple to-elite-pink"
                            style={{
                                filter: 'drop-shadow(0 0 25px rgba(139,92,246,0.8))',
                                backgroundSize: '150% auto',
                            }}
                        >
                            FITNESS JOURNEY
                        </span>
                        <span className="text-white">.</span>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-sm sm:text-lg text-gray-300/80 max-w-xl mx-auto mb-10 font-light"
                >
                    Experience the pinnacle of fitness. Join the most exclusive training environment.
                </motion.p>

                {/* Magnetic CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <div ref={mag1.ref} onMouseMove={mag1.onMouseMove} onMouseLeave={mag1.onMouseLeave} className="magnetic-btn">
                        <Link to="/membership" className="relative group px-8 py-4 rounded-lg overflow-hidden inline-flex items-center justify-center gap-3 font-bold text-base">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-elite-purple to-elite-pink" />
                            <div className="absolute inset-[2px] rounded-[6px] bg-elite-purple/80 group-hover:bg-elite-purple transition-all" />
                            <span className="relative z-10 flex items-center gap-2">GET STARTED <ArrowRight size={18} /></span>
                        </Link>
                    </div>
                    <div ref={mag2.ref} onMouseMove={mag2.onMouseMove} onMouseLeave={mag2.onMouseLeave} className="magnetic-btn">
                        <Link to="/virtual-tour" className="relative group px-8 py-4 rounded-lg overflow-hidden inline-flex items-center justify-center gap-3 font-bold text-base">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-elite-purple to-elite-pink" />
                            <div className="absolute inset-[2px] rounded-[6px] bg-black/80 group-hover:bg-black/60 transition-all" />
                            <span className="relative z-10 flex items-center gap-2">EXPLORE GYM <Play size={16} /></span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* === 3D CSS DUMBBELL (all devices, auto-rotates on touch) === */}
            <div
                className="absolute top-1/4 right-[5%] sm:right-[8%] z-20 w-20 h-20 sm:w-32 sm:h-32 pointer-events-none"
                style={{
                    perspective: '800px',
                }}
            >
                <motion.div
                    animate={isTouch ? { y: [0, -15, 0], rotateY: [0, 360] } : { y: [0, -15, 0] }}
                    transition={isTouch ? { y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 10, repeat: Infinity, ease: 'linear' } } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        transform: isTouch ? undefined : `rotateX(${mousePos.y * -20}deg) rotateY(${mousePos.x * 20}deg)`,
                        transition: isTouch ? undefined : 'transform 0.3s ease-out',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Dumbbell shape: two weights + bar */}
                    <div className="relative flex items-center justify-center">
                        {/* Left weight */}
                        <div
                            className="w-12 h-20 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, #1a1a2e, #2d2d44, #1a1a2e)',
                                border: '1px solid rgba(139,92,246,0.3)',
                                boxShadow: '0 0 20px rgba(139,92,246,0.15), inset 0 0 10px rgba(0,0,0,0.5)',
                            }}
                        />
                        {/* Bar */}
                        <div
                            className="w-10 h-3 sm:w-16 sm:h-4 relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(to bottom, #3a3a5c, #2a2a44, #3a3a5c)',
                                border: '1px solid rgba(139,92,246,0.2)',
                                boxShadow: '0 0 10px rgba(139,92,246,0.1)',
                            }}
                        >
                            {/* Specular highlight: moves with rotation */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: isTouch ? 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)' : `linear-gradient(${90 + mousePos.x * 60}deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)`,
                                    transition: 'background 0.3s ease-out',
                                }}
                            />
                        </div>
                        {/* Right weight */}
                        <div
                            className="w-12 h-20 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, #1a1a2e, #2d2d44, #1a1a2e)',
                                border: '1px solid rgba(139,92,246,0.3)',
                                boxShadow: '0 0 20px rgba(139,92,246,0.15), inset 0 0 10px rgba(0,0,0,0.5)',
                            }}
                        />
                    </div>
                    {/* Glow underneath */}
                    <div
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full blur-lg"
                        style={{ background: 'rgba(139,92,246,0.2)' }}
                    />
                </motion.div>
            </div>
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${5 + Math.random() * 90}%`,
                            top: `${5 + Math.random() * 90}%`,
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                            background: i % 2 === 0 ? '#8B5CF6' : '#EC4899',
                            boxShadow: `0 0 ${6 + Math.random() * 8}px ${i % 2 === 0 ? 'rgba(139,92,246,0.6)' : 'rgba(236,72,153,0.5)'}`,
                        }}
                        animate={{ y: [0, -(60 + Math.random() * 80), 0], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
                    <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-elite-purple to-elite-pink" />
                </motion.div>
            </motion.div>
        </section>
    )
}

/* =======================================
   STATS — MAGNETIC FLOATING NUMBERS
   ======================================= */
function StatsBar() {
    const stats = [
        { number: 1100, suffix: '+', label: 'Active Members', icon: Users, from: -100 },
        { number: 10, suffix: '+', label: 'Expert Trainers', icon: Shield, from: 100 },
        { number: 10, suffix: '+', label: 'Years Excellence', icon: Trophy, from: -80 },
        { number: 6000, suffix: '', label: 'Sq. Ft. Space', icon: Target, from: 0 },
    ]

    return (
        <section className="relative py-12 border-y border-white/5" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.04), rgba(236,72,153,0.02), transparent)' }}>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const [ref, count] = useCountUp(stat.number)
                    return (
                        <motion.div
                            key={i}
                            ref={ref}
                            initial={{ opacity: 0, x: stat.from, scale: 0.8 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                type: 'spring',
                                stiffness: 120,
                                damping: 15,
                                delay: i * 0.12,
                            }}
                            whileHover={{ scale: 1.08 }}
                            className="text-center group cursor-default relative"
                        >
                            <div className="text-4xl sm:text-5xl font-heading font-black gradient-text mb-1">
                                {count.toLocaleString()}{stat.suffix}
                            </div>
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>

                            {/* Hover glow bubble hint */}
                            <div className="absolute -inset-2 rounded-2xl bg-elite-purple/0 group-hover:bg-elite-purple/5 transition-all duration-500 -z-10 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]" />
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

/* =======================================
   ABOUT PREVIEW
   ======================================= */
function AboutPreview() {
    return (
        <section className="py-16 sm:py-28 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(236,72,153,0.04) 0%, transparent 50%)' }}>
            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <img src="/asset/Pillar 2.jpeg" alt="Elite Fitness Gym Interior" className="w-full h-[550px] object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-8 -right-4 sm:-right-8 p-6 rounded-2xl flex items-center gap-5" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', backdropFilter: 'blur(24px)', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 0 30px rgba(139,92,246,0.1), 0 20px 40px rgba(0,0,0,0.3)' }}>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}><Trophy size={28} className="text-white" /></div>
                        <div><div className="text-3xl font-heading font-black gradient-text">10+</div><div className="text-gray-400 text-sm font-medium">Years of Excellence</div></div>
                    </motion.div>
                    <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-elite-purple/40 rounded-tl-2xl" />
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-elite-pink/30 rounded-br-2xl" />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <span className="tag-elite mb-6 inline-block">ABOUT US</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-8 leading-tight uppercase">More Than<br />Just a <span className="gradient-text">Gym</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">Elite Fitness Clubb represents the zenith of premium fitness infrastructure. Conceived for those who refuse to compromise, our facility unites cutting-edge technology, elite-tier coaching, and an ambiance engineered for true transformation.</p>
                    <p className="text-gray-500 leading-relaxed mb-10 font-light">Whether you seek unparalleled strength development, holistic mindfulness in yoga, or dynamic energy in our group arenas—we provide the absolute best to forge a superior you.</p>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        {[{ icon: Dumbbell, text: 'Premium Equipment' }, { icon: Users, text: 'Expert Trainers' }, { icon: Zap, text: 'Electric Atmosphere' }, { icon: Heart, text: 'Strong Community' }].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 200 }}
                                className="flex items-center gap-3 py-2 group"
                            >
                                <div className="icon-draw gradient-icon flex items-center justify-center shrink-0">
                                    <item.icon size={18} className="text-transparent" />
                                </div>
                                <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                    <Link to="/about" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-elite-purple to-elite-pink rounded-full font-bold btn-glow group text-lg">Discover Our Story <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" /></Link>
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   FACILITIES — SPOTLIGHT REVEAL
   ======================================= */
function Facilities() {
    const containerRef = useRef(null)
    const isTouch = useIsTouch()

    const handlePointerMove = useCallback((e) => {
        if (!containerRef.current) return
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        const rect = containerRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        containerRef.current.style.setProperty('--mouse-x', `${x}px`)
        containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    }, [])

    const facilities = [
        {
            title: 'ELITE PERSONAL TRAINING',
            desc: '1-on-1 expert coaching designed to completely transform your body and mindset. Our flagship program for guaranteed results.',
            tag: 'EXPERT COACHING',
            image: '/asset/1-1.png',
            classes: 'md:col-span-2 md:row-span-2 h-[450px] md:h-auto'
        },
        {
            title: 'WEIGHT LOSS PROTOCOLS',
            desc: 'Science-backed routines and structured diet plans for guaranteed fat loss.',
            tag: 'TRANSFORMATION',
            image: '/asset/4-1.png',
            classes: 'md:col-span-1 h-[280px] md:h-[320px]'
        },
        {
            title: '6,000 SQ. FT. FACILITY',
            desc: 'Premium imported equipment in a sprawling, high-energy environment.',
            tag: 'THE GYM FLOOR',
            image: '/asset/3-1.png',
            classes: 'md:col-span-1 h-[280px] md:h-[320px]'
        },
        {
            title: 'GROUP CLASSES & RECOVERY',
            desc: 'High-energy Zumba, Yoga, and premium Ice Bath therapy for total holistic wellness and community.',
            tag: 'COMMUNITY & RECOVERY',
            image: '/asset/11.png',
            classes: 'md:col-span-3 h-[280px] md:h-[350px]'
        },
    ]

    return (
        <section className="py-16 sm:py-28 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(139,92,246,0.06) 0%, transparent 40%), radial-gradient(ellipse at 80% 70%, rgba(236,72,153,0.04) 0%, transparent 40%)' }}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl lg:text-5xl font-heading font-black uppercase mb-4 tracking-wide">
                        ELEVATE YOUR <span className="gradient-text">POTENTIAL</span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
                        We don't just rent you treadmills. We provide the expertise, the environment, and the tools to guarantee your transformation.
                    </p>
                </motion.div>

                {/* Spotlight container (Bento Grid) */}
                <div
                    ref={containerRef}
                    className="spotlight-container grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
                    onMouseMove={handlePointerMove}
                    onTouchMove={handlePointerMove}
                    style={{ touchAction: 'pan-y' }}
                >
                    {/* Spotlight overlay */}
                    <div className="spotlight-overlay hidden md:block" style={{ background: 'rgba(5,5,15, 0.9)' }} />

                    {facilities.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            className={`relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer ${f.classes}`}
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <img src={f.image} alt={f.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end relative z-10">
                                <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${i === 0 ? 'text-elite-pink' : 'text-elite-purple'}`}>
                                    {f.tag}
                                </span>
                                <h3 className={`font-heading font-black text-white mb-3 leading-tight ${i === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>
                                    {f.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed max-w-sm font-light">
                                    {f.desc}
                                </p>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ border: `1px solid ${i === 0 ? 'rgba(236,72,153,0.5)' : 'rgba(139,92,246,0.4)'}`, boxShadow: `inset 0 0 30px ${i === 0 ? 'rgba(236,72,153,0.2)' : 'rgba(139,92,246,0.2)'}` }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   MEMBERSHIP — NEON BORDER CARDS
   ======================================= */
function MembershipPreview() {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef(null)

    const handleScroll = () => {
        if (!scrollRef.current) return
        const x = scrollRef.current.scrollLeft
        const width = scrollRef.current.offsetWidth
        const index = Math.round(x / width)
        if (index !== activeIndex) setActiveIndex(index)
    }

    const plans = [
        {
            name: 'STARTER',
            monthlyPrice: 1499,
            description: 'Perfect for beginners starting their fitness journey.',
            features: [
                { text: 'Gym Floor Access', ok: true },
                { text: 'Locker Room', ok: true },
                { text: 'Water Station', ok: true },
                { text: 'Basic Equipment', ok: true },
            ],
            popular: false,
        },
        {
            name: 'PREMIUM',
            monthlyPrice: 2999,
            description: 'For serious fitness enthusiasts who want more.',
            features: [
                { text: 'All Starter Features', ok: true },
                { text: 'Personal Locker', ok: true },
                { text: 'Unlimited Group Classes', ok: true },
                { text: 'Diet Consultation', ok: true },
                { text: 'Sauna Access', ok: true },
            ],
            popular: true,
        },
        {
            name: 'ELITE',
            monthlyPrice: 4999,
            description: 'The ultimate premium package for maximum results.',
            features: [
                { text: 'Everything in Premium', ok: true },
                { text: 'Personal Trainer 3x/week', ok: true },
                { text: 'Ice Bath Therapy', ok: true },
                { text: 'Priority Class Booking', ok: true },
                { text: 'Guest Passes (2/month)', ok: true },
                { text: 'Custom Nutrition Plan', ok: true },
            ],
            popular: false,
            isElite: true,
        },
    ]

    return (
        <section className="py-16 sm:py-28 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)' }}>
            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16">
                    <p className="text-elite-purple text-sm font-semibold uppercase tracking-widest mb-3">JOIN THE ELITE FORCE /</p>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black mb-4">CHOOSE YOUR PLAN</h2>
                    <p className="text-gray-500 text-sm sm:text-base font-light">Premium Memberships tailored for your fitness journey.</p>
                </motion.div>

                {/* Mobile: Horizontal Snap Scroll | Desktop: 3-Column Grid */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 lg:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
                >
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', stiffness: 100 }}
                            className={`snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto min-h-[520px] md:h-[550px] ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            <HolographicCard plan={plan} isAnnual={false} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile scroll indicator dots */}
                <div className="flex md:hidden justify-center gap-2 mt-2">
                    {plans.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-elite-purple w-4' : 'bg-white/20'}`}
                        />
                    ))}
                </div>

                <div className="mt-10 sm:mt-16 text-center">
                    <Link to="/membership" className="inline-flex items-center gap-2 text-elite-purple hover:text-elite-pink transition-colors text-sm font-bold uppercase tracking-widest group">
                        VIEW DETAILED COMPARISON <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}



/* =======================================
   FRANCHISE CTA
   ======================================= */
function FranchiseCTA() {
    return (
        <section className="py-16 sm:py-28 px-4 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.08) 0%, transparent 40%), radial-gradient(ellipse at 70% 50%, rgba(236,72,153,0.06) 0%, transparent 40%)' }}>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-elite-purple/10 blur-[150px] -translate-y-1/2" />
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="tag-elite mb-8 inline-block" style={{ borderColor: 'rgba(236,72,153,0.3)', color: '#F472B6', background: 'rgba(236,72,153,0.1)' }}>💼 BUSINESS OPPORTUNITY</span>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black mb-8 leading-tight uppercase">Own an <span className="gradient-text text-glow">Elite Fitness</span><br />Clubb Franchise</h2>
                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light">Join India's fastest-growing premium fitness brand. Low investment, high returns, complete operational support.</p>
                    <Link to="/franchise" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-elite-pink via-purple-500 to-elite-purple rounded-full text-lg font-bold btn-glow group"><Crown size={22} /> Explore Franchise <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" /></Link>
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   TESTIMONIALS — PREMIUM WALL
   ======================================= */
function Testimonials() {
    const [showAll, setShowAll] = useState(false)
    const testimonials = [
        { name: 'Neha Sharma', role: 'Corporate Executive', text: 'The level of personalization at Elite Fitness is incredible. My trainer understands my crazy work schedule and designed a program that actually works for me. Best investment in myself.', rating: 5, initials: 'NS', color: '#EC4899' },
        { name: 'Karan Malhotra', role: 'Fitness Enthusiast', text: 'I\'ve been to every premium gym in Pune, but the community and equipment here are on another level. The trainers are deeply knowledgeable about biomechanics. Highly recommended.', rating: 5, initials: 'KM', color: '#8B5CF6' },
        { name: 'Rahul Sharma', role: 'Member · 2 Years', text: 'Elite Fitness completely transformed my approach to fitness. The trainers here don\'t just count reps — they build real programs. Lost 12 kgs and gained confidence I never thought possible.', rating: 5, initials: 'RS', color: '#8B5CF6' },
        { name: 'Priya Patel', role: 'Weight Loss Journey', text: 'I lost 15 kgs in 6 months with their personal training program. The diet consultation made all the difference. The trainers genuinely care about your progress.', rating: 5, initials: 'PP', color: '#EC4899' },
        { name: 'Amit Deshmukh', role: 'Strength Athlete', text: 'Equipment quality is top-notch — Hammer Strength racks, premium dumbbells, the works. The vibe just hits different. Nothing in Hinjewadi even comes close.', rating: 5, initials: 'AD', color: '#6366F1' },
        { name: 'Sneha Joshi', role: 'Yoga & Zumba', text: 'Their yoga and Zumba classes are phenomenal! The instructors bring incredible energy. It\'s not just a gym, it\'s a community that lifts you up. Best decision ever!', rating: 5, initials: 'SJ', color: '#F59E0B' },
        { name: 'Vikram Kulkarni', role: 'IT Professional', text: 'After 10-hour coding marathons, this gym is my therapy. The ice bath recovery zone is a game-changer. Clean, modern, and never overcrowded. Exactly what Hinjewadi needed.', rating: 5, initials: 'VK', color: '#10B981' },
        { name: 'Ananya Reddy', role: 'Fitness Newbie', text: 'I was intimidated walking into a gym for the first time. The trainers here made me feel so welcome from day one. Two months in and I\'m already seeing results!', rating: 5, initials: 'AR', color: '#F472B6' },
        { name: 'Rohan Mehta', role: 'Bodybuilding', text: 'The personal training program is worth every rupee. My trainer designed a custom split that finally broke my plateau. Gained 5 kgs of lean muscle in 3 months.', rating: 5, initials: 'RM', color: '#8B5CF6' },
        { name: 'Kavita Singh', role: 'Working Mom', text: 'Finding time for fitness is hard as a mom. The flexible class timings and the supportive atmosphere make it possible. I actually look forward to my sessions now!', rating: 5, initials: 'KS', color: '#EC4899' },
    ]

    // On mobile show 4, on desktop show all
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    const visibleTestimonials = (!isMobile || showAll) ? testimonials : testimonials.slice(0, 4)

    return (
        <section className="py-16 sm:py-28 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(236,72,153,0.04) 0%, transparent 50%)' }}>
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
                    <p className="text-elite-purple text-sm font-semibold uppercase tracking-widest mb-3">REAL RESULTS, REAL PEOPLE /</p>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black mb-4">WHAT MEMBERS <span className="gradient-text">SAY</span></h2>
                </motion.div>

                {/* Google Rating Badge */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center mb-10 sm:mb-16">
                    <div className="inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.4))' }} />)}
                        </div>
                        <span className="text-white font-heading font-bold text-base sm:text-lg">4.9</span>
                        <span className="text-gray-500 text-xs sm:text-sm font-light">· Google Reviews</span>
                    </div>
                </motion.div>

                {/* Masonry Grid of Testimonial Cards */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
                    {visibleTestimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="break-inside-avoid group"
                        >
                            <div
                                className="relative p-5 sm:p-7 rounded-2xl transition-all duration-500 group-hover:border-elite-purple/30 overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    backdropFilter: 'blur(16px)',
                                }}
                            >
                                {/* Subtle glow on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${t.color}15 0%, transparent 60%)` }} />

                                {/* Quotation Mark */}
                                <div className="absolute top-3 right-4 text-5xl sm:text-6xl font-serif leading-none pointer-events-none select-none" style={{ color: `${t.color}15` }}>"</div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-3 sm:mb-4 relative z-10">
                                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" style={{ filter: 'drop-shadow(0 0 3px rgba(250,204,21,0.3))' }} />)}
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-4 sm:mb-6 font-light relative z-10">"{t.text}"</p>

                                {/* Reviewer Info */}
                                <div className="flex items-center gap-3 relative z-10">
                                    {/* Avatar Circle with Initials */}
                                    <div
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold tracking-wider shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)`, boxShadow: `0 0 12px ${t.color}40` }}
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-[13px] sm:text-sm">{t.name}</div>
                                        <div className="text-gray-500 text-[11px] sm:text-xs font-light">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: Show More Toggle */}
                {!showAll && isMobile && testimonials.length > 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center sm:hidden">
                        <button
                            onClick={() => setShowAll(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-elite-purple border border-elite-purple/30 hover:bg-elite-purple/10 transition-all"
                        >
                            Show {testimonials.length - 4} More Reviews
                        </button>
                    </motion.div>
                )}

                {/* Bottom CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10 sm:mt-14 text-center">
                    <a href="https://www.google.com/maps/place/The+Elite+Fitness+Clubb/@18.600203,73.7316716,17z/data=!4m8!3m7!1s0x3bc2bb2543bc20b5:0x5ce8ad8ba071e275!8m2!3d18.600203!4d73.7342465!9m1!1b1!16s%2Fg%2F11wy1d2js3" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-elite-purple hover:text-elite-pink transition-colors text-sm font-bold uppercase tracking-widest group">
                        READ ALL REVIEWS ON GOOGLE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   FINAL CTA
   ======================================= */
function FinalCTA() {
    return (
        <section className="py-20 sm:py-36 px-4 relative overflow-hidden">
            <div className="absolute inset-0">
                <img src="/asset/Sitting area wall.jpeg" alt="Gym Ambiance" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-elite-purple/20 to-elite-pink/20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-elite-purple/10 blur-[150px]" />
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black mb-8 leading-none uppercase">Start Your <span className="gradient-text text-glow">Fitness Journey</span> Today</h2>
                <p className="text-gray-300 text-lg mb-12 max-w-xl mx-auto font-light">Don't wait for tomorrow. Your future self will thank you.</p>
                <Link to="/membership" className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-elite-purple via-purple-500 to-elite-pink rounded-full text-xl font-bold btn-glow animate-pulse-glow group">
                    Join Now <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
            </motion.div>
        </section>
    )
}

/* =======================================
   HOME PAGE EXPORT
   ======================================= */
export default function Home() {
    return (
        <PageWrapper>
            <Hero />
            <StatsBar />
            <AboutPreview />
            <Facilities />
            <FranchiseCTA />
            <Testimonials />
            <FinalCTA />
        </PageWrapper>
    )
}
