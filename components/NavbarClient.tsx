"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, Search, ShoppingCart, Globe, Menu, ChevronRight 
} from "lucide-react";

// ==========================================
// 1. 📦 DATA STRUCTURE (ข้อมูลสำรอง - Fallback)
// ==========================================
// เปลี่ยนชื่อจาก SHOP_DATA เป็น FALLBACK_MENU เพื่อให้สื่อความหมาย
const FALLBACK_MENU: any = {
  "New & Featured": {
    groups: [
      { title: "Highlights", items: ["New Arrivals", "Bestsellers", "Eco-friendly"] },
      { title: "Collections", items: ["Spring 2026", "Urban Street", "Minimalist"] }
    ],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
  },
  "Men's Clothing": {
    groups: [
      { title: "All Men's Clothing", items: ["View All"] },
      { title: "Shirts", items: ["T-shirts", "All-over shirts", "Polo shirts", "Tank tops", "3/4 sleeve shirts", "Long sleeve shirts", "Embroidered shirts"] },
      { title: "Hoodies & Sweatshirts", items: ["All Hoodies", "Hoodies", "Sweatshirts"] },
      { title: "Outerwear", items: ["Jackets & Vests"] }
    ],
    image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=2070&auto=format&fit=crop"
  },
  "Women's Clothing": {
    groups: [
      { title: "All Women's Clothing", items: ["View All"] },
      { title: "Shirts", items: ["T-shirts", "Polo shirts", "All-over shirts", "Tank tops", "Crop tops", "Embroidered shirts", "3/4 sleeve shirts", "Long sleeve shirts"] },
      { title: "Dresses & Skirts", items: ["Dresses", "Knitwear"] },
      { title: "Outerwear", items: ["Jackets & Vests"] }
    ],
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2035&auto=format&fit=crop"
  },
  "Kid's & Youth": {
    groups: [
      { title: "Clothing", items: ["T-shirts", "Hoodies", "Baby Bibs", "Bodysuits"] },
      { title: "Accessories", items: ["Hats"] }
    ],
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop"
  },
  "Accessories": {
    groups: [
      { title: "Bags", items: ["Tote bags", "Duffle bags", "Drawstring bags", "Fanny packs", "Backpacks", "Handbags"] },
      { title: "Tech Accessories", items: ["Phone cases", "Earphone cases", "Laptop cases", "Mouse pads"] },
      { title: "Headwear", items: ["All Hats", "Dad Hats", "Beanies", "Caps"] },
      { title: "Others", items: ["Hair accessories", "Pins", "Face Masks"] }
    ],
    image: "https://images.unsplash.com/photo-1531303919131-9df51560946b?q=80&w=2070&auto=format&fit=crop"
  },
  "Home & Living": {
    groups: [
      { title: "Wall Art", items: ["Posters", "Framed posters", "Canvas prints", "Metal prints"] },
      { title: "Home Decor", items: ["Holiday decor", "Blankets", "Candles", "Pillows & pillow cases", "Magnets", "Tableware"] },
      { title: "Drinkware", items: ["Water bottles", "Mugs", "Tumblers", "Coasters", "Glassware"] },
      { title: "Stationery", items: ["Postcards", "Notebooks", "Stickers", "Greeting cards"] }
    ],
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop"
  },
  "Brands": {
    groups: [
      { title: "Top Brands", items: ["adidas", "Champion", "Nike", "Under Armour®", "New Balance"] },
      { title: "A-L", items: ["AS Colour", "Atlantis", "BagBase", "Bella + Canvas", "Columbia", "Comfort Colors", "Gildan", "Jerzees", "Lane Seven"] },
      { title: "M-Z", items: ["Next Level", "Otto Cap", "Port Authority", "Puma", "Rabbit Skins", "Stanley/Stella", "The North Face", "Yupoong"] }
    ],
    image: "https://images.unsplash.com/photo-1556906781-9a412961d289?q=80&w=2070&auto=format&fit=crop"
  }
};

const LANGUAGES = [
  { code: "US", label: "English (US)", flag: "🇺🇸" },
  { code: "ES", label: "Español (ES)", flag: "🇪🇸" },
  { code: "UK", label: "English (UK)", flag: "🇬🇧" },
  { code: "FR", label: "Français (FR)", flag: "🇫🇷" },
  { code: "CA", label: "English (CA)", flag: "🇨🇦" },
  { code: "DE", label: "Deutsch (DE)", flag: "🇩🇪" },
  { code: "IT", label: "Italiano (IT)", flag: "🇮🇹" },
  { code: "JP", label: "日本語 (JP)", flag: "🇯🇵" },
];

// ==========================================
// 2. 🧩 COMPONENTS
// ==========================================
interface NavbarClientProps {
  sanityMenu?: any; // รับข้อมูลจาก sanity (อาจจะเป็น null ได้)
}

export default function NavbarClient({ sanityMenu }: NavbarClientProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("New & Featured");
  const [showPreferences, setShowPreferences] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState(LANGUAGES[0]);

  // 🔥 หัวใจสำคัญ: ระบบ Hybrid
  // ถ้า sanityMenu ส่งมา (มีข้อมูลจริง) -> ใช้ sanityMenu
  // ถ้า sanityMenu เป็น null (ยังไม่ได้เชื่อม/ดึงไม่ได้) -> ใช้ FALLBACK_MENU
  const menuData = sanityMenu || FALLBACK_MENU;

  // ฟังก์ชันปิดเมนูเมื่อเอาเมาส์ออก
  const handleMouseLeave = () => {
    setActiveMenu(null);
    setShowPreferences(false);
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300 font-sans"
      onMouseLeave={handleMouseLeave}
    >
      {/* --- Main Bar --- */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* 1. Logo */}
        <Link href="/" className="flex-shrink-0 z-50">
          <span className="text-2xl font-bold tracking-tighter text-black">
            MEDIA<span className="text-blue-600">FOR</span>YOU
          </span>
        </Link>

        {/* 2. Center Menu (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {["Home", "Shop", "About", "Blog", "Contact"].map((item) => (
            <div 
              key={item}
              className="relative h-full flex items-center"
              onMouseEnter={() => {
                setActiveMenu(item);
                if (item === "Shop") setActiveCategory(Object.keys(menuData)[0] || "New & Featured");
              }}
            >
              <Link 
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  activeMenu === item ? "text-blue-600" : "text-gray-600 hover:text-black"
                }`}
              >
                {item}
                {item === "Shop" && <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "Shop" ? "rotate-180" : ""}`} />}
              </Link>
            </div>
          ))}
        </div>

        {/* 3. Right Icons */}
        <div className="flex items-center gap-4 sm:gap-6 z-50">
          {/* Search */}
          <button className="text-gray-600 hover:text-blue-600 transition-colors">
            <Search size={20} strokeWidth={2} />
          </button>

          {/* User / Sign In */}
          <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-gray-600">
            <Link href="/signin" className="hover:text-black">Sign in</Link>
            <span className="text-gray-300">|</span>
            <Link href="/signup" className="hover:text-black">Sign up</Link>
          </div>

          {/* Preferences (Lang/Currency) */}
          <div className="relative">
            <button 
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              onClick={() => setShowPreferences(!showPreferences)}
            >
              <Globe size={20} strokeWidth={2} />
            </button>
            
            {/* Preferences Dropdown */}
            {showPreferences && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Currency</p>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="THB">THB (฿)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Language</p>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {LANGUAGES.map((lang) => (
                        <button 
                          key={lang.code}
                          onClick={() => setLanguage(lang)}
                          className={`w-full text-left px-2 py-1.5 text-sm rounded-md flex items-center gap-2 ${language.code === lang.code ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors group">
            <ShoppingCart size={20} strokeWidth={2} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
              2
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="lg:hidden text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* ==========================================
          🌊 MEGA MENU (SHOP) - The "Stairs" Layout
      ========================================== */}
      {activeMenu === "Shop" && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200 hidden lg:block">
          <div className="max-w-[1440px] mx-auto flex h-[500px]">
            
            {/* COLUMN 1: Sidebar Categories (Left) */}
            <div className="w-64 border-r border-gray-100 bg-gray-50/50 flex flex-col py-6">
              {Object.keys(menuData).map((catName) => (
                <button
                  key={catName}
                  onMouseEnter={() => setActiveCategory(catName)}
                  className={`flex items-center justify-between px-8 py-3 text-sm font-medium transition-all ${
                    activeCategory === catName 
                      ? "text-blue-600 bg-white border-r-2 border-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  {catName}
                  {activeCategory === catName && <ChevronRight size={14} />}
                </button>
              ))}
            </div>

            {/* COLUMN 2: Content Grid (Middle) - STAIRS STYLE */}
            <div className="flex-1 p-10 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{activeCategory}</h2>
                <Link href={`/shop/${activeCategory.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                  View all products <ChevronRight size={14} />
                </Link>
              </div>

              {/* Grid Layout for Sub-categories (Stairs effect) */}
              <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                {menuData[activeCategory] && menuData[activeCategory].groups.map((group: any, idx: number) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-2">
                      {group.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {group.items.map((item: string) => (
                        <li key={item}>
                          <Link 
                            href={`/shop/${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-[15px] text-gray-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: Featured Image (Right) */}
            <div className="w-[340px] p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent z-10" />
                {menuData[activeCategory] && (
                    <img 
                    src={menuData[activeCategory].image} 
                    alt={activeCategory}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                )}
                <div className="absolute bottom-8 left-8 z-20 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2 bg-white/20 backdrop-blur-md inline-block px-2 py-1 rounded">Featured</p>
                  <h3 className="text-2xl font-bold leading-tight">Explore our<br/>{activeCategory}</h3>
                  <button className="mt-4 text-sm font-medium border-b border-white hover:text-blue-200 hover:border-blue-200 transition-colors">
                    Shop Collection
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}