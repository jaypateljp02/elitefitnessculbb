import { motion } from 'framer-motion'

export default function SectionHeading({ subtitle, title, description, center = true }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className={`mb-20 ${center ? 'text-center' : ''}`}
        >
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="tag-elite mb-6 inline-block"
                >
                    {subtitle}
                </motion.span>
            )}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight">
                {title}
            </h2>
            {description && (
                <p className={`text-gray-400 text-lg sm:text-xl leading-relaxed font-light ${center ? 'max-w-2xl mx-auto' : ''}`}>
                    {description}
                </p>
            )}
        </motion.div>
    )
}
