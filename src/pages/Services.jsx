import PageWrapper from '../components/PageWrapper'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Dumbbell, Snowflake, Zap, Leaf, ArrowRight, Sparkles, MapPin, Maximize2, Check } from 'lucide-react'
import { useState } from 'react'

/* =======================================
   ZONE DATA
   ======================================= */
const zones = [
    {
        id: 'strength',
        zone: 'SERVICE 01',
        zoneNumber: '01',
        name: 'ELITE PERSONAL COACHING',
        tagline: 'YOUR BODY. OUR BLUEPRINT.',
        desc: "We don't rent you machines; we engineer your results. Work 1-on-1 with Level 3 certified experts in our private studio. We handle the programming, posture correction, and progressive overload—you just show up and execute.",
        image: '/asset/3-1.webp',
        Icon: Dumbbell,
        features: ['1-on-1 Form & Posture Correction', 'Bespoke Strength & Hypertrophy Blueprints', 'Private, Uncrowded Training Floor'],
        subTags: ['Hypertrophy', 'Powerlifting', 'Functional', 'Rehab'],
        stat: { area: '1-ON-1 FOCUS', equipment: 'ZERO WAIT TIME' },
        ctaLabel: 'APPLY FOR ELITE COACHING',
        waLink: 'https://wa.me/918888161216?text=Hi%20Elite,%20I%20want%20to%20apply%20for%201-on-1%20Elite%20Personal%20Coaching.',
        color: 'rgba(233,111,73,0.5)',
        borderGlow: true, // Make the highest-margin service glow
        tooltip: null,
    },
    {
        id: 'recovery',
        zone: 'SERVICE 02',
        zoneNumber: '02',
        name: 'THE SCIENCE OF RECOVERY',
        tagline: 'HEAL FASTER. PERFORM HARDER.',
        desc: "Recovery isn't a luxury; it's a protocol. Our dedicated recovery suite features ice bath circuits to reduce inflammation, steam and sun baths, and infrared saunas to accelerate cellular repair. Train more, hurt less.",
        image: '/asset/11.webp',
        Icon: Snowflake,
        features: ['Guided Ice Bath & Cold Plunge Protocols', 'Steam Bath & Sun Bath Therapy', 'Infrared Sauna for Muscle Repair', 'Mobility & Assisted Stretching Therapy'],
        subTags: ['Cold Therapy', 'Muscle Repair', 'Flexibility', 'Bio-Hacking'],
        stat: { area: 'RECOVERY SUITE', equipment: 'SORENESS -40%' },
        ctaLabel: 'BOOK A RECOVERY SESSION',
        waLink: 'https://wa.me/918888161216?text=Hi,%20tell%20me%20about%20your%20Recovery%20and%20Ice%20Bath%20sessions.',
        color: 'rgba(56,189,248,0.5)',
        borderGlow: false,
        tooltip: null,
    },
    {
        id: 'transform',
        zone: 'SERVICE 03',
        zoneNumber: '03',
        name: 'WEIGHT GAIN & LOSS MASTERY',
        tagline: "DON'T JUST SWEAT. TRANSFORM.",
        desc: "We sell transformation, not treadmill access. Science-backed HIIT for fat-burn conditioning, alongside specialized hypertrophy regimens for clean weight gain, designed to maximize your desired physiological outcome.",
        image: '/asset/4-1.webp',
        Icon: Zap,
        features: ['Science-Backed HIIT Programming', 'Targeted Weight Gain & Muscle Building', 'Diet Food Cafe On-Site', 'Nutrition & Macro Guidance Integration'],
        subTags: ['HIIT', 'Fat Burn', 'Weight Gain', 'Metabolism'],
        stat: { area: 'CONDITIONING & STRENGTH', equipment: 'HIGH INTENSITY' },
        ctaLabel: 'START MY TRANSFORMATION JOURNEY',
        waLink: "https://wa.me/918888161216?text=Hi%20Elite!%20I%20want%20to%20start%20my%20Fat%20Loss%20or%20Weight%20Gain%20journey.",
        color: 'rgba(233,111,73,0.5)',
        borderGlow: false, // Turned off here to keep focus on Coaching
        tooltip: null,
    },
    {
        id: 'mind',
        zone: 'SERVICE 04',
        zoneNumber: '04',
        name: 'BOUTIQUE GROUP FITNESS & EVENTS',
        tagline: 'HIGH ENERGY. ELITE COMMUNITY.',
        desc: "Ditch the chaotic aerobics classes. Join our intentionally capped group sessions, monthly fitness competitions, and exclusive corporate tie-up events that provide incredible team-building and wellness tax benefits.",
        image: '/asset/16.webp',
        Icon: Leaf,
        features: ['Monthly Fitness Competitions', 'Corporate Wellness Tie-ups (Tax Benefits)', 'Hatha & Power Yoga Sessions', 'Zumba & High-Energy Cardio'],
        subTags: ['Competitions', 'Corporate Perks', 'Mindfulness', 'Community'],
        stat: { area: 'PRIVATE STUDIO + EVENTS', equipment: 'CAPPED SIZES' },
        ctaLabel: 'JOIN A GROUP CLASS OR EVENT',
        waLink: 'https://wa.me/918888161216?text=Hi,%20please%20share%20the%20schedule%20for%20your%20Boutique%20Group%20Classes%20and%20Events.',
        color: 'rgba(52,211,153,0.4)',
        borderGlow: false,
        tooltip: {
            title: 'CLASS SCHEDULE',
            rows: [
                { day: 'Mon / Wed / Fri', time: '6 AM — Hatha Yoga' },
                { day: 'Tue / Thu / Sat', time: '7 AM — Power Yoga' },
                { day: 'Mon–Sat', time: '6:30 PM — Zumba' },
                { day: 'Daily', time: '8 PM — Meditation' },
                { day: 'Last Saturday', time: 'Monthly Competition' },
            ]
        },
    },
]

/* =======================================
   ZONE SECTION
   ======================================= */
function ZoneSection({ zone, index }) {
    const isEven = index % 2 === 0
    const [showTooltip, setShowTooltip] = useState(false)
    const IconEl = zone.Icon

    return (
        <section className="relative py-12 md:py-20 px-4 overflow-hidden border-b border-white/5">
            {/* Layer 0: Giant Zone Number */}
            <div
                className="absolute inset-0 flex items-center pointer-events-none select-none z-0 opacity-[0.03]"
                style={{ justifyContent: isEven ? 'flex-start' : 'flex-end' }}
            >
                <span className="text-[160px] sm:text-[240px] lg:text-[320px] font-heading font-black italic leading-none" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)', WebkitTextFillColor: 'transparent' }}>
                    {zone.zoneNumber}
                </span>
            </div>

            <div className={`relative z-10 max-w-7xl mx-auto w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-center`}>

                {/* IMAGE SIDE */}
                <div
                    className={`w-full lg:w-1/2 relative rounded-3xl overflow-hidden group ${zone.borderGlow ? 'p-[2px]' : ''}`}
                    style={zone.borderGlow ? {
                        background: 'linear-gradient(135deg, #e96f49, #e96f49, #F472B6, #e96f49)',
                        backgroundSize: '400% 400%',
                        animation: 'liquidSwirl 4s ease infinite',
                    } : {}}
                >
                    <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <img
                            src={zone.image}
                            alt={zone.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        {/* Zone Stats Card */}
                        <div
                            className="absolute bottom-3 left-3 right-3 sm:right-auto flex items-center gap-2 px-3 py-2 rounded-xl border border-white/15 text-[9px] font-black tracking-[0.15em] text-[#E0E0E0] uppercase"
                            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}
                        >
                            <MapPin size={12} className="text-purple-400 shrink-0" />
                            <span>{zone.stat.area}</span>
                            <span className="text-gray-500 ml-auto hidden sm:block">{zone.stat.equipment}</span>
                        </div>
                    </div>
                </div>

                {/* CONTENT SIDE */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">

                    {/* Icon + Zone Label */}
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-elite-orange/40" style={{ background: 'linear-gradient(135deg, rgba(233,111,73,0.15), rgba(233,111,73,0.1))', boxShadow: '0 0 20px rgba(233,111,73,0.2)' }}>
                            <IconEl size={26} className="text-purple-400" />
                        </div>
                        <div>
                            <span className="text-[9px] font-black tracking-[0.3em] text-gray-500 uppercase block">{zone.zone}</span>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black uppercase tracking-tight gradient-text">{zone.name}</h2>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-base sm:text-lg font-heading font-bold text-[#E0E0E0] italic mb-3 tracking-wide">{zone.tagline}</p>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed mb-6 text-sm font-light max-w-lg">{zone.desc}</p>

                    {/* Feature List */}
                    <div className="flex flex-col gap-2.5 mb-5">
                        {zone.features.map((f, j) => (
                            <div key={j} className="flex items-center gap-3 text-sm text-[#E0E0E0] font-light">
                                <div className="w-4 h-4 rounded-full bg-elite-orange/20 border border-elite-orange/40 flex items-center justify-center shrink-0" style={{ boxShadow: '0 0 6px rgba(233,111,73,0.3)' }}>
                                    <Check size={10} className="text-purple-400" />
                                </div>
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Sub Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {zone.subTags.map((tag, k) => (
                            <span key={k} className="px-2.5 py-1 rounded-md text-[8px] font-bold uppercase tracking-[0.1em] text-gray-500 border border-white/10 bg-white/5 hover:text-[#E0E0E0] hover:border-elite-orange/30 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>


                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={zone.waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-elite-orange to-amber-400 rounded-xl text-[10px] font-bold tracking-widest uppercase btn-glow transition-all text-center"
                        >
                            {zone.ctaLabel} <ArrowRight size={14} />
                        </a>
                        <Link
                            to="/virtual-tour"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-white/10 rounded-xl text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-elite-orange hover:border-elite-orange/30 transition-all"
                        >
                            <Maximize2 size={12} /> VIEW IN 360
                        </Link>
                    </div>
                </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
                <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
                    style={{ background: zone.color, top: '30%', left: isEven ? '-5%' : '65%' }}
                />
            </div>
        </section>
    )
}

/* =======================================
   MAIN PAGE
   ======================================= */
export default function Services() {
    return (
        <PageWrapper>
            {/* Hero */}
            <section className="relative pt-36 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-elite-orange/10 via-transparent to-transparent" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="tag-elite mb-6 inline-block">WHAT WE DO</span>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black mb-6 uppercase">
                            ENGINEERED FOR YOUR <span className="gradient-text text-glow">TRANSFORMATION</span>
                        </h1>
                        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
                            6,000 sq. ft. of world-class facilities, powered by expert coaching.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Zones */}
            {zones.map((zone, i) => (
                <ZoneSection key={zone.id} zone={zone} index={i} />
            ))}

            {/* Final CTA */}
            <section className="py-24 px-4 mesh-gradient-3 relative noise-bg border-t border-white/5">
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-5xl font-heading font-black mb-5 uppercase">
                        READY TO <span className="gradient-text">TRANSFORM?</span>
                    </h2>
                    <p className="text-gray-400 text-base mb-8 font-light">Start your journey with a free consultation.</p>
                    <a href="https://wa.me/918888161216?text=Hi%20Elite!%20I%20want%20to%20book%20a%20free%20consultation." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-elite-orange to-amber-400 rounded-full text-sm font-bold btn-glow tracking-widest uppercase">
                        <Sparkles size={18} /> BOOK FREE CONSULTATION
                    </a>
                </div>
            </section>
        </PageWrapper>
    )
}
