'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Search, Menu, X, Globe, ChevronRight, User, Heart 
} from 'lucide-react'

// --- 1. CONFIG & DATA ---
const NAV_LINKS = [
  { name: 'Shop', href: '/shop' },
  { name: 'Collections', href: '/collections' },
  { name: 'Journal', href: '/blog' }, // เปลี่ยนจาก Blog เป็น Journal ให้ดูขลัง
  { name: 'About', href: '/about' },
]

// เมนูสำหรับ Mobile (Stairs Style)
const MOBILE_MENU = [
  { name: 'New Arrivals', href: '/shop/new' },
  { name: 'Best Sellers', href: '/shop/best' },
  { name: 'Eco-Friendly', href: '/shop/eco' },
  { name: 'Accessories', href: '/shop/accessories' },
  ...NAV_LINKS
]

// --- 2. SUB-COMPONENTS ---

// 🌐 Preferences Modal (เลือกภาษา/ค่าเงิน)
const PreferencesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl p-gr-4 z-[70] shadow-2xl border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Preferences</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black">
                  <option>🇹🇭 Thailand</option>
                  <option>🇺🇸 United States</option>
                  <option>🇯🇵 Japan</option>
                  <option>🇪🇺 Europe</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black">
                    <option>THB (฿)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black">
                    <option>English</option>
                    <option>ไทย</option>
                  </select>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="w-full mt-8 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">
              Save Preferences
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// --- 3. MAIN COMPONENT ---
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPrefOpen, setIsPrefOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // ตรวจจับ Scroll เพื่อเปลี่ยนสี Header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen 
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-gr-2' 
            : 'bg-transparent py-gr-3'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* 1. LOGO & HAMBURGER (Left) */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight uppercase hidden sm:block">
                Media<span className="text-blue-600">4</span>You
              </span>
            </Link>
          </div>

          {/* 2. DESKTOP NAV (Center) */}
          <nav className="hidden md:flex items-center gap-8 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-sm">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-black hover:bg-white px-3 py-1 rounded-md transition-all relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-black transition-all group-hover:w-1/2" />
              </Link>
            ))}
          </nav>

          {/* 3. ACTIONS (Right) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search (Expandable) */}
            <div className="hidden lg:flex relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-gray-100/50 rounded-full text-sm border-transparent focus:bg-white focus:ring-2 focus:ring-black w-32 focus:w-64 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Preferences (Globe) */}
            <button 
              onClick={() => setIsPrefOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-black"
              aria-label="Preferences"
            >
              <Globe className="w-5 h-5" />
            </button>
            
            {/* User & Cart */}
            <Link href="/account" className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-black">
              <User className="w-5 h-5" />
            </Link>
            
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <ShoppingBag className="w-5 h-5 group-hover:fill-black/10 transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            </Link>
          </div>
        </div>
      </header>

      {/* --- MOBILE STAIRS MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[100] md:hidden flex flex-col shadow-2xl"
            >
              {/* Menu Header */}
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <span className="font-bold text-xl tracking-tight">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items (Stairs Animation) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {MOBILE_MENU.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }} // 👈 Magic Number: สร้าง Effect ขั้นบันได
                  >
                    <Link 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="flex justify-between items-center py-3 border-b border-gray-50 text-lg font-medium text-gray-800 hover:text-blue-600 hover:pl-2 transition-all"
                    >
                      {item.name}
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Menu Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                 <button 
                   onClick={() => { setIsMobileMenuOpen(false); setIsPrefOpen(true); }}
                   className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
                 >
                   <Globe className="w-4 h-4" /> TH / THB
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* เรียกใช้ Modal ตรงนี้ */}
      <PreferencesModal isOpen={isPrefOpen} onClose={() => setIsPrefOpen(false)} />
    </>
  )
}