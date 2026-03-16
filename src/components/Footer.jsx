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
        <footer className="relative bg-elite-dark noise-bg overflow-hidden">
            {/* Gradient top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-elite-purple/50 to-transparent" />

            {/* Background orbs */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-elite-purple/5 blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-elite-pink/5 blur-[120px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <img src="/asset/Logo.png" alt="Elite Fitness Clubb" className="h-14 w-auto group-hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all" />
                            <div>
                                <span className="text-xl font-heading font-bold gradient-text">ELITE FITNESS</span>
                                <span className="block text-xs tracking-[0.35em] text-gray-500 uppercase font-medium">Clubb</span>
                            </div>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Premium fitness experience with world-class equipment, expert trainers,
                            and a neon-lit atmosphere that fuels transformation.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Facebook, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-elite-purple hover:border-elite-purple/40 hover:bg-elite-purple/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3.5">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-gray-500 hover:text-elite-purple transition-all text-sm hover:pl-1 duration-300">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Services</h3>
                        <ul className="space-y-3.5">
                            {['Personal Training', 'Group Classes', 'Weight Loss', 'Strength Training', 'Yoga & Zumba', 'Nutrition Plan', 'Ice Bath Recovery'].map((item) => (
                                <li key={item}>
                                    <Link to="/services" className="text-gray-500 hover:text-elite-purple transition-all text-sm hover:pl-1 duration-300">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-5">
                            <li className="flex gap-3 text-sm">
                                <div className="w-9 h-9 rounded-lg bg-elite-purple/10 border border-elite-purple/20 flex items-center justify-center shrink-0">
                                    <MapPin size={16} className="text-elite-purple" />
                                </div>
                                <span className="text-gray-500">2nd floor, Laxmi Chowk, Elite Fitness Clubb,<br />above Shlok Hospital, Hinjawadi, Pune,<br />Maharashtra 411057</span>
                            </li>
                            <li className="flex gap-3 text-sm">
                                <div className="w-9 h-9 rounded-lg bg-elite-purple/10 border border-elite-purple/20 flex items-center justify-center shrink-0">
                                    <Phone size={16} className="text-elite-purple" />
                                </div>
                                <a href="tel:+918888161216" className="text-gray-500 hover:text-white transition-colors">+91 8888 161216</a>
                            </li>
                            <li className="flex gap-3 text-sm">
                                <div className="w-9 h-9 rounded-lg bg-elite-purple/10 border border-elite-purple/20 flex items-center justify-center shrink-0">
                                    <Mail size={16} className="text-elite-purple" />
                                </div>
                                <a href="mailto:info@elitefitness.club" className="text-gray-500 hover:text-white transition-colors">info@elitefitness.club</a>
                            </li>
                        </ul>
                        <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/5">
                            <h4 className="text-white text-sm font-semibold mb-1">Opening Hours</h4>
                            <p className="text-gray-500 text-xs">Mon-Sat: 5:00 AM - 11:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Elite Fitness Clubb. All rights reserved.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 hover:text-elite-purple hover:border-elite-purple/40 hover:bg-elite-purple/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>
            </div>
        </footer>
    )
}
