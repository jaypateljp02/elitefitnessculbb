import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { TrendingUp, Shield, RefreshCw, Megaphone, IndianRupee, Store, Crown, ArrowRight, Building, CheckCircle2 } from 'lucide-react'

// Custom hook to detect touch devices
function useIsTouch() {
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        setTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, [])
    return touch
}

/* =======================================
   HERO — SPLIT SCREEN & 3D BLUEPRINT
   ======================================= */
function FranchiseHero() {
    const isTouch = useIsTouch()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [gyroPos, setGyroPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
        if (isTouch) return
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        })
    }

    // Device orientation for gyro-tilt on mobile
    useEffect(() => {
        if (!isTouch || !window.DeviceOrientationEvent) return
        const handleOrientation = (e) => {
            const beta = Math.min(Math.max((e.beta - 45) / 45, -1), 1) || 0 // Front-to-back tilt (-1 to 1)
            const gamma = Math.min(Math.max(e.gamma / 45, -1), 1) || 0 // Left-to-right tilt (-1 to 1)
            setGyroPos({ x: gamma, y: beta })
        }
        window.addEventListener('deviceorientation', handleOrientation)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
    }, [isTouch])

    const tiltX = isTouch ? gyroPos.x * 15 : mousePos.x * 15
    const tiltY = isTouch ? gyroPos.y * -15 : mousePos.y * -15

    return (
        <section
            className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden flex items-center"
            onMouseMove={handleMouseMove}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/80 pointer-events-none" />
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-elite-purple/10 blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
                {/* Left Side: Copy */}
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-elite-pink/30 bg-elite-pink/10 mb-8" style={{ boxShadow: '0 0 20px rgba(236,72,153,0.15)' }}>
                        <span className="w-2 h-2 rounded-full bg-elite-pink animate-pulse" />
                        <span className="text-elite-pink text-xs font-bold tracking-[0.2em]">HIGH-YIELD INVESTMENT</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black leading-none mb-6 uppercase">
                        BUILD AN <span className="text-transparent bg-clip-text bg-gradient-to-r from-elite-purple via-elite-pink to-elite-purple bg-[length:200%_auto] animate-gradient-text" style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.3))' }}>EMPIRE.</span><br />
                        BECOME <span className="text-[#E0E0E0]">ELITE.</span>
                    </h1>

                    <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-lg">
                        Partner with India’s fastest-growing premium fitness brand. High margins, rapid break-even, and absolute market dominance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <a href="#roi-calculator" className="relative group px-8 py-4 rounded-xl overflow-hidden inline-flex items-center justify-center gap-3 font-bold text-sm tracking-widest text-[#E0E0E0] shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#000080] to-elite-purple opacity-90 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-2">CALCULATE ROI <TrendingUp size={16} /></span>
                        </a>
                        <a href="#enquiry" className="relative group px-8 py-4 rounded-xl inline-flex items-center justify-center gap-3 font-bold text-sm tracking-widest text-[#E0E0E0] btn-outline-glow">
                            <span className="relative z-10 flex items-center gap-2">REQUEST DECK</span>
                        </a>
                    </div>
                </motion.div>

                {/* Right Side: 3D Perspective Blueprint */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative perspective-1000 hidden sm:block h-[500px]"
                >
                    <motion.div
                        className="w-full h-full relative transform-style-3d will-change-transform"
                        style={{
                            transform: `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
                            transition: isTouch ? 'transform 0.1s ease-out' : 'transform 0.2s ease-out',
                        }}
                    >
                        {/* Metallic glowing base panel */}
                        <div className="absolute inset-0 rounded-3xl border border-elite-purple/40 bg-gradient-to-br from-elite-purple/10 to-transparent backdrop-blur-[2px] shadow-[0_0_50px_rgba(139,92,246,0.2),inset_0_0_30px_rgba(139,92,246,0.2)] flex items-center justify-center p-8">
                            {/* Abstract blueprint lines using SVG */}
                            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60">
                                <defs>
                                    <linearGradient id="blueprint-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
                                    </linearGradient>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <rect width="20" height="20" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                                {/* Gym layout abstract shapes */}
                                <rect x="40" y="40" width="120" height="80" fill="none" stroke="url(#blueprint-grad)" strokeWidth="2" strokeDasharray="4 4" rx="4" />
                                <text x="50" y="60" fill="#8B5CF6" fontSize="10" fontFamily="sans-serif" opacity="0.8">STRENGTH ZONE</text>

                                <rect x="180" y="40" width="180" height="150" fill="none" stroke="url(#blueprint-grad)" strokeWidth="2" rx="4" />
                                <text x="190" y="60" fill="#8B5CF6" fontSize="10" fontFamily="sans-serif" opacity="0.8">CARDIO FLOOR</text>

                                <circle cx="100" cy="200" r="40" fill="none" stroke="url(#blueprint-grad)" strokeWidth="2" strokeDasharray="2 2" />
                                <text x="75" y="205" fill="#EC4899" fontSize="10" fontFamily="sans-serif" opacity="0.8">STUDIO A</text>

                                {/* Glowing connecting nodes */}
                                <circle cx="100" cy="120" r="4" fill="#EC4899" className="animate-pulse" />
                                <circle cx="180" cy="115" r="4" fill="#8B5CF6" className="animate-pulse" style={{ animationDelay: '1s' }} />
                                <line x1="100" y1="120" x2="180" y2="115" stroke="rgba(236,72,153,0.5)" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                        </div>
                        {/* Floating 3D elements above blueprint */}
                        <div className="absolute -top-6 -right-6 glass-card p-4 translate-z-12 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-elite-purple/20 flex items-center justify-center border border-elite-purple/50"><TrendingUp size={18} className="text-elite-pink" /></div>
                            <div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Avg Growth</div>
                                <div className="text-lg font-heading font-black text-[#E0E0E0]">+35% YoY</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   INTERACTIVE ROI CALCULATOR
   ======================================= */
function ROICalculator() {
    const [sqft, setSqft] = useState(8000)

    // Example calculation logic
    const capacity = Math.floor(sqft / 15) // Assume 1 member per 15 sq ft max capacity
    const activeMembers = Math.floor(capacity * 0.7) // 70% active utilization
    const avgFee = 3500 // Monthly fee
    const revPerMonth = activeMembers * avgFee
    const opEx = (sqft * 40) + 150000 // Rs 40/sqft rent + fixed overhead
    const profitPerMonth = revPerMonth - opEx
    const profitPerYear = profitPerMonth * 12
    const totalSetupCost = sqft * 2500 // Rs 2500/sqft setup
    const breakEvenMonths = Math.ceil(totalSetupCost / profitPerMonth)

    return (
        <section id="roi-calculator" className="py-16 sm:py-24 px-4 relative">
            <div className="absolute inset-0 mesh-gradient-2 opacity-50 pointer-events-none" />
            <div className="relative z-10 max-w-5xl mx-auto">
                <SectionHeading subtitle="FINANCIAL PROJECTIONS" title={<>ROI <span className="gradient-text">CALCULATOR</span></>} description="Estimate your potential earnings based on facility size." />

                <div className="glass-card-strong p-5 sm:p-8 lg:p-12 mt-8 sm:mt-12 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative overflow-hidden">
                    {/* Background glow behind calculator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-elite-purple/5 blur-[100px] pointer-events-none z-0" />

                    {/* Left: Input */}
                    <div className="relative z-10">
                        <label className="block text-xs sm:text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 sm:mb-6">Target Set-up Area (Sq.Ft.)</label>
                        <div className="text-3xl sm:text-5xl font-heading font-black text-[#E0E0E0] mb-6 sm:mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            {sqft.toLocaleString()} <span className="text-base sm:text-xl text-gray-500">SQ FT</span>
                        </div>

                        {/* Custom Neon Slider */}
                        <div className="relative py-4">
                            <input
                                type="range"
                                min="3000"
                                max="15000"
                                step="500"
                                value={sqft}
                                onChange={(e) => setSqft(Number(e.target.value))}
                                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer group"
                                style={{
                                    background: `linear-gradient(to right, #8B5CF6 0%, #EC4899 ${((sqft - 3000) / 12000) * 100}%, #1f2937 ${((sqft - 3000) / 12000) * 100}%, #1f2937 100%)`
                                }}
                            />
                            {/* Custom thumb styles using inline styles to avoid messy cross-browser CSS in this component */}
                            <style>{`
                                input[type=range]::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    height: 24px;
                                    width: 24px;
                                    border-radius: 50%;
                                    background: #fff;
                                    cursor: grab;
                                    box-shadow: 0 0 20px rgba(236,72,153,0.8), 0 0 0 6px rgba(139,92,246,0.3);
                                    margin-top: -11px;
                                    transition: transform 0.1s;
                                }
                                input[type=range]:active::-webkit-slider-thumb { transform: scale(1.2); cursor: grabbing; }
                            `}</style>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 font-bold mt-2">
                            <span>3,000</span>
                            <span>15,000+</span>
                        </div>
                    </div>

                    {/* Right: Output stats */}
                    <div className="relative z-10 grid gap-4 sm:gap-6">
                        <div className="glass-card p-4 sm:p-6 border-elite-pink/30 flex items-center justify-between">
                            <div>
                                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#EC4899] mb-1">Proj. Annual Profit</div>
                                <div className="text-2xl sm:text-3xl font-heading font-black text-[#E0E0E0]">₹{(profitPerYear / 100000).toFixed(1)} <span className="text-sm sm:text-lg text-gray-500">Lakhs</span></div>
                            </div>
                            <TrendingUp className="text-[#EC4899] opacity-50" size={32} />
                        </div>
                        <div className="glass-card p-4 sm:p-6 border-elite-purple/30 flex flex-col justify-center">
                            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8B5CF6] mb-1">Est. Break-even Period</div>
                            <div className="text-2xl sm:text-3xl font-heading font-black text-[#E0E0E0]">{breakEvenMonths} <span className="text-sm sm:text-lg text-gray-500">Months</span></div>
                            {/* Visual progress bar for break-even */}
                            <div className="w-full h-1.5 bg-gray-800 rounded-full mt-4 overflow-hidden">
                                <div className="h-full bg-elite-purple shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-300" style={{ width: `${Math.max(10, 100 - (breakEvenMonths / 36) * 100)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-600 mt-6">* Projections are estimates based on average industry performance and local operational costs. Actual results may vary.</p>
            </div>
        </section>
    )
}

/* =======================================
   VERTICAL NEON TIMELINE
   ======================================= */
function ProcessTimeline() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] })
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

    const steps = [
        { num: '01', title: 'ENQUIRY', desc: 'Submit the franchise prospectus request locally.' },
        { num: '02', title: 'DISCUSSION', desc: 'Detailed private meeting reviewing financials, margins, and territory.' },
        { num: '03', title: 'AGREEMENT', desc: 'Site approval, demographics check, and signing of master terms.' },
        { num: '04', title: 'SETUP', desc: 'Turnkey execution: interiors, premium equipment installation & hiring.' },
        { num: '05', title: 'LAUNCH', desc: 'Grand opening event backed by centralized digital marketing campaigns.' },
    ]

    return (
        <section className="py-16 sm:py-24 px-4 relative">
            <div className="relative z-10 max-w-4xl mx-auto" ref={containerRef}>
                <SectionHeading subtitle="THE ROADMAP" title={<>ROAD TO <span className="gradient-text">OWNERSHIP</span></>} />

                <div className="relative mt-12 sm:mt-20 flex flex-col gap-6 sm:gap-12">
                    {/* Glowing Line Track */}
                    <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5">
                        <motion.div
                            className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-[#8B5CF6] via-[#EC4899] to-transparent shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                            style={{ scaleY: pathLength }}
                        />
                    </div>

                    {steps.map((step, i) => (
                        <div key={i} className={`relative flex items-start sm:items-center gap-5 sm:gap-16 w-full ${i % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                            {/* Empty space for alternating layout on desktop */}
                            <div className="hidden sm:block w-1/2" />

                            {/* Center Node */}
                            <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-elite-pink bg-black flex items-center justify-center z-10 shadow-[0_0_20px_rgba(236,72,153,0.4)] shrink-0">
                                <span className="text-elite-pink font-bold text-xs sm:text-sm tracking-widest">{step.num}</span>
                            </div>

                            {/* Content Card */}
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="w-full sm:w-1/2 ml-14 sm:ml-0 glass-card-strong p-4 sm:p-6 relative group"
                            >
                                <h3 className="text-base sm:text-xl font-heading font-black text-white mb-1 sm:mb-2 uppercase tracking-wide group-hover:text-elite-pink transition-colors">{step.title}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   FRANCHISE MODELS & PRICING
   ======================================= */
function FranchiseModels() {
    return (
        <section className="py-16 sm:py-24 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)' }}>
            <div className="relative z-10 max-w-7xl mx-auto">
                <SectionHeading subtitle="INVESTMENT MODELS" title={<>CHOOSE YOUR <span className="gradient-text">BLUEPRINT</span></>} description="Flexible models designed to maximize your ROI while matching your operational capability." />

                <div className="grid md:grid-cols-2 gap-8 mt-12 sm:mt-16">
                    {/* FOCO Model */}
                    <div className="glass-card-strong p-8 sm:p-10 relative overflow-hidden group hover:border-elite-purple/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Crown size={120} className="text-elite-purple" />
                        </div>
                        <h3 className="text-3xl font-heading font-black text-white mb-2 tracking-widest uppercase">FOCO <span className="text-sm text-elite-purple font-bold tracking-widest">(Franchise Owned, Company Operated)</span></h3>
                        <p className="text-gray-400 mb-8 font-light leading-relaxed">You invest. We operate. Enjoy completely passive income while our elite management team handles day-to-day operations, marketing, and staff training to ensure maximum ROI.</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-elite-pink" /><span className="text-gray-300 font-light">100% Passive Investment</span></div>
                            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-elite-pink" /><span className="text-gray-300 font-light">Expert Company Management</span></div>
                            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-elite-pink" /><span className="text-gray-300 font-light">Guaranteed Standard of Excellence</span></div>
                        </div>
                    </div>

                    {/* FOFO Model */}
                    <div className="glass-card-strong p-8 sm:p-10 relative overflow-hidden group hover:border-elite-pink/50 transition-colors duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Building size={120} className="text-elite-pink" />
                        </div>
                        <h3 className="text-3xl font-heading font-black text-white mb-2 tracking-widest uppercase">FOFO <span className="text-sm text-elite-pink font-bold tracking-widest">(Franchise Owned, Franchise Operated)</span></h3>
                        <p className="text-gray-400 mb-8 font-light leading-relaxed">Take the helm. We provide the blueprint, the brand, and the initial setup, but you control the day-to-day operations. Ideal for passionate owner-operators looking for higher active margins.</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-elite-purple" /><span className="text-gray-300 font-light">Higher Profit Margins</span></div>
                            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-elite-purple" /><span className="text-gray-300 font-light">Direct Operational Control</span></div>
                            <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-elite-purple" /><span className="text-gray-300 font-light">Comprehensive Initial Training</span></div>
                        </div>
                    </div>
                </div>

                {/* Investment Tiers */}
                <div className="mt-16 sm:mt-24">
                    <SectionHeading subtitle="CAPITAL REQUIREMENT" title={<>INVESTMENT <span className="gradient-text">TIERS</span></>} />
                    <div className="grid sm:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
                        <div className="p-[2px] rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600">
                            <div className="bg-[#050508] rounded-[14px] p-8 h-full text-center">
                                <h4 className="text-2xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-2 uppercase tracking-widest">SILVER TIER</h4>
                                <div className="text-4xl font-heading font-black text-white mb-4">₹75 Lakhs</div>
                                <p className="text-gray-400 text-sm">Perfect for establishing a premium presence in high-density tier-2 markets or compact premium spaces in metros.</p>
                            </div>
                        </div>
                        <div className="p-[2px] rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800" style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.2)' }}>
                            <div className="bg-[#050508] rounded-[14px] p-8 h-full text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black text-[10px] font-bold px-8 py-1 transform translate-x-6 translate-y-4 rotate-45">RECOMMENDED</div>
                                <h4 className="text-2xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-2 uppercase tracking-widest">GOLD TIER</h4>
                                <div className="text-4xl font-heading font-black text-white mb-4">₹1 Crore</div>
                                <p className="text-gray-400 text-sm">The flagship investment. Massive floor space, ultimate luxury amenities, and maximum market dominance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* =======================================
   HOLOGRAPHIC BENEFITS
   ======================================= */
function HolographicBenefits() {
    const isTouch = useIsTouch()
    const benefits = [
        { icon: TrendingUp, title: 'HIGH ROI', desc: 'Proven business model with fast break-even and high profit margins.' },
        { icon: Building, title: 'TURNKEY SETUP', desc: 'Complete assistance from site selection to interior design and equipment setup.' },
        { icon: Crown, title: 'BRAND POWER', desc: 'Leverage the strong Elite Fitness brand name and market reputation.' },
        { icon: RefreshCw, title: 'OPERATIONAL SUPPORT', desc: 'SOPs, staff training, and software management support.' },
        { icon: Megaphone, title: 'MARKETING DOMINANCE', desc: 'Centralized marketing support and local launch campaigns.' },
        { icon: IndianRupee, title: 'PREMIUM PRICING', desc: 'High ticket memberships due to premium facility positioning.' },
    ]

    return (
        <section className="py-16 sm:py-24 px-4 relative">
            <div className="relative z-10 max-w-7xl mx-auto">
                <SectionHeading subtitle="THE ADVANTAGE" title={<>UNFAIR <span className="gradient-text">ADVANTAGES</span></>} />

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 perspective-1000">
                    {benefits.map((item, i) => {
                        const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
                        const handleMouseMove = (e) => {
                            if (isTouch) return
                            const rect = e.currentTarget.getBoundingClientRect()
                            setMousePos({
                                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
                            })
                        }
                        const handleMouseLeave = () => setMousePos({ x: 0, y: 0 })

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="transform-style-3d relative"
                            >
                                <div
                                    className="glass-card-strong p-5 sm:p-8 group h-full flex flex-col relative overflow-hidden"
                                    style={{
                                        transform: isTouch ? 'none' : `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg)`,
                                        transition: 'transform 0.2s ease-out',
                                    }}
                                >
                                    {/* Liquid Swirl Hover Border */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), transparent, rgba(236,72,153,0.3))', padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />

                                    <div className="icon-box mb-3 sm:mb-6 group-hover:animate-pulse-glow">
                                        <item.icon size={22} className="text-[#E0E0E0] opacity-80 group-hover:opacity-100 transition-opacity" style={{ filter: 'drop-shadow(0 0 10px rgba(236,72,153,0.5))' }} />
                                    </div>

                                    <h3 className="font-heading font-black tracking-widest uppercase text-sm sm:text-lg mb-1 sm:mb-3 text-white translate-z-8">{item.title}</h3>
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light translate-z-4">{item.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   ENQUIRY FORM (REQUEST DECK)
   ======================================= */
function InvestorForm() {
    const [submitted, setSubmitted] = useState(false)
    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 5000) }

    return (
        <section id="enquiry" className="py-24 px-4 relative">
            <div className="absolute inset-0 mesh-gradient-1 opacity-50 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
                <SectionHeading subtitle="SECURE YOUR TERRITORY" title={<>REQUEST <span className="gradient-text">PROSPECTUS</span></>} description="Strictly for serious investors. Submit your details to receive the official financial deck." />

                <div className="glass-card-strong p-8 sm:p-12 mt-12">
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                            <CheckCircle2 size={64} className="mx-auto text-elite-pink mb-6" style={{ filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.5))' }} />
                            <h3 className="text-3xl font-heading font-black mb-4 uppercase tracking-widest text-white">DECK DISPATCHED</h3>
                            <p className="text-gray-400 font-light max-w-md mx-auto">Our franchise team will contact you within 24 hours to schedule a private advisory call.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Investor Name</label><input type="text" required className="input-elite" placeholder="John Doe" /></div>
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Phone Number</label><input type="tel" required className="input-elite" placeholder="+91 ..." /></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Business Email</label><input type="email" required className="input-elite" placeholder="john@company.com" /></div>
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Target City</label><input type="text" required className="input-elite" placeholder="e.g. Pune" /></div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Available Investment Capital</label>
                                <select required className="input-elite appearance-none bg-[#0a0a14]">
                                    <option value="" disabled className="bg-black">Select an option</option>
                                    <option value="50-1CR" className="bg-black">₹50L - ₹1Cr</option>
                                    <option value="1-2CR" className="bg-black">₹1Cr - ₹2Cr</option>
                                    <option value="2CR+" className="bg-black">₹2Cr+</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full py-5 bg-gradient-to-r from-[#000080] to-elite-purple rounded-xl font-bold text-sm tracking-widest btn-glow flex items-center justify-center gap-3 uppercase shadow-[0_0_30px_rgba(139,92,246,0.3)] text-white hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] transition-shadow">
                                REQUEST PRIVATE DECK <ArrowRight size={18} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}

export default function Franchise() {
    return (
        <PageWrapper>
            <FranchiseHero />
            <FranchiseModels />
            <ROICalculator />
            <HolographicBenefits />
            <ProcessTimeline />
            <InvestorForm />
        </PageWrapper>
    )
}
