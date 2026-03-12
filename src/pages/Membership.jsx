import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Check, Send } from 'lucide-react'
import HolographicCard, { AnimatedCounter } from '../components/PricingCard'



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
            { text: 'Group Classes', ok: false },
            { text: 'Personal Trainer', ok: false },
            { text: 'Diet Consultation', ok: false },
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
            { text: 'Protein Station', ok: true },
            { text: 'Unlimited Group Classes', ok: true },
            { text: 'Monthly Diet Consult', ok: true },
            { text: 'Sauna Access', ok: true },
            { text: 'Personal Trainer', ok: false },
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
            { text: 'Custom Nutrition Plan', ok: true },
            { text: 'Monthly Body Analysis', ok: true },
            { text: 'Guest Passes (2/month)', ok: true },
        ],
        popular: false,
        isElite: true,
    },
]

// Comparison Grid Data
const comparisonFeatures = [
    { name: 'Strength & Cardio Floor', starter: true, premium: true, elite: true, image: '/asset/2-2.png' },
    { name: 'Group Classes (Yoga, Zumba)', starter: false, premium: true, elite: true, image: '/asset/9-1.png' },
    { name: 'Diet & Nutrition Consult', starter: false, premium: true, elite: true, image: '/asset/Cafe Wall image 2.jpeg' },
    { name: 'Personal Trainer Sessions', starter: false, premium: false, elite: true, image: '/asset/8.png' },
    { name: 'Ice Bath Recovery Zone', starter: false, premium: false, elite: true, image: '/asset/11.png' },
]


/* =======================================
   FEATURE COMPARISON GRID (INTERACTIVE)
   ======================================= */
function ComparisonGrid() {
    const [hoveredRow, setHoveredRow] = useState(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    return (
        <section className="py-24 px-4 relative max-w-5xl mx-auto" onMouseMove={handleMouseMove}>
            <SectionHeading subtitle="COMPARE" title={<>ELEVATE YOUR <span className="gradient-text">POTENTIAL</span></>} />

            <div className="mt-16 w-full overflow-x-auto pb-8">
                <table className="w-full min-w-[600px] text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 text-xs font-black tracking-widest text-gray-500 uppercase border-b border-white/10 w-2/5">Tier Benefits</th>
                            <th className="p-4 text-xs font-black tracking-widest text-[#E0E0E0] uppercase border-b border-white/10 text-center">Starter</th>
                            <th className="p-4 text-xs font-black tracking-widest text-elite-pink uppercase border-b border-white/10 text-center relative glow-pink">Premium</th>
                            <th className="p-4 text-xs font-black tracking-widest text-elite-purple uppercase border-b border-white/10 text-center glow-purple">Elite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFeatures.map((feat, i) => (
                            <tr
                                key={i}
                                className="group cursor-pointer transition-colors duration-300 hover:bg-elite-purple/5 border-b border-white/5"
                                onMouseEnter={() => setHoveredRow(i)}
                                onMouseLeave={() => setHoveredRow(null)}
                            >
                                <td className={`p-4 text-sm font-medium tracking-wide transition-all duration-300 ${hoveredRow === i ? 'text-white translate-x-2' : 'text-gray-400'}`}>
                                    {feat.name}
                                </td>
                                <td className="p-4 text-center">
                                    {feat.starter ? <Check size={18} className={`mx-auto transition-all ${hoveredRow === i ? 'text-elite-pink' : 'text-gray-500'}`} /> : <span className="text-gray-700">-</span>}
                                </td>
                                <td className="p-4 text-center bg-elite-pink/5">
                                    {feat.premium ? <Check size={18} className={`mx-auto transition-all ${hoveredRow === i ? 'text-elite-pink drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'text-gray-400'}`} /> : <span className="text-gray-700">-</span>}
                                </td>
                                <td className="p-4 text-center">
                                    {feat.elite ? <Check size={18} className={`mx-auto transition-all ${hoveredRow === i ? 'text-elite-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' : 'text-gray-500'}`} /> : <span className="text-gray-700">-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Floating Frosted Tooltip */}
            <AnimatePresence>
                {hoveredRow !== null && window.innerWidth > 768 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed pointer-events-none z-50 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/20 p-1"
                        style={{
                            left: mousePos.x + 20,
                            top: mousePos.y + 20,
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(15px) saturate(1.5)',
                            width: 250,
                            height: 150
                        }}
                    >
                        <div className="w-full h-full rounded-xl overflow-hidden bg-black relative">
                            <motion.img
                                key={hoveredRow}
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                animate={{ opacity: 0.8, filter: 'blur(0px)' }}
                                src={comparisonFeatures[hoveredRow].image}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-elite-purple/40 mix-blend-overlay" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

/* =======================================
   FOMO MARQUEE (Social Proof)
   ======================================= */
function FomoMarquee() {
    const members = [
        "Arjun K. just committed to ELITE | Hinjewadi",
        "Priya S. upgraded to PREMIUM | Baner",
        "Rahul D. started his journey | Hinjewadi",
        "Sneha J. joined the ELITE | Wakad",
        "Amit T. committed to ELITE | Hinjewadi",
        "Vikram M. upgraded to PREMIUM | Pimple Saudagar",
        "Neha P. just committed to ELITE | Baner",
        "Rohan B. started his journey | Wakad",
        "Anjali R. joined the PREMIUM | Hinjewadi",
        "Karan V. upgraded to ELITE | Aundh",
        "Siddharth L. committed to ELITE | Baner",
        "Pooja M. started her journey | Hinjewadi Phase 2",
        "Gaurav S. joined the ELITE | Wakad",
        "Aditi C. upgraded to PREMIUM | Balewadi",
        "Mayur K. just committed to ELITE | Hinjewadi"
    ]
    return (
        <div className="w-full overflow-hidden bg-black/40 border-y border-white/5 py-3 relative z-10 flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050508] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050508] to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-12 text-[10px] font-bold tracking-[0.2em] text-[#E0E0E0] uppercase opacity-60 w-max"
                animate={{ x: [0, -4000] }}
                transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
            >
                {/* Double the array for seamless endless loop */}
                {[...members, ...members, ...members, ...members].map((m, i) => (
                    <span key={i} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                        {m}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

/* =======================================
   MAIN MEMBERSHIP PAGE
   ======================================= */
export default function Membership() {
    const [isAnnual, setIsAnnual] = useState(false)

    return (
        <PageWrapper>
            {/* Holographic Interactive Hero */}
            <section className="relative pt-36 pb-16 px-4">
                <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl sm:text-7xl font-heading font-black mb-6 uppercase">
                            INVEST IN <span className="gradient-text">YOURSELF</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto font-light mb-12">Select your tier to access India's most advanced fitness infrastructure.</p>

                        {/* SPRING TOGGLE */}
                        <div className="flex flex-col items-center justify-center relative">
                            <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-full border border-white/10 backdrop-blur-md relative z-10 w-fit">
                                <button onClick={() => setIsAnnual(false)} className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors z-10 ${!isAnnual ? 'text-[#E0E0E0]' : 'text-gray-500'}`}>
                                    Monthly
                                    {!isAnnual && <motion.div layoutId="activeTogglePill" className="absolute inset-0 bg-elite-purple/20 border border-elite-purple/40 rounded-full -z-10 shadow-[0_0_20px_rgba(139,92,246,0.3)]" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                                </button>
                                <button onClick={() => setIsAnnual(true)} className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors z-10 ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                                    Annually
                                    {isAnnual && <motion.div layoutId="activeTogglePill" className="absolute inset-0 bg-elite-purple/20 border border-elite-purple/40 rounded-full -z-10 shadow-[0_0_20px_rgba(139,92,246,0.3)]" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                                </button>
                            </div>

                            {/* Reward Badge Bubble */}
                            <AnimatePresence>
                                {isAnnual && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.1 }}
                                        className="absolute -right-4 sm:-right-8 -top-8 px-3 py-1 bg-emerald-500/20 border border-emerald-400/50 rounded-lg text-emerald-400 text-[10px] font-black tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.4)] backdrop-blur-md z-20 transform rotate-12"
                                    >
                                        SAVE 20%
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* Holographic Cards Grid */}
                <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 items-stretch perspective-[2000px]">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                        >
                            <HolographicCard plan={plan} isAnnual={isAnnual} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <ComparisonGrid />
            <FomoMarquee />

            {/* Quick Contact CTA Footer */}
            <section className="py-24 px-4 relative z-10 text-center">
                <SectionHeading subtitle="STILL UNSURE?" title={<>TALK TO AN <span className="gradient-text">EXPERT</span></>} center={true} />
                <motion.a
                    href="https://wa.me/918888161216?text=Hi,%20I%20need%20more%20information%20about%20Elite%20Fitness%20Clubb.%20Please%20call%20me%20back."
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-block mt-8 px-10 py-4 border border-elite-pink/30 hover:bg-elite-pink/10 rounded-full text-elite-pink font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                    REQUEST A CALLBACK
                </motion.a>
            </section>

        </PageWrapper>
    )
}
