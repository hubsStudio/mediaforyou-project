'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ShoppingBag, Search, Home, Heart, User, Zap, ArrowRight, BookOpen } from 'lucide-react'
import { useState, useMemo, useRef } from 'react'

// ------------------------------------------------------------
// 💎 UTILITIES & CONFIG
// ------------------------------------------------------------

const formatTHB = (amount: number) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount)
}

// รายชื่อแบรนด์ที่จะทำ Marquee
const BRANDS = [
  "Champion", "Adidas", "Bella+Canvas", "Gildan", "Nike", "Next Level", "Anvil", "American Apparel"
]

// Mock Data สำหรับ Blog (เดี๋ยวเราเปลี่ยนเป็นดึงจาก Sanity ทีหลัง)
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Streetwear: 2026 Trends",
    excerpt: "Discover how digital art is merging with sustainable fabrics to create the next wave of fashion.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
    category: "Trends"
  },
  {
    id: 2,
    title: "Why Custom Merch Builds Better Brands",
    excerpt: "A deep dive into the psychology of personalized apparel and community building.",
    image: "https://images.unsplash.com/photo-1503342217505-b0815a046b68?auto=format&fit=crop&q=80&w=800",
    category: "Business"
  }
]

// ------------------------------------------------------------
// 🎨 MAIN COMPONENT
// ------------------------------------------------------------

export default function StoreFront({ products }: { products: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { scrollY } = useScroll()
  
  const yHero = useTransform(scrollY, [0, 500], [0, 200])
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0])

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category || 'Collection')))], [products])
  
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'All' 
      ? products 
      : products.filter(p => (p.category || 'Collection') === selectedCategory)
  }, [products, selectedCategory])

  const newDrops = products.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-black selection:text-white pb-24 md:pb-0">
      
      {/* 1. HEADER */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 h-16 flex items-center"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-lg font-bold tracking-tight uppercase hidden md:block">
              Media<span className="text-blue-600">4</span>You
            </span>
          </Link>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <input type="text" placeholder="Search collection..." className="w-full bg-gray-100/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 2. HERO */}
      <header className="relative h-[85vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10" />
        
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="container mx-auto px-4 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold tracking-widest uppercase mb-6 text-gray-900">
              <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" /> New Collection 2026
            </span>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-[0.9]">
              Wear The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Curated premium brands meets digital artistry.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-900 transition-all flex items-center gap-2 mx-auto">
              Explore Shop <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </header>

      {/* 3. INFINITE BRAND MARQUEE (New!) */}
      <div className="py-8 border-y border-gray-100 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-4 text-center">
            <p className="text-xs font-bold text-gray-400 tracking-[0.3em] uppercase">Trusted Premium Partners</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <motion.div 
            className="flex gap-16 whitespace-nowrap py-2"
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {/* Duplicate brands list to create seamless loop */}
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="text-2xl md:text-4xl font-bold text-gray-300 uppercase tracking-tighter hover:text-black transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </motion.div>
          {/* Fading edges */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      {/* 4. HORIZONTAL SCROLL DROPS */}
      <section className="py-16">
        <div className="container mx-auto px-4 mb-6 flex justify-between items-end">
          <h2 className="text-2xl font-bold tracking-tight">🔥 New Drops</h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Swipe for more</span>
        </div>
        <div className="overflow-x-auto no-scrollbar pb-8 pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))]">
          <div className="flex gap-4 min-w-max pr-4">
            {newDrops.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-[280px] md:w-[320px] group cursor-pointer"
              >
                <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-xl transition-all duration-500">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">No Image</div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-lg">{product.title}</p>
                    <p className="text-gray-300">{formatTHB(product.price)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MAIN SHOP GRID */}
      <main className="container mx-auto px-4 pb-20" id="shop">
        <div className="sticky top-16 z-40 bg-[#F8F9FA]/95 backdrop-blur-md py-4 mb-8 -mx-4 px-4 border-b border-gray-200/50">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <Link href={`/product/${product.slug}`} key={product.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
  {/* ใส่ก้อนนี้เข้าไปแทน 👇 */}
  {product.image ? (
    <Image 
      src={product.image} 
      alt={product.title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  ) : null}
  
  <button className="absolute top-2 right-2 p-2 bg-white/80 ...">
     <Heart className="w-4 h-4" />
  </button>
</div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">{product.category || 'Collection'}</p>
                    <p className="text-sm font-bold text-black">{formatTHB(product.price)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* 6. JOURNAL / BLOG SECTION (SEO Ready) */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h2 className="text-3xl font-bold mb-2">The Journal</h2>
               <p className="text-gray-500">Stories about design, culture, and future.</p>
            </div>
            <Link href="#" className="hidden md:flex items-center gap-2 text-sm font-bold border-b border-black pb-1 hover:text-gray-600 transition">
               Read All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
               <div key={post.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl mb-6 relative aspect-video">
                     <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category}
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-sm font-bold underline decoration-gray-300 underline-offset-4 group-hover:decoration-blue-600 transition-all">Read Article</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MOBILE DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm md:hidden">
        <div className="bg-black/85 backdrop-blur-xl text-white rounded-full px-6 py-4 shadow-2xl flex justify-between items-center border border-white/10 ring-1 ring-white/20">
          <Link href="#" className="flex flex-col items-center gap-1 text-blue-400">
            <Home className="w-5 h-5" />
          </Link>
          <Link href="#shop" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <Search className="w-5 h-5" />
          </Link>
          <div className="relative -top-8">
            <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/40 border-[6px] border-[#F8F9FA]">
              <ShoppingBag className="w-6 h-6" />
            </button>
          </div>
          <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <BookOpen className="w-5 h-5" />
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}