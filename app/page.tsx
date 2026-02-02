import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import BrandMarquee from "@/components/features/BrandMarquee";
import Footer from "@/components/layout/Footer";

// ข้อมูลจำลองสำหรับ Bento Grid
const CATEGORIES = [
  { name: "Premium Hoodies", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800", col: "col-span-2", row: "row-span-2" },
  { name: "Eco Tees", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", col: "col-span-1", row: "row-span-1" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800", col: "col-span-1", row: "row-span-2" },
  { name: "Headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800", col: "col-span-1", row: "row-span-1" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION: ความประทับใจแรก */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000"
            alt="Streetwear Fashion Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content (Golden Ratio Typography) */}
        <div className="relative z-10 text-center text-white px-4">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm backdrop-blur-md mb-4 animate-fade-in-up">
            New Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
            REDEFINE <br/> STREETWEAR
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Global designs printed on premium brands like Champion & Adidas.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE: ความน่าเชื่อถือ */}
      <BrandMarquee />

      {/* 3. BENTO GRID: หมวดหมู่สินค้า (Web3 Style) */}
      <section className="container mx-auto px-4 py-gr-5">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Curated Collections</h2>
          <Link href="/collections" className="text-sm border-b border-black pb-0.5 hover:text-gray-600 transition">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {CATEGORIES.map((cat, i) => (
            <Link 
              href={`/shop/${cat.name.toLowerCase().replace(' ', '-')}`} 
              key={i} 
              className={`relative group overflow-hidden rounded-2xl ${cat.col} ${cat.row} min-h-[200px]`}
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{cat.name}</h3>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. VALUE PROPOSITION: ทำไมต้องซื้อ? */}
      <section className="bg-gray-50 py-gr-5">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
            <p className="text-gray-500 text-sm">Printed on brands you trust like Champion, Adidas, and Nike.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Global Shipping</h3>
            <p className="text-gray-500 text-sm">Production hubs in US, EU, UK, and Asia for faster delivery.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Made to Order</h3>
            <p className="text-gray-500 text-sm">Sustainable production that reduces waste and carbon footprint.</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <Footer />
    </div>
  );
}