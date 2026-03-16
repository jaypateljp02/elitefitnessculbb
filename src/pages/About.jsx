import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Check, Droplets, Target, Shield, Users, Clock, Award, Star } from 'lucide-react'

// SVG Signature Animation Component
function AnimatedSignature() {
    return (
        <svg viewBox="0 0 200 60" className="w-48 sm:w-64 mt-4 text-elite-pink" fill="transparent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 20 40 
                   C 30 20, 40 10, 50 15 
                   S 30 50, 60 40 
                   C 70 30, 80 15, 90 25
                   S 60 55, 100 45
                   Q 120 30, 140 35
                   T 180 30"
            />
            {/* Dots */}
            <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 }} cx="150" cy="15" r="1.5" fill="currentColor" stroke="none" />
            <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 }} cx="120" cy="20" r="1.5" fill="currentColor" stroke="none" />
        </svg>
    )
}

function HeroBoutique() {
    return (
        <section className="relative pt-36 pb-28 px-4 overflow-hidden min-h-[90vh] flex items-center justify-center">
            <div className="absolute inset-0">
                <img src="/asset/14.png" alt="Clean Gym Floor" className="w-full h-full object-cover grayscale opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-black/90" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-elite-purple/10 to-elite-pink/10 mix-blend-overlay" />
            </div>

            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-elite-purple/10 blur-[150px] -translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl sm:text-7xl xl:text-8xl font-heading font-black mb-6 uppercase leading-[1.1] tracking-tight">
                        Boutique by Design.<br />
                        <span className="gradient-text text-glow">Elite by Result.</span>
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                        We didn't build a massive warehouse. We curated a 2,000 sq. ft. private performance studio where you aren't just a membership number—you're the mission.
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
                <span className="text-xs tracking-widest uppercase mb-2">Discover the Difference</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-elite-pink to-transparent" />
            </div>
        </section>
    )
}

function LuxuryStats() {
    const stats = [
        { num: '2,000', unit: 'SQ. FT.', label: 'PRIVATE STUDIO', desc: 'A meticulously curated strength and conditioning space. No crowds, no waiting.' },
        { num: '10+', unit: 'COACHES', label: 'EXPERT SPECIALISTS', desc: 'A hand-picked team of Level 3 certified experts focused on your biomechanics.' },
        { num: '10+', unit: 'YEARS', label: 'EXCELLENT RESULTS', desc: 'Consistently delivering deep transformations for Hindjewadi\'s professionals.' },
    ]

    return (
        <section className="py-20 px-4 relative z-20 -mt-10">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="glass-card p-8 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden group"
                        style={{ background: 'linear-gradient(135deg, rgba(20,20,30,0.8), rgba(10,10,15,0.95))' }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-elite-purple/10 blur-[40px] group-hover:bg-elite-pink/20 transition-colors duration-500" />
                        <div className="flex items-baseline gap-2 mb-2">
                            <h3 className="text-4xl sm:text-5xl font-heading font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{s.num}</h3>
                            <span className="text-elite-pink font-bold tracking-widest">{s.unit}</span>
                        </div>
                        <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">{s.label}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-light">{s.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

function FoundersCorner() {
    return (
        <section className="py-28 px-4 relative noise-bg">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[600px] w-full max-w-md mx-auto lg:mx-0">
                    <div className="absolute inset-0 rounded-[2rem] border border-white/10" style={{ background: 'linear-gradient(180deg, #111, #000)' }} />
                    <img
                        src="/asset/sportsman-make-sport-exercises-in-gym-PE2NXZL-2048x1367.jpg"
                        alt="Founder of Elite Fitness"
                        className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-center rounded-[2rem] opacity-80 mix-blend-luminosity brightness-110 contrast-125"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-10 left-10">
                        <span className="text-xs font-bold tracking-[0.2em] text-elite-pink uppercase mb-2 block">THE VISIONARY</span>
                        <h3 className="text-3xl font-heading font-black text-white">FOUNDER &<br />HEAD COACH</h3>
                    </div>
                    {/* Glowing Accent */}
                    <div className="absolute -inset-1 rounded-[2.1rem] opacity-20 bg-gradient-to-br from-elite-purple via-transparent to-elite-pink blur-[20px] -z-10" />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:pl-10">
                    <SectionHeading subtitle="A NOTE FROM THE FOUNDER" title={<>FITNESS IS <span className="gradient-text">PERSONAL AGAIN</span></>} align="left" />

                    <div className="prose prose-invert prose-lg mt-8 text-gray-300 font-light leading-relaxed">
                        <p>
                            "Elite Fitness Clubb was established with a singular vision: to transcend the conventional gym experience. Hinjewadi demanded a space where fitness is approached not as a routine, but as an exact science and a dedicated craft."
                        </p>
                        <p className="mt-4">
                            "We operate with intended exclusivity to guarantee uncompromising quality. With our hand-picked team of specialists, we do not merely supervise – we engineer your biomechanics, strategize your nutrition, and unequivocally guarantee your transformation. We demand excellence, because our members deserve nothing less."
                        </p>
                        <p className="mt-4 font-normal text-white italic">
                            "This is our standard. This is the Elite promise."
                        </p>
                    </div>

                    <AnimatedSignature />
                </motion.div>
            </div>
        </section>
    )
}

function EliteTrainerSlider() {
    const coaches = [
        {
            name: 'COACH RAHUL',
            role: 'Fat Loss Architect',
            proof: 'Successfully transformed 40+ corporate professionals.',
            img: '/asset/6-2.png'
        },
        {
            name: 'COACH SARA',
            role: 'Mobility & Recovery Specialist',
            proof: 'Certified in injury rehab and advanced biomechanics.',
            img: '/asset/10-1.png'
        },
        {
            name: 'COACH NIKHIL',
            role: 'Strength & Conditioning',
            proof: 'Built 10+ state-level powerlifting champions.',
            img: '/asset/15.png'
        },
        {
            name: 'COACH PRIYA',
            role: 'Nutrition & Wellness Engineer',
            proof: 'Designs holistic protocols for sustainable energy.',
            img: '/asset/16.png'
        },
    ]

    const scrollRef = useRef(null)
    const { scrollXProgress } = useScroll({ container: scrollRef })

    return (
        <section className="py-28 relative bg-black/50 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <SectionHeading subtitle="THE ELITE 10" title={<>OUR SPECIAL FORCES <span className="gradient-text">TEAM</span></>} align="left" />
                <p className="text-gray-400 mt-4 max-w-2xl font-light">We don't hire generic 'floor trainers.' We employ specialized architects capable of completely rebuilding your body and health.</p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-12 px-4 sm:px-[10vw] no-scrollbar snap-x snap-mandatory"
            >
                {coaches.map((coach, i) => (
                    <div
                        key={i}
                        className="min-w-[300px] max-w-[320px] sm:min-w-[400px] sm:max-w-[450px] shrink-0 snap-center relative rounded-3xl overflow-hidden group border border-white/10"
                        style={{ aspectRatio: '3/4' }}
                    >
                        <img src={coach.img} alt={coach.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <span className="text-elite-pink text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{coach.role}</span>
                            <h3 className="text-3xl font-heading font-black text-white mb-4 uppercase">{coach.name}</h3>

                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="flex items-start gap-3">
                                    <Star className="text-yellow-500 shrink-0 w-5 h-5 fill-yellow-500 mt-0.5" />
                                    <p className="text-sm text-gray-200 leading-snug font-medium italic">"{coach.proof}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll Progress Bar */}
            <div className="max-w-7xl mx-auto px-4 mt-4">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-elite-purple to-elite-pink" style={{ scaleX: scrollXProgress, transformOrigin: 'left' }} />
                </div>
            </div>
        </section>
    )
}

function BoutiqueDifference() {
    const reasons = [
        { icon: Clock, title: 'ZERO WAIT-TIME', desc: 'With capped membership numbers, you never wait for a squat rack, bench, or machine. Your workout happens on your schedule.' },
        { icon: Droplets, title: 'BIO-HACKING HYGIENE', desc: 'A smaller space allows us to maintain medical-grade cleanliness after every single session. An environment built for health.' },
        { icon: Users, title: 'HINJEWADI\'S PRIVATE CLUB', desc: 'It’s a community of like-minded professionals who value their time, privacy, and results above all else.' },
    ]

    return (
        <section className="py-28 px-4 relative noise-bg">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="tag-elite mb-6 inline-block tracking-widest text-[#8B5CF6] border-[#8B5CF6]/30 bg-[#8B5CF6]/10">THE ELITE STANDARD</span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-8 uppercase">
                        THE <span className="gradient-text">BOUTIQUE DIFFERENCE</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reasons.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="bg-black/40 border border-white/10 rounded-3xl p-10 hover:border-elite-purple/50 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-elite-purple/5 blur-[40px] group-hover:bg-elite-purple/20 transition-colors" />
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <r.icon className="text-elite-pink" size={24} />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white mb-4 tracking-wide">{r.title}</h3>
                            <p className="text-gray-400 font-light leading-relaxed">{r.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function About() {
    return (
        <PageWrapper>
            <HeroBoutique />
            <LuxuryStats />
            <FoundersCorner />
            <EliteTrainerSlider />
            <BoutiqueDifference />
        </PageWrapper>
    )
}
