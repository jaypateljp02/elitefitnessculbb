import React, { useState, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, Phone, MapPin, Clock, Snowflake, Dumbbell, Users, Apple, ArrowRight, Zap, Crown, Star } from 'lucide-react'

/* =======================================
   MEMBERSHIP HERO
   ======================================= */
function MembershipHero() {
    return (
        <section className="relative pt-36 pb-20 px-4 overflow-hidden min-h-[60vh] flex flex-col justify-center">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/asset/new/20260404_130446.webp"
                    className="w-full h-full object-cover opacity-30 scale-105"
                    style={{ willChange: 'transform' }}
                >
                    <source src="/asset/new/gym intro .mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050508]" />
                <div className="absolute inset-0 bg-gradient-to-r from-elite-orange/10 to-purple-900/10 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center mt-10">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-elite-orange/10 border border-elite-orange/20 text-xs font-bold tracking-[0.2em] text-elite-orange uppercase mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(233,111,73,0.3)]">
                        JOIN THE INNER CIRCLE
                    </span>
                    <h1 className="text-5xl sm:text-7xl xl:text-8xl font-heading font-black mb-6 uppercase leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                        Design Your <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-elite-orange to-purple-400">Elite Regimen</span>
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Step entirely out of the ordinary. Every membership tier grants you carte blanche to our world-class machinery, sanctuary spaces, and community.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Ribbon */}
            <div className="absolute bottom-0 left-0 right-0 border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden z-20 py-3 flex">
                <div className="animate-marquee-fast whitespace-nowrap flex gap-12 items-center text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-gray-400">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12 shrink-0">
                            <span>Unlimited Access</span> <Star size={10} className="text-elite-orange" />
                            <span>Premium Recovery</span> <Star size={10} className="text-elite-orange" />
                            <span>Expert Staff</span> <Star size={10} className="text-elite-orange" />
                            <span>Café & Nutrition</span> <Star size={10} className="text-elite-orange" />
                        </div>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marqueeFast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee-fast { animation: marqueeFast 25s linear infinite; }
            `}} />
        </section>
    )
}

/* =======================================
   PRICING BENTO GRID (WOW CONCEPT 3)
   ======================================= */
function PricingSection() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const sectionRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <section 
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="py-20 px-4 relative z-20 bg-[#050508] overflow-hidden"
        >
            {/* The underlying fluid nebula that tracks mouse */}
            <motion.div 
                className="absolute w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full pointer-events-none opacity-40 blur-[100px] sm:blur-[140px] transition-opacity duration-500 hidden md:block"
                animate={{
                    x: mousePos.x - 450,
                    y: mousePos.y - 450,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
                style={{
                    background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(233,111,73,0.4) 40%, transparent 70%)'
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 12 MONTHS - ELITE (Span 2) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 relative rounded-[32px] p-[1px] group"
                    >
                        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500 via-purple-600 to-elite-orange opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                        <div className="relative h-full rounded-[31px] p-8 sm:p-12 flex flex-col justify-between overflow-hidden border border-white/5"
                            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(30px)' }}
                        >
                            <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/20 blur-[100px] pointer-events-none group-hover:bg-purple-500/40 transition-all duration-700" />
                            
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                            BEST VALUE
                                        </span>
                                        <Crown className="text-purple-400 w-5 h-5" />
                                    </div>
                                    <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-widest uppercase mb-2 text-white">12 MONTHS</h3>
                                    <p className="text-gray-300 font-light max-w-sm text-sm sm:text-base leading-relaxed">The ultimate elite experience. Uninterrupted access to everything we offer at our best monthly rate.</p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <div className="flex items-baseline gap-1 sm:justify-end">
                                        <span className="text-lg text-gray-400">₹</span>
                                        <span className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-elite-orange drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                            14,000
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 tracking-wider uppercase">Only ₹1,167 / month</p>
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 mt-auto">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    {['Unlimited Equipment Access', 'Ice Bath & Steam Room', 'Expert Diet Targeting', 'Group Yoga & Zumba'].map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-gray-200 font-light">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-purple-300" />
                                            </div>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="https://wa.me/918888161216?text=Hi!%20I'm%20interested%20in%20the%2012%20Months%20Elite%20Plan%20at%20%E2%82%B914,000."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full sm:w-auto shrink-0 px-8 py-5 rounded-2xl font-bold text-xs tracking-widest uppercase text-white btn-liquid text-center hover:scale-105 transition-transform"
                                    style={{ boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}
                                >
                                    Join Elite <ArrowRight className="inline ml-2" size={14} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* 6 MONTHS - POPULAR (Span 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1 relative rounded-[32px] p-[1px] group lg:mb-6"
                    >
                        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-elite-orange via-amber-400 to-elite-orange opacity-70 animate-pulse-glow" />
                        <div className="relative h-full rounded-[31px] p-8 flex flex-col border border-white/5"
                            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(30px)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-elite-orange/5 to-transparent rounded-[31px] pointer-events-none" />
                            
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-elite-orange/20 text-elite-orange border border-elite-orange/30">
                                    POPULAR
                                </span>
                                <Star className="text-elite-orange w-5 h-5 fill-elite-orange" />
                            </div>

                            <h3 className="text-3xl font-heading font-black tracking-widest uppercase mb-6 text-white relative z-10">6 MONTHS</h3>
                            
                            <div className="mb-8 relative z-10">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg text-gray-400">₹</span>
                                    <span className="text-5xl font-heading font-black text-white text-glow">
                                        10,000
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 tracking-wider uppercase">₹1,667 / month</p>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8 relative z-10">
                                {['Core Gym Access', 'Ice Bath Recovery', 'Nutrition Base'].map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-gray-200 font-light">
                                        <div className="w-5 h-5 rounded-full bg-elite-orange/20 border border-elite-orange/40 flex items-center justify-center shrink-0">
                                            <Check size={10} className="text-elite-orange" />
                                        </div>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://wa.me/918888161216?text=Hi!%20I'm%20interested%20in%20the%206%20Months%20Plan%20at%20%E2%82%B910,000."
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all relative z-10 bg-gradient-to-r from-elite-orange to-amber-400 text-white shadow-[0_0_20px_rgba(233,111,73,0.3)] hover:shadow-[0_0_30px_rgba(233,111,73,0.5)] hover:-translate-y-1"
                            >
                                <Zap size={14} /> GET STARTED
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM ROW (3 Mo & 1 Mo) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* 3 MONTHS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-blue-500/40 border border-white/5 rounded-3xl"
                        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(30px)' }}
                    >
                        <div>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 inline-block">STARTER</span>
                            <h3 className="text-2xl font-heading font-black tracking-widest uppercase text-white mb-2">3 MONTHS</h3>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-sm text-gray-500">₹</span>
                                <span className="text-3xl font-heading font-black text-gray-200">7,000</span>
                            </div>
                            <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-6">₹2,333 / month</p>
                            
                            <ul className="space-y-3 mb-6 relative z-10">
                                {['Unlimited Gym Access', 'Cardio & Free Weights', 'Ice Bath & Recovery', 'Diet Guidance', 'Group Classes'].map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-200 font-light">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0 mt-[1px]">
                                            <Check size={10} className="text-blue-300" />
                                        </div>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a
                            href="https://wa.me/918888161216?text=Hi!%20I'm%20interested%20in%20the%203%20Months%20Plan%20at%20%E2%82%B97,000."
                            target="_blank"
                            rel="noreferrer"
                            className="relative z-10 w-full px-8 py-4 rounded-xl font-bold text-[10px] tracking-widest uppercase flex items-center justify-center bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-white text-gray-300 transition-all mt-4"
                        >
                            ENQUIRE PLAN
                        </a>
                    </motion.div>

                    {/* 1 MONTH */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-gray-500/40 border border-white/5 rounded-3xl"
                        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(30px)' }}
                    >
                        <div>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 mb-4 inline-block">TRY IT OUT</span>
                            <h3 className="text-2xl font-heading font-black tracking-widest uppercase text-white mb-2">1 MONTH</h3>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-sm text-gray-500">₹</span>
                                <span className="text-3xl font-heading font-black text-gray-200">3,000</span>
                            </div>
                            <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-6">₹3,000 / month</p>
                            
                            <ul className="space-y-3 mb-6 relative z-10">
                                {['Unlimited Gym Access', 'Cardio & Free Weights', 'Ice Bath & Recovery', 'Diet Guidance', 'Group Classes'].map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-200 font-light">
                                        <div className="w-5 h-5 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0 mt-[1px]">
                                            <Check size={10} className="text-gray-300" />
                                        </div>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a
                            href="https://wa.me/918888161216?text=Hi!%20I'm%20interested%20in%20the%201%20Month%20Plan%20at%20%E2%82%B93,000."
                            target="_blank"
                            rel="noreferrer"
                            className="relative z-10 w-full px-8 py-4 rounded-xl font-bold text-[10px] tracking-widest uppercase flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gray-500/40 hover:text-white text-gray-300 transition-all mt-4"
                        >
                            ENQUIRE PLAN
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* =======================================
   AMENITIES SHOWCASE BENTO
   ======================================= */
function Amenities() {
    return (
        <section className="py-24 px-4 relative border-t border-white/5 noise-bg" style={{ background: 'radial-gradient(circle at 50% 100%, rgba(233,111,73,0.05) 0%, transparent 60%)' }}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <SectionHeading subtitle="WHAT'S INCLUDED" title={<>PREMIUM <span className="gradient-text">FEATURES</span></>} />
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto font-light leading-relaxed">Every membership unlocks our entire suite of world-class facilities. We don't upcharge for the true elite experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="md:col-span-2 relative glass-card-strong p-8 sm:p-12 overflow-hidden group hover:border-elite-orange/40 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-elite-orange/10 blur-[60px] pointer-events-none group-hover:bg-elite-orange/20 transition-all duration-700" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-elite-orange to-amber-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(233,111,73,0.4)] group-hover:scale-110 transition-transform">
                                <Dumbbell className="text-white" size={32} />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4">Unlimited Gym Floor Access</h3>
                            <p className="text-gray-400 font-light max-w-lg text-sm sm:text-base leading-relaxed">Train freely from 6 AM to 10 PM. Access cutting-edge imported cardio units, pure free weights, and dedicated lifting platforms without restrictions.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="md:col-span-1 relative glass-card-strong p-8 overflow-hidden group hover:border-blue-400/40 transition-colors"
                    >
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[40px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Snowflake className="text-blue-400" size={24} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-3 tracking-wide">Recovery Suite</h3>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">Ice Bath, Steam Room & Sun Bath. Complete tissue recovery post-hypertrophy.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="md:col-span-1 relative glass-card-strong p-8 overflow-hidden group hover:border-green-400/40 transition-colors"
                    >
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-green-500/10 blur-[40px] -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-green-500/20 transition-all duration-700" />
                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Apple className="text-green-400" size={24} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-3 tracking-wide">Diet Base</h3>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">Dedicated nutrition counters and customized diet charts built exactly for your body goals.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="md:col-span-2 relative glass-card-strong p-8 sm:p-10 overflow-hidden group hover:border-purple-400/40 transition-colors flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Users className="text-purple-400" size={32} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-3">Group Classes & Community</h3>
                            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto sm:mx-0">Your membership automatically enrolls you in high-intensity Zumba, Yoga, and group functional training sessions led by our master trainers.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* =======================================
   TRAINER TIERS
   ======================================= */
function TrainerTiers() {
    const tiers = [
        {
            name: 'JUNIOR TRAINERS',
            desc: 'Certified fitness professionals for guided workouts and form correction. Perfect for beginners starting their journey.',
            icon: Dumbbell,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
        },
        {
            name: 'ADVANCED TRAINERS',
            desc: 'Experienced coaches specializing in body transformations, strength training, and sport-specific conditioning.',
            icon: Zap,
            color: 'text-elite-orange',
            bg: 'bg-elite-orange/10 border-elite-orange/20',
        },
        {
            name: 'PREMIUM TRAINERS',
            desc: 'Elite-level coaches with championship credentials. Custom programs, nutrition planning, and 1-on-1 dedicated sessions.',
            icon: Crown,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10 border-purple-500/20',
        },
    ]

    return (
        <section className="py-24 px-4 relative noise-bg border-t border-white/5 bg-[#050508]" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(233,111,73,0.03) 0%, #050508 70%)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <SectionHeading subtitle="PERSONAL TRAINING" title={<>CHOOSE YOUR <span className="gradient-text">TRAINER LEVEL</span></>} />
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">Every membership includes access to group sessions. Personal training packages are separately available to catapult your progress.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-white/20 transition-all group relative overflow-hidden backdrop-blur-3xl"
                        >
                            <div className={`absolute -bottom-10 -right-10 w-48 h-48 blur-[60px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 ${tier.bg.split(' ')[0]}`} />
                            <div className={`w-14 h-14 rounded-2xl ${tier.bg} border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <tier.icon className={tier.color} size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-black text-white mb-4 tracking-wider uppercase relative z-10">{tier.name}</h3>
                            <p className="text-gray-400 font-light leading-relaxed text-[13px] sm:text-sm mb-8 relative z-10">{tier.desc}</p>
                            <a
                                href="https://wa.me/918888161216?text=Hi!%20I'd%20like%20to%20know%20more%20about%20personal%20training%20packages."
                                target="_blank"
                                rel="noreferrer"
                                className={`mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors relative z-10 ${tier.color} hover:brightness-150`}
                            >
                                ENQUIRE NOW <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   FINAL CTA
   ======================================= */
function MembershipCTA() {
    return (
        <section className="py-20 px-4 relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-elite-orange/10 via-transparent to-purple-900/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-elite-orange/10 rounded-full blur-[150px] cta-pulse-glow" />
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6 uppercase">
                    Ready to <span className="gradient-text text-glow">Transform?</span>
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-light">
                    Stop thinking. Start training. Your body will thank you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://wa.me/918888161216?text=Hi!%20I%20want%20to%20join%20The%20Elite%20Fitness%20Clubb."
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-elite-orange to-amber-400 rounded-xl text-base font-bold btn-glow tracking-widest uppercase text-white"
                    >
                        JOIN NOW <ArrowRight size={18} />
                    </a>
                </div>
            </motion.div>
        </section>
    )
}

/* =======================================
   MEMBERSHIP PAGE EXPORT
   ======================================= */
export default function Membership() {
    return (
        <PageWrapper>
            <MembershipHero />
            <PricingSection />
            <Amenities />
            <TrainerTiers />
            <MembershipCTA />
        </PageWrapper>
    )
}
