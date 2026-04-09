import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, Droplets, Target, Shield, Users, Clock, Award, Star } from 'lucide-react'

// Real Founder Signature Component
function AnimatedSignature() {
    return (
        <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 0.9, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-6 mb-2"
        >
            <img 
                src="/asset/new/signature.png" 
                alt="Sandeep Patil Signature" 
                className="w-48 sm:w-64 object-contain filter invert mix-blend-screen opacity-90 transition-opacity hover:opacity-100"
            />
        </motion.div>
    )
}

function HeroBoutique() {
    return (
        <section className="relative pt-36 pb-28 px-4 overflow-hidden min-h-[90vh] flex items-center justify-center bg-[#050508]">
            {/* Layer 1: Base Radial Background */}
            <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(233,111,73,0.15) 0%, transparent 70%)' }} />
            
            {/* Layer 2: Noise Texture */}
            <div className="absolute inset-0 z-0 noise-bg opacity-40 mix-blend-overlay" />

            {/* Layer 3: Cinematic Bottom Fade */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 z-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />

            {/* Layer 4: Glowing Orb Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-elite-orange/15 blur-[150px] -translate-y-1/2 pointer-events-none mix-blend-screen z-0" />


            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-5xl sm:text-7xl xl:text-8xl font-heading font-black mb-6 uppercase leading-[1.1] tracking-tight">
                        Boutique by Design.<br />
                        <span className="gradient-text text-glow">Elite by Result.</span>
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                        We didn't build a massive warehouse. We curated a 6,000 sq. ft. private performance studio where you aren't just a membership number—you're the mission.
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
                <span className="text-xs tracking-widest uppercase mb-2">Discover the Difference</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-elite-orange to-transparent" />
            </div>
        </section>
    )
}

function LuxuryStats() {
    const stats = [
        { num: '6,000', unit: 'SQ. FT.', label: 'PREMIUM FACILITY', desc: 'A meticulously curated strength and conditioning space. No crowds, no waiting.' },
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
                        <div className="absolute top-0 right-0 w-32 h-32 bg-elite-orange/10 blur-[40px] group-hover:bg-elite-orange/20 transition-colors duration-500" />
                        <div className="flex items-baseline gap-2 mb-2">
                            <h3 className="text-4xl sm:text-5xl font-heading font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{s.num}</h3>
                            <span className="text-elite-orange font-bold tracking-widest">{s.unit}</span>
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
                        src="/asset/new/own%20.webp"
                        alt="Founder of The Elite Fitness"
                        className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-center rounded-[2rem] opacity-80 mix-blend-luminosity brightness-110 contrast-125"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-10 left-10">
                        <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-2 block">THE VISIONARY</span>
                        <h3 className="text-4xl font-heading font-black text-white tracking-widest">FOUNDER</h3>
                    </div>
                    {/* Glowing Accent */}
                    <div className="absolute -inset-1 rounded-[2.1rem] opacity-20 bg-gradient-to-br from-elite-orange via-transparent to-amber-400 blur-[20px] -z-10" />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:pl-10">
                    <SectionHeading subtitle="A NOTE FROM THE FOUNDER" title={<>TRANSFORMING LIVES THROUGH <span className="gradient-text">DISCIPLINE & FITNESS</span></>} align="left" />

                    <div className="prose prose-invert prose-lg mt-8 text-gray-300 font-light leading-relaxed">
                        <p>
                            "I am <strong>Sandeep Jadhav Patil</strong>, the founder of The Elite Fitness Clubb. Fitness is not just a business for me, but a disciplined way of living. My journey started with a simple thought — to provide people in my village and surrounding areas with a premium fitness center that offers proper guidance, modern facilities, and a positive environment."
                        </p>
                        <p className="mt-4 text-white">
                            Nowadays, fitness is not limited merely to bodybuilding or losing weight. In my view, fitness means <strong>physical strength, mental stability, confidence, and a disciplined lifestyle.</strong>
                        </p>
                        <p className="mt-4">
                            "Today, gyms are opening in many places, but very few focus on proper guidance, personal attention, and long-term results. At The Elite Fitness Clubb, we view each member not as a ‘result’ but as a <strong>‘responsibility’</strong>. I firmly believe that with the right training, proper diet, and the right environment, anyone can completely transform themselves."
                        </p>
                        <p className="mt-4">
                            "In the coming times, our commitment is to take The Elite Fitness Clubb across the country as a strong and trusted fitness brand. We wish to work with franchise partners who not only run a business but also have the desire to bring positive changes in people's lives."
                        </p>
                        <p className="mt-6 text-2xl font-heading font-medium text-white tracking-wide border-l-2 border-elite-orange pl-6 py-1">
                            "Fitness is a journey to change life, rather than just changing the body."
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-1">
                        <AnimatedSignature />
                        <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs mt-3">Sandeep Jadhav Patil</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
const testimonials = [
        {
            name: 'RAHUL M.',
            achievement: 'Lost 18kg in 4 months',
            quote: 'The personalized diet plan and trainer attention at The Elite Fitness Clubb changed everything. I\'ve never felt stronger.',
            img: '/asset/new/20260404_130314.webp',
        },
        {
            name: 'PRIYA S.',
            achievement: 'Gained 8kg lean muscle',
            quote: 'The ice bath recovery and advanced coaching helped me break through every plateau. This gym is different.',
            img: '/asset/new/20260404_130338.webp',
        },
        {
            name: 'AMIT K.',
            achievement: 'Ran first marathon at 42',
            quote: 'I came in overweight and unmotivated. Six months later, I ran my first marathon. Elite made it possible.',
            img: '/asset/new/20260404_130412.webp',
        },
    ]

const TiltCard = ({ children, index }) => {
    const isStaggered = index % 2 !== 0;
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
    
    // Glossy reflection movement
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "100%"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: isStaggered ? 80 : 30 }}
            whileInView={{ opacity: 1, y: isStaggered ? 48 : 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative rounded-[2.5rem] overflow-hidden group/card border border-white/5 
                        transition-all duration-700 ease-out cursor-pointer
                        group-hover/spotlight:opacity-30 hover:!opacity-100 
                        hover:z-50 hover:shadow-[0_0_60px_rgba(233,111,73,0.4)]
                        ${isStaggered ? 'md:translate-y-12' : ''}`}
        >
            <div style={{ aspectRatio: '3/4' }}>
                {children}
            </div>

            {/* Interactive 3D Glare */}
            <motion.div 
                className="absolute inset-0 w-[200%] h-[200%] pointer-events-none z-50 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{ x: glareX, y: glareY, rotate: "35deg" }}
            />
        </motion.div>
    );
};

// Tinder-Style Swipe Deck purely for mobile
const MobileTransformationDeck = ({ testimonials }) => {
    const [cards, setCards] = useState(testimonials);

    const handleDragEnd = (event, info) => {
        // If dragged horizontally past threshold, send card to back
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
        <div className="relative w-full h-[550px] flex items-center justify-center overflow-hidden touch-none">
            <AnimatePresence mode="popLayout">
                {cards.map((t, index) => {
                    const isFront = index === 0;
                    return (
                        <motion.div
                            key={t.name}
                            layout
                            initial={{ scale: 0.8, opacity: 0, y: 0 }}
                            animate={{
                                scale: 1 - index * 0.02,
                                y: index * 12,
                                x: index === 0 ? 0 : index % 2 !== 0 ? 20 : -20,
                                rotate: index === 0 ? 0 : index % 2 !== 0 ? 5 : -5,
                                zIndex: cards.length - index,
                                opacity: 1 - index * 0.15
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            drag={isFront ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={isFront ? handleDragEnd : undefined}
                            className={`absolute w-[85%] max-w-[340px] rounded-[2rem] overflow-hidden border border-white/10 ${isFront ? 'cursor-grab active:cursor-grabbing hover:shadow-[0_0_30px_rgba(233,111,73,0.2)]' : ''}`}
                            style={{ aspectRatio: '3/4', touchAction: 'none' }}
                        >
                            {/* Base Image */}
                            <img src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                            
                            {/* Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-transparent opacity-95 pointer-events-none" />

                            {/* Content Always Visible on Mobile */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                                <div className="self-start px-3 py-1 bg-elite-orange/20 border border-elite-orange/30 rounded-full text-elite-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-3 backdrop-blur-md shadow-xl">
                                    {t.achievement}
                                </div>
                                <h3 className="text-2xl font-heading font-black text-amber-400 mb-2 uppercase tracking-wide">
                                    {t.name}
                                </h3>
                                <div className="pt-3 border-t border-white/10 mt-1">
                                    <p className="text-sm text-gray-200 leading-relaxed font-light italic">
                                        "{t.quote}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 mt-4 text-center z-50">
                <span className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase animate-pulse">Swipe For More &lt;—&gt;</span>
            </div>
        </div>
    );
};

function TransformationResults() {

    return (
        <section className="py-28 relative bg-black/50 border-y border-white/5 overflow-hidden noise-bg">
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <SectionHeading subtitle="REAL RESULTS" title={<>TRANSFORMATION <span className="gradient-text">STORIES</span></>} align="left" />
                <p className="text-gray-400 mt-4 max-w-2xl font-light">Our members' transformations speak louder than any marketing ever could.</p>
            </div>


            {/* Testimonial Cards — Editorial Spotlight Layout */}
            <div className="max-w-7xl mx-auto px-4 relative mt-10">
                {/* Giant Rolling Ticker Background */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 flex whitespace-nowrap opacity-[0.02] pointer-events-none z-0">
                    <div className="animate-marquee text-[12rem] md:text-[20rem] font-black font-heading tracking-tighter leading-none" style={{ WebkitTextStroke: '3px #e96f49', color: 'transparent' }}>
                        THE ELITE FITNESS CLUBB • THE ELITE FITNESS CLUBB • THE ELITE FITNESS CLUBB •
                    </div>
                </div>

                {/* Staggered Grid with Spotlight Effect FOR DESKTOP */}
                <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-10 relative z-10 group/spotlight">
                    {testimonials.map((t, i) => (
                        <TiltCard key={i} index={i}>
                            {/* Base Image */}
                            <img src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover/card:scale-110" loading="lazy" />
                            
                            {/* Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent opacity-90 md:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-elite-orange/40 to-transparent opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end transform-gpu" style={{ transform: 'translateZ(30px)' }}>
                                {/* Ambient Huge Quote Mark */}
                                <div className="absolute top-8 left-8 text-8xl font-serif text-white opacity-10 group-hover/card:opacity-0 transition-opacity duration-500">"</div>

                                {/* Content */}
                                <div className="relative z-10 transform -translate-y-4 md:translate-y-0 md:group-hover/card:-translate-y-4 transition-transform duration-500 transform-gpu" style={{ transform: 'translateZ(40px)' }}>
                                    <span className="inline-block px-3 py-1 bg-elite-orange/20 border border-elite-orange/30 rounded-full text-elite-orange text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4 backdrop-blur-md shadow-xl">
                                        {t.achievement}
                                    </span>
                                    <h3 className="text-3xl font-heading font-black text-white mb-0 uppercase tracking-wide text-amber-400 md:text-white md:group-hover/card:text-amber-400 transition-colors duration-300">
                                        {t.name}
                                    </h3>
                                </div>

                                {/* Expanding Reveal Section */}
                                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover/card:grid-rows-[1fr] transition-all duration-500 ease-in-out transform-gpu" style={{ transform: 'translateZ(50px)' }}>
                                    <div className="overflow-hidden">
                                        <div className="pt-4 border-t border-white/10 mt-4">
                                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light italic">
                                                "{t.quote}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* Interactive Deck Mode FOR MOBILE */}
                <div className="block md:hidden relative z-10 mt-8 mb-4">
                    <MobileTransformationDeck testimonials={testimonials} />
                </div>
            </div>
        </section>
    )
}

function BoutiqueDifference() {
    const reasons = [
        { icon: Clock, title: 'ZERO WAIT-TIME', desc: 'With capped membership numbers, you never wait for a squat rack, bench, or machine. Your workout happens on your schedule.' },
        { icon: Droplets, title: 'BIO-HACKING HYGIENE', desc: 'A smaller space allows us to maintain medical-grade cleanliness after every single session. An environment built for health.' },
        { icon: Users, title: 'HINJEWADI\'S PRIVATE CLUB', desc: 'It\'s a community of like-minded professionals who value their time, privacy, and results above all else.' },
    ]

    return (
        <section className="py-28 px-4 relative noise-bg">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="tag-elite mb-6 inline-block tracking-widest text-[#e96f49] border-[#e96f49]/30 bg-[#e96f49]/10">THE ELITE STANDARD</span>
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
                            className="bg-black/40 border border-white/10 rounded-3xl p-10 hover:border-elite-orange/50 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-elite-orange/5 blur-[40px] group-hover:bg-elite-orange/20 transition-colors" />
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <r.icon className="text-purple-400" size={24} />
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
            <TransformationResults />
            <BoutiqueDifference />
        </PageWrapper>
    )
}
