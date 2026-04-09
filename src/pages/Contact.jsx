import PageWrapper from '../components/PageWrapper'
import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Key, MessageCircle } from 'lucide-react'

function ContactHero() {
  return (
    <section className="relative pt-36 pb-28 px-4 overflow-hidden min-h-[50vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-black">
        <img src="/asset/11.webp" alt="Cardio Zone" className="w-full h-full object-cover grayscale opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-elite-orange/10 to-elite-orange/5 mix-blend-overlay" />
      </div>

      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-elite-orange/20 blur-[130px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-4 block">GET IN TOUCH</span>
          <h1 className="text-5xl sm:text-7xl font-heading font-black mb-6 uppercase tracking-tight">
            CONTACT <span className="gradient-text text-glow">US</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Have a question about our memberships, trainers, or facilities? Drop us a message or visit the club directly.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ContactCards() {
  const contactInfo = [
    { icon: MapPin, title: 'VISIT US', info: '2nd floor, Laxmi Chowk, The Elite Fitness Clubb, above KFC, Phase 1, Hinjawadi, Maharashtra 411057', detail: '' },
    { icon: Phone, title: 'CALL US', info: '+91 8888 161216', link: 'tel:+918888161216', detail: 'Mon-Sat' },
    { icon: Mail, title: 'EMAIL US', info: 'info@elitefitness.club', link: 'mailto:info@elitefitness.club', detail: 'We Reply Within 24 Hrs' },
    { icon: Clock, title: 'HOURS', info: 'Mon-Sat: 6AM - 10PM', detail: '' },
  ]

  return (
    <section className="px-4 pb-20 relative z-20 -mt-10">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {contactInfo.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 border border-white/5 relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, rgba(20,20,30,0.8), rgba(10,10,15,0.95))' }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-elite-orange/5 blur-[30px] group-hover:bg-elite-orange/10 transition-colors duration-500" />
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="text-purple-400" size={20} />
            </div>
            <h3 className="font-heading font-bold text-sm tracking-widest uppercase mb-3 text-white">{item.title}</h3>
            {item.link ? (
              <a href={item.link} className="text-gray-300 text-sm hover:text-elite-orange transition-colors font-light block mb-2">{item.info}</a>
            ) : (
              <p className="text-gray-300 text-sm font-light block mb-2">{item.info}</p>
            )}
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{item.detail}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ContactFormMap() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
          subject: "New Inquiry from The Elite Fitness Contact Page",
          from_name: "The Elite Fitness Website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
        setFormData({ name: '', phone: '', email: '', message: '' })
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
    <section className="py-16 px-4 relative noise-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

        {/* Form - Takes up 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-10">
            <span className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">CONTACT FORM</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white uppercase tracking-wide">
              SEND A <span className="gradient-text text-glow">MESSAGE</span>
            </h2>
            <p className="text-gray-400 mt-4 leading-relaxed font-light text-sm">Have a query? Drop us a message below and our team will get back to you as soon as possible.</p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#111] border border-[#222] rounded-3xl p-10 lg:p-14 text-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="text-emerald-500 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-heading font-black mb-3 uppercase tracking-wider text-white">MESSAGE SENT!</h3>
              <p className="text-gray-400 font-light text-sm">Thank you for reaching out. Our team will contact you shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-elite-orange/5 blur-[60px] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-2 font-black tracking-[0.15em] uppercase">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-elite-orange/50 focus:bg-white/10 transition-all font-light" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-2 font-black tracking-[0.15em] uppercase">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-elite-orange/50 focus:bg-white/10 transition-all font-light" placeholder="+91 Phone Number" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-2 font-black tracking-[0.15em] uppercase">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-elite-orange/50 focus:bg-white/10 transition-all font-light" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-2 font-black tracking-[0.15em] uppercase">Your Message</label>
                  <textarea rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-elite-orange/50 focus:bg-white/10 transition-all font-light resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full mt-4 py-4 bg-gradient-to-r from-elite-orange to-amber-400 rounded-xl font-bold text-xs tracking-[0.2em] btn-glow flex items-center justify-center gap-3 uppercase text-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send size={16} /> SEND MESSAGE</>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Map - Takes up 7 columns */}
        <div className="lg:col-span-7 relative flex">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative h-[500px] lg:h-auto min-h-[500px]">
            {/* Elite Overlay styling for the iframe map */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />

            <iframe
              src="https://www.google.com/maps?q=Elite+Fitness+Clubb,+Wakad+Road,+Hinjawadi+Village,+Hinjawadi,+Pimpri-Chinchwad,+Maharashtra&output=embed"
              width="100%" height="100%"
              style={{ border: 0, filter: 'invert(100%) hue-rotate(195deg) sepia(20%) saturate(300%) contrast(110%) brightness(50%)' }}
              allowFullScreen
              loading="lazy"
              title="The Elite Fitness Clubb Location"
              className="absolute inset-0 z-0"
            />
            {/* Subtle glow overlay for the map */}
            <div className="absolute inset-0 bg-elite-orange/5 pointer-events-none mix-blend-overlay z-10" />

            {/* Location Pin Badge inside the map container */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-elite-orange/20 text-elite-orange p-2 rounded-xl">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-heading font-black text-white text-sm uppercase tracking-wide">The Elite Fitness Clubb</h4>
                <p className="text-xs text-gray-400 font-light mt-0.5">2nd floor, Laxmi Chowk, above KFC</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <PageWrapper>
      <ContactHero />
      <ContactCards />
      <ContactFormMap />
    </PageWrapper>
  )
}
