'use client'
import { motion } from 'framer-motion'

const BRANDS = ["CHAMPION", "ADIDAS", "NIKE", "PUMA", "GUILDAN", "AMERICAN APPAREL"]

export default function BrandMarquee() {
  return (
    <div className="w-full py-gr-3 bg-black overflow-hidden flex relative z-10">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-20"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-20"></div>
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
          <span key={i} className="text-white/30 font-bold text-4xl mx-8 font-serif tracking-widest uppercase">
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  )
}