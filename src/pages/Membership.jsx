import React, { useRef, useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import useSEO from '../hooks/useSEO'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Check, Star, Dumbbell, Snowflake, Apple, Users, Crown, Zap, ArrowRight, Shield, Sparkles, Gem } from 'lucide-react'

/* =======================================
   3D TILT WRAPPER (BOUTIQUE EDITION)
   ======================================= */
const TiltCardWrapper = ({ children, className, isPopular = false }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
    
    // Smooth Tilt
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
    
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "150%"])
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "150%"])

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                x.set((e.clientX - rect.left) / rect.width - 0.5)
                y.set((e.clientY - rect.top) / rect.height - 0.5)
            }}
            onMouseLeave={() => { x.set(0); y.set(0) }}
            className={`relative group/tiltcard perspective-1000 ${className}`}
        >
            {children}
            
            {/* Standard Glow (Consistent with rest of site) */}
            {isPopular && (
                <div className="absolute -inset-[2px] rounded-[32px] bg-elite-orange/20 blur-xl opacity-50 group-hover/tiltcard:opacity-100 transition-opacity pointer-events-none" />
            )}

            {/* Interactive Glare */}
            <motion.div 
                className="absolute inset-0 w-full h-full pointer-events-none z-[100] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/tiltcard:opacity-100 transition-opacity duration-300 rounded-[24px]"
                style={{ x: glareX, y: glareY, transform: "translateZ(50px)" }}
            />
        </motion.div>
    )
}

/* =======================================
   MEMBERSHIP CONTENT DATA (HUMANIZED)
   ======================================= */
const MEMBERSHIP_PLANS = [
    {
        name: "1 MONTH", price: "3,000", perMonth: "₹3,000 / month", tag: "STARTER", glow: false,
        desc: "Begin your journey with the elite standard. Experience our boutique sanctuary with zero long-term pressure.",
        features: [ "Total Gym Floor Access", "Premium Cardio Suite", "Steam & Ice Bath", "Initial Fitness Blueprint" ],
        more: [ "Locker Access", "Towel Service", "Mobile App Access" ]
    },
    {
        name: "3 MONTHS", price: "7,000", perMonth: "₹2,333 / month", tag: "COMMITMENT", glow: false,
        desc: "The perfect timeframe to build foundational habits and start seeing a true physical shift.",
        features: [ "Unlimited Facility Access", "Full Recovery Suite", "Zumba & Yoga Classes", "Customized Diet Chart" ],
        more: [ "1 Guest Pass / Month", "Body Composition Analysis", "Locker & Shower Access" ]
    },
    {
        name: "6 MONTHS", price: "10,000", perMonth: "₹1,667 / month", tag: "TRANSFORMATION", glow: true,
        desc: "Our gold standard. Ample time to witness a profound, unshakeable evolution of your body and mind.",
        features: [ "Priority Facility Access", "Unlimited Masterclasses", "Direct Nutrition Consult", "Personal Trainer Induction" ],
        more: [ "2 Guest Passes / Month", "Monthly Result Tracking", "Priority Workshop Booking", "Elite Merchandise Discount" ]
    },
    {
        name: "12 MONTHS", price: "14,000", perMonth: "₹1,167 / month", tag: "LEGACY MEMBERS", glow: false,
        desc: "The ultimate clubb pass. Lock in your elite lifestyle and become a permanent part of our performance circle.",
        features: [ "All-Access VIP Membership", "Total Recovery Sanctuary", "Full Body Analytics", "Inner Circle Privileges" ],
        more: [ "Unlimited Guest Passes", "Personal Locker Priority", "Exclusive Event Access", "Quarterly Lifestyle Review", "Founders Circle Status" ]
    }
]

/* =======================================
   MEMBERSHIP HERO
   ======================================= */
function MembershipHero() {
    return (
        <section className="relative pt-36 pb-8 sm:pb-12 px-4 overflow-hidden min-h-[45vh] flex flex-col justify-center items-center">
            {/* Background (Consistent with About/Home) */}
            <div className="absolute inset-0 z-0">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-25 grayscale brightness-90">
                    <source src="/asset/new/gym intro .mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/90 via-[#050508]/60 to-[#050508]" />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(233,111,73,0.1) 0%, transparent 70%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-elite-orange/10 border border-elite-orange/20 text-[10px] font-black tracking-[0.3em] text-elite-orange uppercase mb-8">
                        The Elite Lifestyle
                    </span>
                    <h1 className="text-5xl sm:text-7xl lg:text-9xl font-heading font-black leading-[0.85] tracking-tight text-white mb-10 uppercase">
                        START YOUR <br className="hidden lg:block"/>
                        <span className="gradient-text italic pr-4">JOURNEY</span>
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                        We don't just build gym memberships. We curate an elite performance sanctuary where your goals become the mission.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   MOBILE SWIPE DECK
   ======================================= */
const MobileMembershipDeck = () => {
    const [cards, setCards] = useState(MEMBERSHIP_PLANS);

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > 60) {
            setCards((prev) => {
                const newCards = [...prev];
                const frontCard = newCards.shift();
                newCards.push(frontCard);
                return newCards;
            });
        }
    };

    return (
        <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden lg:hidden">
            <AnimatePresence mode="popLayout">
                {cards.map((p, index) => {
                    const isFront = index === 0;
                    return (
                        <motion.div
                            key={p.name}
                            layout
                            initial={{ scale: 0.8, opacity: 0, y: 0 }}
                            animate={{
                                scale: 1 - index * 0.05,
                                y: index * 24 - 20,
                                zIndex: cards.length - index,
                                opacity: 1 - index * 0.25,
                                rotate: index === 0 ? 0 : index % 2 === 0 ? 3 : -3
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            drag={isFront ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={isFront ? handleDragEnd : undefined}
                            className={`absolute w-[88%] max-w-[360px] rounded-[2.5rem] glass-card-strong p-6 overflow-hidden ${isFront ? 'hover:shadow-[0_0_40px_rgba(233,111,73,0.3)]' : ''}`}
                            style={{ touchAction: 'none' }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className={`text-[9px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full border mb-6 uppercase ${p.glow ? 'bg-elite-orange/20 border-elite-orange/40 text-elite-orange' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                                    {p.tag}
                                </span>
                                <h3 className="text-2xl font-heading font-black tracking-tight text-white mb-2 uppercase">{p.name}</h3>
                                <div className="flex items-baseline gap-1 my-4 justify-center">
                                    <span className="text-xl text-elite-orange font-bold">₹</span>
                                    <span className={`text-5xl font-heading font-black tracking-tighter text-white ${p.glow ? 'text-glow' : ''}`}>{p.price}</span>
                                </div>
                                <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-6">{p.perMonth}</p>
                                <ul className="w-full space-y-3 mb-6 text-left">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-xs font-light text-gray-300">
                                            <Check size={14} className="text-elite-orange shrink-0" />
                                            <span className="leading-tight">{f}</span>
                                        </li>
                                    ))}
                                    <li className="pt-2 text-[10px] text-elite-orange font-bold uppercase tracking-widest border-t border-white/5 mt-2 flex items-center justify-between">
                                        Plus {p.more.length} More Perks <Sparkles size={10} />
                                    </li>
                                </ul>
                                <a href={`https://wa.me/918888161216?text=Hi! I want to join the ${p.name} plan.`} target="_blank" rel="noreferrer"
                                    className={`w-full py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 ${p.glow ? 'bg-elite-orange text-white shadow-xl shadow-orange-950/20' : 'bg-white/5 border border-white/10 text-white'}`}
                                >JOIN THE CLUBB <ArrowRight size={14} /></a>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none z-0">
                <span className="text-gray-600 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Swipe To Explore Passes &lt;—&gt;</span>
            </div>
        </div>
    );
};

/* =======================================
   PRICING SECTION
   ======================================= */
/* =======================================
   MEMBERSHIP CARD (DESKTOP)
   ======================================= */
const MembershipCard = ({ plan, index }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="h-full">
            <TiltCardWrapper isPopular={plan.glow} className="h-full">
                <div className={`glass-card-strong h-full p-1 relative overflow-hidden transition-all duration-500 ${plan.glow ? 'border-elite-orange/40 bg-elite-orange/[0.03]' : ''}`}>
                    
                    {/* Main Content */}
                    <div className="relative z-10 p-8 pt-12 flex flex-col items-center h-full" style={{ transformStyle: "preserve-3d" }}>
                        <div className={`text-[9px] font-black tracking-[0.3em] px-4 py-1.5 rounded-full border mb-10 ${plan.glow ? 'bg-elite-orange border-none text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-500'}`} style={{ transform: "translateZ(30px)" }}>{plan.tag}</div>
                        <h3 className="text-2xl font-heading font-black tracking-tight text-white/40 mb-2 uppercase" style={{ transform: "translateZ(20px)" }}>{plan.name}</h3>
                        <div className="flex items-baseline gap-1 my-8 justify-center" style={{ transform: "translateZ(60px)" }}>
                            <span className="text-xl text-elite-orange font-bold">₹</span>
                            <span className={`text-7xl font-heading font-black text-white leading-none ${plan.glow ? 'text-glow' : ''}`}>{plan.price}</span>
                        </div>
                        <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-12" style={{ transform: "translateZ(30px)" }}>{plan.perMonth}</p>
                        <ul className="w-full space-y-5 mb-14 text-left" style={{ transform: "translateZ(20px)" }}>
                            {plan.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-4 text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                                    <Check size={14} className="text-elite-orange" />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => setShowMore(true)}
                            className="relative z-20 mt-4 mb-8 text-[10px] text-elite-orange font-black tracking-[0.2em] uppercase flex items-center gap-2 hover:text-white transition-colors"
                            style={{ transform: "translateZ(50px)" }}
                        >
                            See More Benefits <Sparkles size={12} />
                        </button>

                        <a href={`https://wa.me/918888161216?text=Hi! I want to join the ${plan.name} plan.`} target="_blank" rel="noreferrer"
                            className={`relative z-20 w-full mt-auto py-5 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 ${plan.glow ? 'bg-white text-black hover:bg-elite-orange hover:text-white hover:border-elite-orange' : 'border border-white/10 text-white hover:bg-elite-orange hover:text-white hover:border-elite-orange shadow-xl'}`}
                            style={{ transform: "translateZ(80px)" }}
                        >JOIN THE CLUBB <ArrowRight size={16} /></a>
                    </div>

                    {/* Reveal Overlay (Luxury Perks) */}
                    <AnimatePresence>
                        {showMore && (
                            <motion.div 
                                initial={{ opacity: 0, y: "100%" }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute inset-0 z-[200] glass-card-strong border-none p-10 flex flex-col items-center justify-center text-center bg-[#050508]/95"
                            >
                                <button onClick={() => setShowMore(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                                    <Zap size={20} />
                                </button>
                                <h4 className="text-[10px] text-elite-orange font-black mb-8 tracking-[0.4em] uppercase">EVERY PASS INCLUDES</h4>
                                <ul className="w-full space-y-4 mb-10">
                                    {plan.more.map((m, k) => (
                                        <motion.li 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: k * 0.1 }}
                                            key={k} 
                                            className="text-xs text-white font-bold uppercase tracking-tight flex items-center gap-3 justify-center"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-elite-orange" /> {m}
                                        </motion.li>
                                    ))}
                                </ul>
                                <button onClick={() => setShowMore(false)} className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase border-b border-gray-800 pb-1">Return to Pass</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </TiltCardWrapper>
        </motion.div>
    );
};

/* =======================================
   PRICING SECTION
   ======================================= */
function PricingSection() {
    return (
        <section className="py-12 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="text-center mb-12 hidden lg:block">
                    <p className="text-elite-orange text-[10px] font-black tracking-[0.3em] uppercase mb-4">Pricing Architecture</p>
                    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black leading-none tracking-tight text-white uppercase">
                        CHOOSE YOUR <span className="gradient-text italic pr-4">PASS</span>
                    </h2>
                </div>

                {/* DESKTOP GRID */}
                <div className="hidden lg:grid grid-cols-4 gap-6 xl:gap-8 min-h-[700px]">
                    {MEMBERSHIP_PLANS.map((p, i) => (
                        <MembershipCard key={i} plan={p} index={i} />
                    ))}
                </div>

                {/* MOBILE DECK */}
                <MobileMembershipDeck />
            </div>
        </section>
    )
}

/* =======================================
   SERVICES / FACILITIES
   ======================================= */
function Facilities() {
    return (
        <section className="py-16 sm:py-24 px-4 relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-24">
                    <p className="text-elite-orange text-[10px] font-black tracking-[0.3em] uppercase mb-4">Elite Sanctuaries</p>
                    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black leading-none tracking-tight text-white uppercase">
                        PREMIUM <span className="gradient-text italic pr-4">AMENITIES</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 glass-card p-10 lg:p-14 group">
                        <div className="w-16 h-16 rounded-2xl bg-elite-orange/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                            <Dumbbell className="text-elite-orange" size={32} />
                        </div>
                        <h3 className="text-3xl font-heading font-black text-white mb-6 uppercase tracking-tight">THE LIFTING STUDIO</h3>
                        <p className="text-gray-400 font-light text-lg leading-relaxed max-w-xl">Curated performance machinery and Olympic-standard free weights. A 6,000 sq. ft. private studio built for those who prioritize results.</p>
                    </div>

                    <div className="md:col-span-1 glass-card p-10 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
                            <Snowflake size={24} />
                        </div>
                        <h3 className="text-xl font-heading font-black text-white mb-4 uppercase tracking-tight">RECOVERY SUITE</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Ice bath therapy and thermal steam sanctuaries to accelerate your biological reset post-effort.</p>
                    </div>

                    <div className="md:col-span-1 glass-card p-10 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
                            <Apple size={24} />
                        </div>
                        <h3 className="text-xl font-heading font-black text-white mb-4 uppercase tracking-tight">DIET MAPPING</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Comprehensive nutritional construction tailored specifically to your physical blueprint.</p>
                    </div>

                    <div className="md:col-span-2 glass-card p-10 lg:p-14 group flex flex-col lg:flex-row gap-10">
                        <div className="w-16 h-16 rounded-2xl bg-elite-orange/10 flex items-center justify-center shrink-0 group-hover:bg-elite-orange group-hover:text-white transition-all">
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-heading font-black text-white mb-4 uppercase tracking-tight">MASTERCLASS SESSIONS</h3>
                            <p className="text-gray-400 font-light text-lg leading-relaxed">Join high-intensity Zumba, Yoga, and group functional training protocols led by elite coaches.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* =======================================
   MEMBERSHIP PAGE EXPORT
   ======================================= */
export default function Membership() {
    useSEO({
        title: 'Gym Membership Plans',
        description: 'Choose your pass to The Elite Fitness Clubb. Memberships starting from ₹3,000/month with access to premium equipment, recovery suite, and expert coaching.',
        path: '/membership'
    })
    return (
        <PageWrapper>
            <MembershipHero />
            <PricingSection />
            <Facilities />
            {/* CTA */}
            <section className="py-24 sm:py-32 px-4 relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-elite-orange/10 rounded-full blur-[150px]" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-6xl sm:text-8xl lg:text-[10rem] font-heading font-black leading-[0.85] tracking-tight text-white mb-16 uppercase">
                        OWN YOUR <br/><span className="gradient-text italic pr-8">LEGACY.</span>
                    </h2>
                    <a href="https://wa.me/918888161216?text=Hi! I am ready to join." target="_blank" rel="noreferrer"
                       className="inline-flex items-center gap-4 px-16 py-7 bg-white text-black font-black text-[10px] tracking-[0.4em] rounded-full hover:bg-elite-orange hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] uppercase">
                        JOIN THE CLUBB <ArrowRight size={18} />
                    </a>
                </div>
            </section>
        </PageWrapper>
    )
}
