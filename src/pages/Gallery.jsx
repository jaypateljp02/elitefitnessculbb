import PageWrapper from '../components/PageWrapper'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = ['ALL', 'GYM INTERIOR', 'EQUIPMENT', 'CLASSES', 'RECOVERY']

const images = [
    { id: 1, src: '/asset/new/20260404_130238.webp', category: 'GYM INTERIOR', span: 'col-span-2 row-span-2' },
    { id: 2, src: '/asset/new/20260404_130314.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-1' },
    { id: 3, src: '/asset/Yoga 1.webp', category: 'CLASSES', span: 'col-span-1 row-span-2' },
    { id: 4, src: '/asset/ice bath area.webp', category: 'RECOVERY', span: 'col-span-2 row-span-1' },
    { id: 5, src: '/asset/new/20260404_130412.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-2' },
    { id: 6, src: '/asset/Zumba.webp', category: 'CLASSES', span: 'col-span-2 row-span-2' },
    { id: 7, src: '/asset/new/20260404_130446.webp', category: 'GYM INTERIOR', span: 'col-span-1 row-span-1' },
    { id: 8, src: '/asset/Cafe wall image 1.webp', category: 'RECOVERY', span: 'col-span-1 row-span-1' },
    { id: 9, src: '/asset/new/20260404_130852.webp', category: 'EQUIPMENT', span: 'col-span-1 row-span-1' },
    { id: 10, src: '/asset/new/20260404_131006.webp', category: 'GYM INTERIOR', span: 'col-span-2 row-span-1' },
]

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('ALL')
    const [selectedImage, setSelectedImage] = useState(null)

    const filteredImages = activeCategory === 'ALL' ? images : images.filter(img => img.category === activeCategory)

    const openLightbox = (img) => setSelectedImage(img)
    const closeLightbox = () => setSelectedImage(null)

    const nextImage = (e) => {
        e.stopPropagation()
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
        setSelectedImage(filteredImages[(currentIndex + 1) % filteredImages.length])
    }

    const prevImage = (e) => {
        e.stopPropagation()
        const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
        setSelectedImage(filteredImages[(currentIndex - 1 + filteredImages.length) % filteredImages.length])
    }

    return (
        <PageWrapper>
            {/* Hero */}
            <section className="relative pt-36 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-elite-orange/10 via-elite-dark to-black" />
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-elite-orange/10 blur-[130px]" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="tag-elite mb-6 inline-block">OUR FACILITY</span>
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black mb-8 uppercase">
                            PHOTO <span className="gradient-text text-glow">GALLERY</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light mb-12">
                            Take a look inside the Elite Fitness Clubb. Premium equipment, immaculate interiors, and an unmatched vibe.
                        </p>
                    </motion.div>

                    {/* Categories */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-gradient-to-r from-elite-orange to-amber-400 text-white shadow-[0_0_20px_rgba(233,111,73,0.5)]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Masonry Grid */}
            <section className="px-4 pb-28 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[150px] sm:auto-rows-[200px]">
                        <AnimatePresence>
                            {filteredImages.map((img, i) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    key={img.id}
                                    onClick={() => openLightbox(img)}
                                    className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span} border border-white/10`}
                                >
                                    <img src={img.src} alt="Gym Activity" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                                        <div className="w-12 h-12 rounded-full bg-elite-orange flex items-center justify-center mb-3 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_20px_rgba(233,111,73,0.6)]">
                                            <ZoomIn size={20} className="text-white" />
                                        </div>
                                        <span className="text-white font-bold text-sm tracking-widest uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                            {img.category}
                                        </span>
                                    </div>

                                    {/* Corner glow */}
                                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-elite-orange/50 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-elite-orange/50 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
                    >
                        <button onClick={closeLightbox} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-elite-orange hover:shadow-[0_0_20px_rgba(233,111,73,0.5)] transition-all z-50">
                            <X size={24} />
                        </button>

                        <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-elite-orange hover:shadow-[0_0_20px_rgba(233,111,73,0.5)] transition-all z-50 hidden sm:flex">
                            <ChevronLeft size={24} />
                        </button>

                        <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-elite-orange hover:shadow-[0_0_20px_rgba(233,111,73,0.5)] transition-all z-50 hidden sm:flex">
                            <ChevronRight size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-6xl w-full h-[80vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(233,111,73,0.3)]"
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={selectedImage.src} alt="Enlarged Gym View" className="w-full h-full object-contain bg-black" />
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-bold tracking-widest uppercase">
                                {selectedImage.category}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageWrapper>
    )
}
