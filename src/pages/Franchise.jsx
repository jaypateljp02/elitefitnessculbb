import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import useSEO from '../hooks/useSEO'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { TrendingUp, Shield, RefreshCw, Megaphone, IndianRupee, Store, Crown, ArrowRight, Building, CheckCircle2, Users, Zap, MapPin, Phone, ChevronDown } from 'lucide-react'

/* =======================================
   HERO
   ======================================= */
function FranchiseHero() {
    return (
        <section className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden flex items-center noise-bg">
            <div className="absolute inset-0">
                <img src="/asset/new/20260404_130338.webp" alt="The Elite Fitness Gym" className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-elite-orange/10 blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-elite-orange/30 bg-elite-orange/10 mb-8" style={{ boxShadow: '0 0 20px rgba(233,111,73,0.15)' }}>
                        <span className="w-2 h-2 rounded-full bg-elite-orange animate-pulse" />
                        <span className="text-purple-400 text-xs font-bold tracking-[0.2em]">FRANCHISE OPPORTUNITY</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black leading-none mb-6 uppercase text-center">
                        Own an<br /><span className="gradient-text text-glow">The Elite Fitness Clubb</span><br />Franchise
                    </h1>

                    <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                        Partner with a visionary premium fitness brand. High margins, transparent operations, and complete system support to ensure your success.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#roi-calculator" className="px-8 py-4 bg-gradient-to-r from-elite-orange to-amber-400 rounded-xl font-bold text-sm tracking-widest uppercase inline-flex items-center justify-center gap-2 btn-glow">
                            CALCULATE ROI <TrendingUp size={16} />
                        </a>
                        <a href="#enquiry" className="px-8 py-4 border border-white/20 rounded-xl font-bold text-sm tracking-widest uppercase inline-flex items-center justify-center gap-2 text-gray-300 hover:border-elite-orange/50 hover:bg-elite-orange/10 transition-all">
                            REQUEST DECK <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-3xl mx-auto">
                    {[
                        { value: '35%', label: 'Avg YoY Growth' },
                        { value: '18mo', label: 'Avg Break-even' },
                        { value: '₹75L+', label: 'Starting Investment' },
                    ].map((s, i) => (
                        <div key={i} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="text-2xl sm:text-3xl font-heading font-black gradient-text">{s.value}</div>
                            <div className="text-gray-500 text-xs font-bold tracking-widest uppercase mt-1">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

/* =======================================
   WHY ELITE FITNESS
   ======================================= */
function WhyElite() {
    const benefits = [
        { icon: TrendingUp, title: 'High ROI', desc: 'Proven business model with fast break-even and high profit margins in the booming fitness industry.' },
        { icon: Building, title: 'Turnkey Setup', desc: 'Complete assistance from site selection to interior design and premium equipment installation.' },
        { icon: Crown, title: 'Brand Power', desc: 'Leverage the strong The Elite Fitness brand name, reputation, and growing member loyalty.' },
        { icon: RefreshCw, title: 'Operational Support', desc: 'Comprehensive SOPs, staff hiring & training, and software management support.' },
        { icon: Megaphone, title: 'Marketing Dominance', desc: 'Centralized digital marketing, social media management, and local launch campaigns.' },
        { icon: IndianRupee, title: 'Premium Pricing', desc: 'High-ticket memberships enabled by premium facility positioning and brand prestige.' },
    ]

    return (
        <section className="py-16 sm:py-24 px-4 relative noise-bg">
            <div className="relative z-10 max-w-7xl mx-auto">
                <SectionHeading subtitle="THE ADVANTAGE" title={<>WHY <span className="gradient-text">THE ELITE FITNESS</span></>} description="An unfair advantage in the fitness franchise market." />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-16">
                    {benefits.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-2xl border border-white/8 bg-[#0a0a14] p-6 sm:p-8 relative overflow-hidden group hover:border-elite-orange/40 transition-all duration-500"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-elite-orange/5 blur-[40px] group-hover:bg-elite-orange/15 transition-colors pointer-events-none" />
                            <div className="w-12 h-12 rounded-xl bg-elite-orange/10 border border-elite-orange/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <item.icon size={22} className="text-elite-orange" />
                            </div>
                            <h3 className="font-heading font-black text-white text-lg tracking-wide uppercase mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   FRANCHISE MODELS — FOCO & FOFO
   ======================================= */
function FranchiseModels() {
    return (
        <section className="py-16 sm:py-24 px-4 relative noise-bg" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(233,111,73,0.06) 0%, transparent 60%)' }}>
            <div className="relative z-10 max-w-6xl mx-auto">
                <SectionHeading subtitle="INVESTMENT MODELS" title={<>CHOOSE YOUR <span className="gradient-text">BLUEPRINT</span></>} description="Two flexible models designed to maximize your ROI." />

                <div className="grid md:grid-cols-2 gap-6 mt-12 sm:mt-16">
                    {/* FOCO */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-elite-orange/30 bg-[#0a0a14] p-6 sm:p-8 relative group hover:border-elite-orange/60 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-elite-orange/5 rounded-full blur-[50px] pointer-events-none" />
                        <div className="flex items-center gap-4 mb-5 relative z-10">
                            <div className="p-3 rounded-xl bg-elite-orange/10 border border-elite-orange/20 text-elite-orange shrink-0"><Crown size={24} /></div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase">FOCO</h3>
                                <span className="text-[11px] text-purple-400 font-bold tracking-widest uppercase">Franchise Owned · Company Operated</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed relative z-10">
                            You invest. We operate everything. Enjoy completely passive income while our elite management team handles daily operations, marketing, and staff training.
                        </p>
                        <div className="space-y-3 relative z-10">
                            {['100% Passive Investment', 'Expert Company Management', 'Guaranteed Quality Standards', 'Complete Brand Consistency'].map((t, i) => (
                                <div key={i} className="flex items-center gap-3"><CheckCircle2 size={15} className="text-purple-400 shrink-0" /><span className="text-gray-200 text-sm">{t}</span></div>
                            ))}
                        </div>
                    </motion.div>

                    {/* FOFO */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl border border-elite-orange/30 bg-[#0a0a14] p-6 sm:p-8 relative group hover:border-elite-orange/60 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-elite-orange/5 rounded-full blur-[50px] pointer-events-none" />
                        <div className="flex items-center gap-4 mb-5 relative z-10">
                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0"><Building size={24} /></div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase">FOFO</h3>
                                <span className="text-[11px] text-purple-400 font-bold tracking-widest uppercase">Franchise Owned · Franchise Operated</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed relative z-10">
                            Take the helm. We provide the blueprint, brand identity, and initial setup. You control daily operations for higher active margins.
                        </p>
                        <div className="space-y-3 relative z-10">
                            {['Higher Active Profit Margins', 'Direct Operational Control', 'Comprehensive Initial Training', 'Ongoing Brand Support'].map((t, i) => (
                                <div key={i} className="flex items-center gap-3"><CheckCircle2 size={15} className="text-purple-400 shrink-0" /><span className="text-gray-200 text-sm">{t}</span></div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Investment Tiers */}
                <div className="mt-16 sm:mt-20">
                    <SectionHeading subtitle="CAPITAL REQUIREMENT" title={<>INVESTMENT <span className="gradient-text">TIERS</span></>} />
                    <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
                        {/* Silver */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border-2 border-gray-400/50 bg-[#0a0a14] p-6 sm:p-8 text-center hover:border-gray-300/70 transition-colors" style={{ boxShadow: '0 0 25px rgba(192,192,192,0.1)' }}>
                            <h4 className="text-xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 mb-2 uppercase tracking-widest">SILVER TIER</h4>
                            <div className="text-4xl font-heading font-black text-white mb-3">₹75 Lakhs</div>
                            <p className="text-gray-400 text-sm font-light">Premium presence in tier-2 markets or compact premium spaces in metros.</p>
                        </motion.div>

                        {/* Gold */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl border-2 border-yellow-600/50 bg-[#0a0a14] p-6 sm:p-8 text-center relative hover:border-yellow-500/70 transition-colors" style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.15)' }}>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black text-[10px] font-bold px-5 py-1 rounded-full shadow-lg z-10">RECOMMENDED</div>
                            <h4 className="text-xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-2 uppercase tracking-widest mt-2">GOLD TIER</h4>
                            <div className="text-4xl font-heading font-black text-white mb-3">₹1 Crore</div>
                            <p className="text-gray-400 text-sm font-light">Flagship investment with massive floor space, luxury amenities, and maximum market dominance.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* =======================================
   INTERACTIVE ROI CALCULATOR
   ======================================= */
function ROICalculator() {
    const [sqft, setSqft] = useState(8000)

    const capacity = Math.floor(sqft / 15)
    const activeMembers = Math.floor(capacity * 0.7)
    const avgFee = 3500
    const revPerMonth = activeMembers * avgFee
    const opEx = (sqft * 40) + 150000
    const profitPerMonth = revPerMonth - opEx
    const profitPerYear = profitPerMonth * 12
    const totalSetupCost = sqft * 2500
    const breakEvenMonths = Math.ceil(totalSetupCost / profitPerMonth)

    return (
        <section id="roi-calculator" className="py-16 sm:py-24 px-4 relative noise-bg">
            <div className="relative z-10 max-w-5xl mx-auto">
                <SectionHeading subtitle="FINANCIAL PROJECTIONS" title={<>ROI <span className="gradient-text">CALCULATOR</span></>} description="Estimate your potential earnings based on facility size." />

                <div className="rounded-2xl border border-white/10 bg-[#0a0a14] p-5 sm:p-8 lg:p-10 mt-10 grid lg:grid-cols-2 gap-8 items-center">
                    {/* Input */}
                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Target Area (Sq.Ft.)</label>
                        <div className="text-3xl sm:text-5xl font-heading font-black text-white mb-6">
                            {sqft.toLocaleString()} <span className="text-lg text-gray-500">SQ FT</span>
                        </div>
                        <div className="relative py-4">
                            <input
                                type="range" min="3000" max="15000" step="1000"
                                value={sqft}
                                onChange={(e) => setSqft(Number(e.target.value))}
                                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                                style={{ background: `linear-gradient(to right, #e96f49 0%, #e96f49 ${((sqft - 3000) / 12000) * 100}%, #1f2937 ${((sqft - 3000) / 12000) * 100}%, #1f2937 100%)` }}
                            />
                            <style>{`
                                input[type=range]::-webkit-slider-thumb {
                                    -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%;
                                    background: #fff; cursor: grab; box-shadow: 0 0 20px rgba(233,111,73,0.8), 0 0 0 6px rgba(233,111,73,0.3); margin-top: -11px;
                                }
                                input[type=range]:active::-webkit-slider-thumb { transform: scale(1.2); cursor: grabbing; }
                            `}</style>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 font-bold mt-1">
                            <span>3,000</span><span>15,000+</span>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="grid gap-4">
                        <div className="rounded-xl border border-elite-orange/20 bg-black/30 p-4 sm:p-5 flex items-center justify-between">
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Proj. Annual Profit</div>
                                <div className="text-2xl sm:text-3xl font-heading font-black text-white">₹{(profitPerYear / 100000).toFixed(1)} <span className="text-sm text-gray-500">Lakhs</span></div>
                            </div>
                            <TrendingUp className="text-purple-400/50" size={28} />
                        </div>
                        <div className="rounded-xl border border-elite-orange/20 bg-black/30 p-4 sm:p-5">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-elite-orange mb-1">Est. Break-even</div>
                            <div className="text-2xl sm:text-3xl font-heading font-black text-white">{breakEvenMonths} <span className="text-sm text-gray-500">Months</span></div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-elite-orange transition-all duration-300" style={{ width: `${Math.max(10, 100 - (breakEvenMonths / 36) * 100)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-600 mt-5">* Projections are estimates based on average industry performance. Actual results may vary.</p>
            </div>
        </section>
    )
}

/* =======================================
   PROCESS TIMELINE
   ======================================= */
function ProcessTimeline() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] })
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

    const steps = [
        { num: '01', title: 'ENQUIRY', desc: 'Submit the franchise prospectus request.' },
        { num: '02', title: 'DISCUSSION', desc: 'Private meeting reviewing financials, margins, and territory.' },
        { num: '03', title: 'AGREEMENT', desc: 'Site approval, demographics check, and terms signing.' },
        { num: '04', title: 'SETUP', desc: 'Turnkey execution: interiors, equipment installation & hiring.' },
        { num: '05', title: 'LAUNCH', desc: 'Grand opening backed by digital marketing campaigns.' },
    ]

    return (
        <section className="py-16 sm:py-24 px-4 relative noise-bg">
            <div className="relative z-10 max-w-4xl mx-auto" ref={containerRef}>
                <SectionHeading subtitle="THE ROADMAP" title={<>ROAD TO <span className="gradient-text">OWNERSHIP</span></>} />

                <div className="relative mt-12 sm:mt-16 flex flex-col gap-6 sm:gap-10">
                    {/* Glowing Line */}
                    <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5">
                        <motion.div
                            className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-elite-orange via-amber-500 to-transparent shadow-[0_0_15px_rgba(233,111,73,0.6)]"
                            style={{ scaleY: pathLength }}
                        />
                    </div>

                    {steps.map((step, i) => (
                        <div key={i} className={`relative flex items-start sm:items-center gap-5 sm:gap-12 w-full ${i % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                            <div className="hidden sm:block w-1/2" />
                            <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-10 h-10 rounded-full border-2 border-elite-orange bg-black flex items-center justify-center z-10 shadow-[0_0_15px_rgba(233,111,73,0.4)] shrink-0">
                                <span className="text-purple-400 font-bold text-xs">{step.num}</span>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                                className="w-full sm:w-1/2 ml-14 sm:ml-0 rounded-xl border border-white/8 bg-[#0a0a14] p-4 sm:p-6 group hover:border-elite-orange/30 transition-colors"
                            >
                                <h3 className="text-base sm:text-lg font-heading font-black text-white mb-1 uppercase tracking-wide group-hover:text-purple-400 transition-colors">{step.title}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">{step.desc}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   ENQUIRY FORM
   ======================================= */
function InvestorForm() {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', capital: '' })
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const capitalOptions = [
        { value: '75L', label: '₹75 Lakhs (Silver Tier)' },
        { value: '1CR', label: '₹1 Crore (Gold Tier)' },
        { value: '1CR+', label: '₹1 Crore+ (Multi-unit)' },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.capital) {
            alert("Please select an Available Investment Capital option.")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "60276be1-0988-435a-a1cc-9a21ec43d9de",
                    subject: "New Franchise Investor Inquiry - The Elite Fitness",
                    from_name: "The Elite Fitness Website",
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city,
                    investment_capital: formData.capital,
                }),
            })

            const result = await response.json()
            if (result.success) {
                setSubmitted(true)
                setTimeout(() => setSubmitted(false), 5000)
                setFormData({ name: '', phone: '', email: '', city: '', capital: '' })
            } else {
                alert("Something went wrong. Please try again or contact us directly.")
            }
        } catch (error) {
            console.error("Submission failed:", error)
            alert("Network error. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="enquiry" className="py-16 sm:py-24 px-4 relative noise-bg">
            <div className="relative z-10 max-w-3xl mx-auto">
                <SectionHeading subtitle="SECURE YOUR TERRITORY" title={<>REQUEST <span className="gradient-text">PROSPECTUS</span></>} description="Submit your details to receive the official financial deck." />

                <div className="rounded-2xl border border-white/10 bg-[#0a0a14] p-6 sm:p-10 mt-10">
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                            <CheckCircle2 size={56} className="mx-auto text-purple-400 mb-5" style={{ filter: 'drop-shadow(0 0 20px rgba(233,111,73,0.5))' }} />
                            <h3 className="text-2xl font-heading font-black mb-3 uppercase tracking-widest text-white">DECK DISPATCHED</h3>
                            <p className="text-gray-400 font-light max-w-md mx-auto text-sm">Our franchise team will contact you within 24 hours.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Investor Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-elite" placeholder="Rahul Sharma" /></div>
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Phone Number</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="input-elite" placeholder="+91 ..." /></div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Business Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="input-elite" placeholder="rahul@company.com" /></div>
                                <div><label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Target City</label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="input-elite" placeholder="e.g. Pune" /></div>
                            </div>
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-xs text-gray-400 mb-2 font-bold tracking-widest uppercase">Available Investment Capital</label>
                                
                                <div 
                                    className={`input-elite bg-[#0a0a14] w-full pr-12 cursor-pointer flex items-center transition-colors ${!formData.capital ? 'text-gray-500' : 'text-white'} ${dropdownOpen ? 'border-elite-orange/50' : ''}`}
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="truncate">
                                        {formData.capital ? capitalOptions.find(opt => opt.value === formData.capital)?.label : 'Select an option...'}
                                    </span>
                                    <div className={`absolute right-4 top-1/2 transform -translate-y-[20%] mt-[2px] pointer-events-none text-gray-500 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                            className="absolute left-0 right-0 top-full mt-2 bg-[#0d0d16] border border-white/10 rounded-xl overflow-hidden z-50 origin-top shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
                                        >
                                            {capitalOptions.map((opt) => (
                                                <div 
                                                    key={opt.value}
                                                    className={`px-4 py-3 cursor-pointer text-sm transition-colors ${formData.capital === opt.value ? 'bg-elite-orange/10 text-elite-orange' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                                                    onClick={() => {
                                                        setFormData({ ...formData, capital: opt.value })
                                                        setDropdownOpen(false)
                                                    }}
                                                >
                                                    {opt.label}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-elite-orange to-amber-400 rounded-xl font-bold text-sm tracking-widest btn-glow flex items-center justify-center gap-3 uppercase text-white hover:shadow-[0_0_40px_rgba(233,111,73,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>REQUEST PRIVATE DECK <ArrowRight size={16} /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}

/* =======================================
   FRANCHISE PAGE
   ======================================= */
export default function Franchise() {
    useSEO({
        title: 'Fitness Franchise Opportunities',
        description: 'Own a premium fitness franchise with The Elite Fitness Clubb. High ROI, turnkey setup, and elite brand backing in Pune.',
        path: '/franchise'
    })
    return (
        <PageWrapper>
            <FranchiseHero />
            <WhyElite />
            <FranchiseModels />
            <ROICalculator />
            <ProcessTimeline />
            <InvestorForm />
        </PageWrapper>
    )
}
