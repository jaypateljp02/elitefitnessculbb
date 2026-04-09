import { motion } from 'framer-motion'

export default function TopTicker() {
    const message = "THE ELITE FITNESS CLUBB   ★   6,000 SQ FT WORLD-CLASS FACILITY   ★   EXPERT PERSONAL TRAINING   ★   ICE BATH & RECOVERY   ★   OPEN 6 AM – 10 PM   ★   "

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-gradient-to-r from-[#1a0e08] via-[#0d0805] to-[#1a0e08] border-b border-elite-orange/20 flex items-center overflow-hidden select-none pointer-events-none">
            <div className="animate-ticker whitespace-nowrap flex gap-0 min-w-max">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-elite-orange/80">
                    {message.repeat(4)}
                </span>
            </div>
            <style>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                }
            `}</style>
        </div>
    )
}
