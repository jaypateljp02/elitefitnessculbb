import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, ArrowUp, Sparkles } from 'lucide-react'

const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Membership', path: '/membership' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
]

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className="relative bg-[#020205] overflow-hidden border-t border-white/5 pt-20">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-elite-orange/50 to-transparent" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-elite-orange/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-1/4 w-[400px] h-[400px] rounded-full bg-elite-orange/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand & Newsletter (Spans 4 cols on desktop) */}
                    <div className="lg:col-span-5">
                        <Link to="/" className="flex items-center gap-3 mb-8 group inline-flex">
                            <img src="/asset/Logo.webp" alt="Elite Fitness Clubb" className="h-16 w-auto group-hover:drop-shadow-[0_0_20px_rgba(233,111,73,0.5)] transition-all duration-500" />
                            <div>
                                <span className="text-2xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">ELITE FITNESS</span>
                                <span className="block text-xs tracking-[0.4em] text-elite-orange uppercase font-bold mt-0.5">Clubb</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm font-light">
                            Hinjewadi's premier fitness destination. Experience a blend of world-class infrastructure, elite coaching, and unparalleled luxury.
                        </p>

                        <div className="flex gap-4">
                            {[Instagram, Facebook, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-elite-orange/50 hover:bg-elite-orange/20 hover:shadow-[0_0_20px_rgba(233,111,73,0.3)] transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links (Spans 3 cols) */}
                    <div className="lg:col-span-3 lg:pl-10">
                        <h3 className="text-white font-heading font-black text-lg tracking-widest uppercase mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-elite-orange"></span> Exploration
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-400 hover:text-purple-400 transition-all text-sm hover:translate-x-2 duration-300 inline-flex items-center gap-2 font-light tracking-wide group">
                                        <ArrowUp size={12} className="rotate-45 opacity-0 group-hover:opacity-100 transition-opacity text-elite-orange" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info (Spans 4 cols) */}
                    <div className="lg:col-span-4">
                        <h3 className="text-white font-heading font-black text-lg tracking-widest uppercase mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-elite-orange"></span> Visit Us
                        </h3>
                        <div className="space-y-6">
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-elite-orange/10 group-hover:border-elite-orange/30 transition-all duration-300 shadow-[0_0_0_rgba(233,111,73,0)] group-hover:shadow-[0_0_20px_rgba(233,111,73,0.2)]">
                                    <MapPin size={20} className="text-elite-orange" />
                                </div>
                                <div className="pt-1">
                                    <h4 className="text-white text-sm font-bold tracking-wide mb-1 group-hover:text-elite-orange transition-colors">Headquarters</h4>
                                    <p className="text-gray-400 text-sm font-light leading-relaxed">2nd floor, Laxmi Chowk, Elite Fitness Clubb,<br />above KFC, Phase 1, Hinjawadi,<br />Pune, Maharashtra 411057</p>
                                </div>
                            </a>

                            <a href="tel:+918888161216" className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-elite-orange/10 group-hover:border-elite-orange/30 transition-all duration-300 shadow-[0_0_0_rgba(233,111,73,0)] group-hover:shadow-[0_0_20px_rgba(233,111,73,0.2)]">
                                    <Phone size={20} className="text-elite-orange" />
                                </div>
                                <div>
                                    <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-1">Direct Line</h4>
                                    <p className="text-gray-300 text-base font-medium group-hover:text-white transition-colors">+91 8888 161216</p>
                                </div>
                            </a>

                            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden mt-8">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-elite-orange/10 blur-[20px] rounded-full" />
                                <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-3">
                                    Operating Hours
                                </h4>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-light">Monday - Saturday</span>
                                    <span className="text-white font-medium">5:00 AM - 10:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm font-light">
                        © {new Date().getFullYear()} Elite Fitness Clubb. Crafted for Excellence.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-elite-orange/50 bg-white/5 hover:bg-elite-orange/20 shadow-[0_0_0_rgba(233,111,73,0)] hover:shadow-[0_0_20px_rgba(233,111,73,0.3)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>
            </div>
        </footer>
    )
}
