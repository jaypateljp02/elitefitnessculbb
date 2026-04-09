import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import useCountUp from '../hooks/useCountUp'
import useSEO from '../hooks/useSEO'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Dumbbell, Heart, Users, Zap, Trophy, Target, ChevronLeft, ChevronRight, Star, ArrowRight, Sparkles, Shield, Crown, Play } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ===== Magnetic Hook (reusable) ===== */
function useMagnetic(strength = 0.3) {
    const ref = useRef(null)
    const activeFrame = useRef(null)
    const handleMouseMove = useCallback((e) => {
        if (!ref.current || window.innerWidth < 768) return
        if (activeFrame.current) cancelAnimationFrame(activeFrame.current)
        activeFrame.current = requestAnimationFrame(() => {
            const rect = ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            if (ref.current) ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        })
    }, [strength])
    const handleMouseLeave = useCallback(() => {
        if (activeFrame.current) cancelAnimationFrame(activeFrame.current)
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
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])

    const mag1 = useMagnetic(0.3)
    const mag2 = useMagnetic(0.3)

    return (
        <section
            ref={heroRef}
            className="relative h-screen flex items-center justify-center pt-32 pb-8 sm:pb-12 overflow-hidden"
        >
            {/* SEO: Hidden accessible h1 */}
            <h1 className="sr-only" aria-label="The Elite Fitness Clubb — Best Gym in Hinjewadi, Pune">
                The Elite Fitness Clubb — Best Premium Gym in Hinjewadi, Pune
            </h1>

            {/* Background: Video with poster fallback */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/asset/new/20260404_130238.webp"
                    className="w-full h-full object-cover"
                >
                    <source src="/asset/new/gym intro .mp4" type="video/mp4" />
                </video>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(233,111,73,0.1) 0%, transparent 50%, rgba(233,111,73,0.06) 100%)' }} />

            {/* Top neon accents */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-elite-orange to-transparent opacity-50" />

            {/* === TEXT: "START YOUR FITNESS JOURNEY" === */}
            <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center px-4 max-w-6xl w-full">

                {/* Hero Text */}
                <div className="relative mb-3">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl sm:text-6xl lg:text-[6rem] xl:text-[8rem] font-heading font-black leading-[0.85] tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        START YOUR
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="relative text-[2.5rem] sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-heading font-black leading-[0.9] tracking-tight"
                    >
                        <span
                            className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-elite-orange to-amber-400"
                            style={{
                                filter: 'drop-shadow(0 0 25px rgba(233,111,73,0.8))',
                                backgroundSize: '150% auto',
                            }}
                        >
                            FITNESS JOURNEY
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-sm sm:text-lg text-gray-300/80 max-w-xl mx-auto mb-5 font-light text-center"
                >
                    <p>Experience the pinnacle of fitness.</p>
                    <p>Join the most exclusive training environment.</p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <div ref={mag1.ref} onMouseMove={mag1.onMouseMove} onMouseLeave={mag1.onMouseLeave} className="magnetic-btn">
                        <Link to="/membership" className="relative group px-8 py-4 rounded-lg overflow-hidden inline-flex items-center justify-center gap-3 font-bold text-base">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-elite-orange to-amber-400" />
                            <div className="absolute inset-[2px] rounded-[6px] bg-elite-orange/80 group-hover:bg-elite-orange transition-all" />
                            <span className="relative z-10 flex items-center gap-2">JOIN NOW <ArrowRight size={18} /></span>
                        </Link>
                    </div>
                    <div ref={mag2.ref} onMouseMove={mag2.onMouseMove} onMouseLeave={mag2.onMouseLeave} className="magnetic-btn">
                        <Link to="/virtual-tour" className="relative group px-8 py-4 rounded-lg overflow-hidden inline-flex items-center justify-center gap-3 font-bold text-base">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-elite-orange to-amber-400" />
                            <div className="absolute inset-[2px] rounded-[6px] bg-black/80 group-hover:bg-black/60 transition-all" />
                            <span className="relative z-10 flex items-center gap-2">EXPLORE GYM <Play size={16} /></span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating particles — CSS animated for performance (reduced from 15 to 6) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full hero-particle"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${10 + (i * 17) % 80}%`,
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                            background: '#e96f49',
                            boxShadow: `0 0 ${6 + i * 2}px rgba(233,111,73,0.5)`,
                            animationDelay: `${i * 0.8}s`,
                        }}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-fadeIn" style={{ animationDelay: '2s' }}>
                <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 scroll-indicator">
                    <div className="w-1 h-2.5 rounded-full bg-gradient-to-b from-elite-orange to-amber-400" />
                </div>
            </div>
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
        <section className="relative py-12 border-y border-white/5" style={{ background: 'linear-gradient(135deg, rgba(233,111,73,0.04), rgba(233,111,73,0.02), transparent)' }}>
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
                            <div className="absolute -inset-2 rounded-2xl bg-elite-orange/0 group-hover:bg-elite-orange/5 transition-all duration-500 -z-10 group-hover:shadow-[0_0_30px_rgba(233,111,73,0.15)]" />
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

/* =======================================
   PHOTO MARQUEE — INFINITE SCROLL
   ======================================= */
function PhotoMarquee() {
    const marqueeImages = [
        '/asset/new/20260404_130426 .webp',
        '/asset/new/20260404_130434 .webp',
        '/asset/new/20260404_130446.webp',
        '/asset/new/20260404_130852.webp',
        '/asset/new/20260404_130940.webp'
    ]

    return (
        <section className="py-10 sm:py-16 relative noise-bg border-y border-white/5 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(233,111,73,0.06) 0%, rgba(5,5,15,1) 80%)' }}>
            
            {/* Massive Watermark Text Background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 flex whitespace-nowrap opacity-[0.03] pointer-events-none z-0">
                <div className="text-[10rem] md:text-[18rem] font-black font-heading tracking-tighter leading-none" style={{ WebkitTextStroke: '2px #e96f49', color: 'transparent' }}>
                    THE ELITE FITNESS THE ELITE FITNESS THE ELITE FITNESS THE ELITE FITNESS
                </div>
            </div>

            <div className="relative flex overflow-x-hidden group z-10">
                <div className="animate-marquee py-2 whitespace-nowrap flex gap-4 sm:gap-6 min-w-max px-4">
                    {[...marqueeImages, ...marqueeImages].map((img, i) => (
                        <div key={i} className="w-[280px] h-[190px] sm:w-[420px] sm:h-[280px] relative rounded-3xl overflow-hidden glass-card shrink-0" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                            <img src={img} alt="Gym Activity" className="w-full h-full object-cover" loading="lazy" />
                            <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   ABOUT PREVIEW
   ======================================= */
function AboutPreview() {
    return (
        <section className="py-16 sm:py-28 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(233,111,73,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(233,111,73,0.04) 0%, transparent 50%)' }}>
            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <img src="/asset/new/bodybuilder.png" alt="Elite Bodybuilder" className="w-full h-[550px] object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute -bottom-8 -right-4 sm:-right-8 p-6 rounded-2xl flex items-center gap-5" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', backdropFilter: 'blur(24px)', border: '1px solid rgba(233,111,73,0.2)', boxShadow: '0 0 30px rgba(233,111,73,0.1), 0 20px 40px rgba(0,0,0,0.3)' }}>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e96f49, #e96f49)', boxShadow: '0 0 20px rgba(233,111,73,0.4)' }}><Trophy size={28} className="text-white" /></div>
                        <div><div className="text-3xl font-heading font-black gradient-text">10+</div><div className="text-gray-400 text-sm font-medium">Years of Excellence</div></div>
                    </motion.div>
                    <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-elite-orange/40 rounded-tl-2xl" />
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-elite-orange/30 rounded-br-2xl" />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <span className="tag-elite mb-6 inline-block">ABOUT US</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-8 leading-tight uppercase">More Than<br />Just a <span className="gradient-text">Gym</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">The Elite Fitness Clubb represents the zenith of premium fitness infrastructure. Conceived for those who refuse to compromise, our facility unites cutting-edge technology, elite-tier coaching, and an ambiance engineered for true transformation.</p>
                    <p className="text-gray-500 leading-relaxed mb-10 font-light">Whether you seek unparalleled strength development, holistic mindfulness in yoga, or dynamic energy in our group arenas, we provide the absolute best to forge a superior you.</p>
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
                    <Link to="/about" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-elite-orange to-amber-400 rounded-full font-bold btn-glow group text-lg">Discover Our Story <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" /></Link>
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
            image: '/asset/1-1.webp',
            classes: 'md:col-span-2 md:row-span-2 h-[350px] md:h-[450px] lg:h-[500px]'
        },
        {
            title: 'WEIGHT LOSS PROTOCOLS',
            desc: 'Science-backed routines and structured diet plans for guaranteed fat loss.',
            tag: 'TRANSFORMATION',
            image: '/asset/4-1.webp',
            classes: 'md:col-span-1 h-[250px] md:h-[215px] lg:h-[240px]'
        },
        {
            title: '6,000 SQ. FT. FACILITY',
            desc: 'Premium imported equipment in a sprawling, high-energy environment.',
            tag: 'THE GYM FLOOR',
            image: '/asset/3-1.webp',
            classes: 'md:col-span-1 h-[250px] md:h-[215px] lg:h-[240px]'
        },
        {
            title: 'GROUP CLASSES & RECOVERY',
            desc: 'High-energy Zumba, Yoga, and premium Ice Bath therapy for total holistic wellness and community.',
            tag: 'COMMUNITY & RECOVERY',
            image: '/asset/11.webp',
            classes: 'md:col-span-3 h-[250px] md:h-[280px] lg:h-[320px]'
        },
    ]

    return (
        <section className="py-16 sm:py-28 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(233,111,73,0.06) 0%, transparent 40%), radial-gradient(ellipse at 80% 70%, rgba(233,111,73,0.04) 0%, transparent 40%)' }}>
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end relative z-10">
                                <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${i === 0 ? 'text-purple-400' : 'text-elite-orange'}`}>
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
                            <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ border: `1px solid ${i === 0 ? 'rgba(233,111,73,0.5)' : 'rgba(233,111,73,0.4)'}`, boxShadow: `inset 0 0 30px ${i === 0 ? 'rgba(233,111,73,0.2)' : 'rgba(233,111,73,0.2)'}` }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   MEMBERSHIP — CUTE & WOW PREVIEW
   ======================================= */
function MembershipPreview() {
    const plans = [
        { duration: '1 Month', price: '3,000', tag: 'TRY IT', gradient: 'from-gray-800 to-gray-900', shadow: 'rgba(255,255,255,0.05)' },
        { duration: '3 Months', price: '7,000', tag: 'STARTER', gradient: 'from-gray-800 to-gray-900', shadow: 'rgba(255,255,255,0.05)' },
        { duration: '6 Months', price: '10,000', tag: 'POPULAR', gradient: 'from-elite-orange to-amber-500', shadow: 'rgba(233,111,73,0.3)', isOrange: true },
        { duration: '12 Months', price: '14,000', tag: 'BEST VALUE', gradient: 'from-purple-500 to-purple-800', shadow: 'rgba(124,58,237,0.3)' },
    ]

    return (
        <section className="py-20 sm:py-32 px-4 relative overflow-hidden" style={{ background: '#050508' }}>
            {/* Cute backdrop blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-elite-orange/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">Join the Clubb</span>
                    <h2 className="text-4xl sm:text-6xl font-heading font-black tracking-tight mb-4">Pick Your <span className="gradient-text">Plan</span></h2>
                </motion.div>

                {/* Simple & Wow Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                            className="relative"
                        >
                            <a
                                href={`https://wa.me/918888161216?text=${encodeURIComponent(`Hi! I'm interested in the ${plan.duration} Membership Plan.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block relative overflow-hidden group rounded-[2.5rem] p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300"
                                style={{ 
                                    background: plan.isOrange || plan.gradient.includes('purple') ? '' : 'rgba(20,20,30,0.4)',
                                    backgroundImage: plan.isOrange || plan.gradient.includes('purple') ? `linear-gradient(135deg, var(--tw-gradient-stops))` : '',
                                    boxShadow: `0 20px 40px ${plan.shadow}`,
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />

                                <span className={`text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-6 transition-colors ${plan.isOrange || plan.gradient.includes('purple') ? 'bg-black/20 text-white' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
                                    {plan.tag}
                                </span>
                                
                                <h3 className={`text-xl sm:text-2xl font-heading font-black tracking-wide mb-2 ${plan.isOrange || plan.gradient.includes('purple') ? 'text-white' : 'text-gray-300'}`}>{plan.duration}</h3>
                                
                                <div className="flex items-start justify-center gap-1 mb-8">
                                    <span className={`font-medium mt-1 ${plan.isOrange || plan.gradient.includes('purple') ? 'text-white/60' : 'text-gray-500'}`}>₹</span>
                                    <span className={`text-4xl sm:text-5xl font-heading font-black tracking-tight ${plan.isOrange || plan.gradient.includes('purple') ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]' : 'text-white'}`}>
                                        {plan.price}
                                    </span>
                                </div>

                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 mt-auto ${plan.isOrange || plan.gradient.includes('purple') ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                                    <ArrowRight size={20} />
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-14 text-center">
                    <Link to="/membership" className="inline-flex items-center gap-2 text-gray-400 hover:text-elite-orange transition-colors text-sm font-bold uppercase tracking-widest group">
                        See All Plan Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
        <section className="py-16 sm:py-28 px-4 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(233,111,73,0.08) 0%, transparent 40%), radial-gradient(ellipse at 70% 50%, rgba(233,111,73,0.06) 0%, transparent 40%)' }}>
            <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-elite-orange/10 blur-[150px] -translate-y-1/2 pointer-events-none" />
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="tag-elite mb-8 inline-block" style={{ borderColor: 'rgba(124,58,237,0.3)', color: '#a78bfa', background: 'rgba(124,58,237,0.1)' }}>💼 BUSINESS OPPORTUNITY</span>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black mb-8 leading-tight uppercase text-center">Own an<br /><span className="gradient-text text-glow">The Elite Fitness Clubb</span><br />Franchise</h2>
                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light">Join our vision to build India's most trusted premium fitness brand. Turnkey investment, high-margin operations, and complete system support.</p>
                    <Link to="/franchise" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-elite-orange via-purple-500 to-purple-600 rounded-full text-lg font-bold btn-glow group"><Crown size={22} /> Explore Franchise <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" /></Link>
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   TESTIMONIALS — PREMIUM WALL
   ======================================= */
/* =======================================
   TESTIMONIALS — INFINITE MARQUEE WALL
   ======================================= */
function Testimonials() {
    const testimonials = [
        { name: 'Neha Sharma', role: 'Corporate Executive', text: 'The level of personalization at The Elite Fitness is incredible. My trainer understands my crazy work schedule and designed a program that actually works for me.', rating: 5, initials: 'NS', color: '#e96f49' },
        { name: 'Karan Malhotra', role: 'Fitness Enthusiast', text: 'I\'ve been to every premium gym in Pune, but the community and equipment here are on another level. The trainers are deeply knowledgeable about biomechanics.', rating: 5, initials: 'KM', color: '#a78bfa' },
        { name: 'Rahul Sharma', role: 'Member · 2 Years', text: 'The Elite Fitness completely transformed my approach to fitness. The trainers here don\'t just count reps — they build real programs. Lost 12 kgs and gained confidence.', rating: 5, initials: 'RS', color: '#10B981' },
        { name: 'Priya Patel', role: 'Weight Loss Journey', text: 'I lost 15 kgs in 6 months with their personal training program. The diet consultation made all the difference. The trainers genuinely care about your progress.', rating: 5, initials: 'PP', color: '#F59E0B' },
        { name: 'Amit Deshmukh', role: 'Strength Athlete', text: 'Equipment quality is top-notch — Hammer Strength racks, premium dumbbells, the works. The vibe just hits different. Nothing in Hinjewadi even comes close.', rating: 5, initials: 'AD', color: '#6366F1' },
        { name: 'Sneha Joshi', role: 'Yoga & Zumba', text: 'Their yoga and Zumba classes are phenomenal! The instructors bring incredible energy. It\'s not just a gym, it\'s a community that lifts you up.', rating: 5, initials: 'SJ', color: '#F472B6' },
        { name: 'Vikram Kulkarni', role: 'IT Professional', text: 'After 10-hour coding marathons, this gym is my therapy. The ice bath recovery zone is a game-changer. Clean, modern, and never overcrowded.', rating: 5, initials: 'VK', color: '#e96f49' },
        { name: 'Ananya Reddy', role: 'Fitness Newbie', text: 'I was intimidated walking into a gym for the first time. The trainers here made me feel so welcome from day one. Two months in and I\'m already seeing results!', rating: 5, initials: 'AR', color: '#3B82F6' },
        { name: 'Rohan Mehta', role: 'Bodybuilding', text: 'The personal training program is worth every rupee. My trainer designed a custom split that finally broke my plateau. Gained 5 kgs of lean muscle in 3 months.', rating: 5, initials: 'RM', color: '#8B5CF6' },
        { name: 'Kavita Singh', role: 'Working Mom', text: 'Finding time for fitness is hard as a mom. The flexible class timings and the supportive atmosphere make it possible. I actually look forward to my sessions now!', rating: 5, initials: 'KS', color: '#14B8A6' },
    ]

    const row1 = testimonials.slice(0, 5)
    const row2 = testimonials.slice(5, 10)

    return (
        <section className="py-20 sm:py-32 relative overflow-hidden noise-bg" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(233,111,73,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(233,111,73,0.04) 0%, transparent 50%)' }}>
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-elite-orange/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

            
            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
                    <p className="text-elite-orange text-sm font-bold uppercase tracking-[0.25em] mb-4 drop-shadow-[0_0_10px_rgba(233,111,73,0.5)]">Wall of Fame</p>
                    <h2 className="text-4xl sm:text-6xl font-heading font-black tracking-tight mb-4">MEMBER <span className="gradient-text">STORIES</span></h2>
                </motion.div>

                {/* Google Rating Badge */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center mb-12 sm:mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" style={{ filter: 'drop-shadow(0 0 6px rgba(250,204,21,0.5))' }} />)}
                        </div>
                        <span className="text-white font-heading font-black text-lg">4.9</span>
                        <span className="text-gray-400 text-sm font-medium">/ 5.0 Google Reviews</span>
                    </div>
                </motion.div>
            </div>

            {/* Infinite Horizontal Scrolling Rows */}
            <div className="w-full space-y-6 sm:space-y-8 relative z-10">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#050508] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#050508] to-transparent z-20 pointer-events-none" />

                {/* Row 1: Scroll Left */}
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee py-2 whitespace-nowrap flex gap-4 sm:gap-6 min-w-max">
                        {[...row1, ...row1, ...row1].map((t, i) => (
                            <ReviewCard key={i} t={t} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Scroll Right (animation direction reverse) */}
                <div className="relative flex overflow-x-hidden group mt-6">
                    <div className="animate-marquee py-2 whitespace-nowrap flex gap-4 sm:gap-6 min-w-max" style={{ animationDirection: 'reverse' }}>
                        {[...row2, ...row2, ...row2].map((t, i) => (
                            <ReviewCard key={i} t={t} />
                        ))}
                    </div>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 sm:mt-24 text-center relative z-10 w-full px-4">
                <a href="https://www.google.com/maps/place/The+Elite+Fitness+Clubb/@18.600203,73.7316716,17z/data=!4m8!3m7!1s0x3bc2bb2543bc20b5:0x5ce8ad8ba071e275!8m2!3d18.600203!4d73.7342465!9m1!1b1!16s%2Fg%2F11wy1d2js3" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-[0.2em] group">
                    READ ALL GOOGLE REVIEWS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </motion.div>
        </section>
    )
}

function ReviewCard({ t }) {
    return (
        <div className="w-[320px] sm:w-[420px] shrink-0 whitespace-normal">
            <div
                className="relative p-6 sm:p-8 rounded-[2rem] transition-all duration-300 hover:border-elite-orange/30 overflow-hidden h-full flex flex-col"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                }}
            >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${t.color} 0%, transparent 60%)` }} />

                {/* Quotation Mark Backdrop */}
                <div className="absolute -top-4 -right-2 text-[8rem] font-serif leading-none pointer-events-none select-none" style={{ color: `rgba(255,255,255,0.03)` }}>"</div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm sm:text-[15px] leading-relaxed mb-6 font-light relative z-10 flex-grow">"{t.text}"</p>

                {/* Reviewer Info */}
                <div className="flex items-center gap-4 relative z-10 mt-auto pt-4 border-t border-white/5">
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-black tracking-wider shrink-0 shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                    >
                        {t.initials}
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm sm:text-[15px]">{t.name}</div>
                        <div className="text-gray-500 text-xs sm:text-sm font-medium">{t.role}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


/* =======================================
   FINAL CTA
   ======================================= */
/* =======================================
   FINAL CTA — CINEMATIC OUTRO
   ======================================= */
function FinalCTA() {
    return (
        <section className="py-24 sm:py-40 px-4 relative flex items-center justify-center min-h-[80vh] overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/asset/new/20260404_130434 .webp"
                    alt="Elite Fitness"
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(30%)' }}
                    loading="lazy"
                />
                
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-elite-orange/20 via-transparent to-purple-900/20 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508] opacity-90" />
                {/* Film Grain Layer */}
                <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[500px] bg-elite-orange/15 blur-[150px] rounded-full pointer-events-none mix-blend-screen z-0" />

            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                
                {/* Mini Header */}
                <div className="mb-8 overflow-hidden rounded-full p-[1px] relative flex focus:outline-none">
                    <span className="absolute inset-0 bg-gradient-to-r from-elite-orange to-purple-600 animate-spin-slow"></span>
                    <div className="px-6 py-2 bg-[#050508]/90 backdrop-blur-md rounded-full w-full flex items-center justify-center z-10">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gray-300">Ready to transform?</span>
                    </div>
                </div>

                {/* Massive Typography */}
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black mb-6 leading-[1.1] uppercase drop-shadow-2xl text-white">
                    Start Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-elite-orange via-amber-400 to-purple-500" style={{ filter: 'drop-shadow(0 0 20px rgba(233,111,73,0.5))' }}>
                        Fitness Journey
                    </span> Today
                </h2>
                
                <p className="text-gray-300 text-lg sm:text-2xl mb-14 max-w-2xl mx-auto font-light leading-relaxed">
                    Don't wait for tomorrow. Your future self will thank you.
                </p>
                
                {/* Custom Super Premium Button */}
                <Link to="/membership" className="relative group inline-flex items-center justify-center perspective-1000">
                    {/* Glowing Backplate */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-elite-orange via-purple-600 to-elite-orange rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-pulse-glow" />
                    
                    {/* Button Body */}
                    <div className="relative inline-flex items-center gap-3 md:gap-4 px-10 py-5 sm:px-14 sm:py-6 bg-[#050508] border border-white/10 rounded-full leading-none overflow-hidden transition-all duration-300 group-hover:bg-[#0a0a0f] transform group-hover:-translate-y-1 group-active:translate-y-1">
                        <span className="absolute inset-0 bg-gradient-to-r from-elite-orange/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <span className="text-white font-heading font-black text-xl sm:text-2xl uppercase tracking-[0.2em] relative z-10 flex items-center gap-3 sm:gap-4 drop-shadow-lg group-hover:text-amber-300 transition-colors">
                            JOIN NOW <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                    </div>
                </Link>

                <div className="mt-12 flex gap-4 text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-semibold items-center">
                    <span><Zap size={14} className="inline mr-1 text-elite-orange" /> Open 6 AM - 10 PM</span>
                    <span>•</span>
                    <span><Zap size={14} className="inline mr-1 text-purple-500" /> Personal Training</span>
                </div>
            </motion.div>
        </section>
    )
}

/* =======================================
   HOME PAGE EXPORT
   ======================================= */
export default function Home() {
    useSEO({
        title: 'Best Premium Gym in Hinjewadi, Pune',
        description: 'The Elite Fitness Clubb - Hinjewadi\'s best premium gym. 6,000 sq. ft. boutique facility, expert trainers, ice bath recovery, personal coaching. Memberships from ₹3,000/month.',
        path: '/'
    })
    return (
        <PageWrapper>
            <Hero />
            <StatsBar />
            <PhotoMarquee />
            <AboutPreview />
            <Facilities />
            <MembershipPreview />
            <FranchiseCTA />
            <Testimonials />
            <FinalCTA />
        </PageWrapper>
    )
}
