import Hero from "@/components/Hero"; // 👈 เรียกตัวเทพที่เราทำไว้
import BrandMarquee from "@/components/features/BrandMarquee"; // 👈 เดี๋ยวสร้างไฟล์นี้กัน
import FeaturedProducts from "@/components/home/FeaturedProducts"; //
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Truck, Recycle } from "lucide-react"; // ใช้ Icon ให้ครบ

// ข้อมูลจำลอง (อนาคตเราจะย้ายไป Sanity)
const CATEGORIES = [
  { name: "Premium Hoodies", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800", col: "col-span-2", row: "row-span-2" },
  { name: "Eco Tees", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", col: "col-span-1", row: "row-span-1" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800", col: "col-span-1", row: "row-span-2" },
  { name: "Headwear", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800", col: "col-span-1", row: "row-span-1" },
];

export default async function Home() {
  // ตรงนี้สามารถดึงข้อมูล Sanity สำหรับ Hero ได้ในอนาคต
  // const heroData = await client.fetch(...)

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION: ดึงจาก Component หลัก */}
      <Hero />

      {/* 2. INFINITE MARQUEE: แถบแบรนด์วิ่ง */}
      <BrandMarquee />

      {/* 3. BENTO GRID: หมวดหมู่สินค้า */}
      <FeaturedProducts />

      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-8">
          <div>
             <h2 className="text-3xl md:text-4xl font-bold mb-2">Curated Collections</h2>
             <p className="text-gray-500">Explore our latest drops</p>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-sm font-medium border-b border-black pb-0.5 hover:text-gray-600 transition">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {CATEGORIES.map((cat, i) => (
            <Link 
              href={`/shop/${cat.name.toLowerCase().replace(' ', '-')}`} 
              key={i} 
              className={`relative group overflow-hidden rounded-2xl ${cat.col} ${cat.row} min-h-[200px] bg-gray-100`}
            >
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                <span className="text-sm font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. VALUE PROPOSITION: จุดขาย */}
      
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Star className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl mb-3">Premium Quality</h3>
            <p className="text-gray-500 leading-relaxed max-w-xs">Authorized retailer for Champion, Adidas, and global streetwear icons.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl mb-3">Global Shipping</h3>
            <p className="text-gray-500 leading-relaxed max-w-xs">Fast delivery from hubs in US, EU, and Asia directly to your door.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <Recycle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-xl mb-3">Eco-Conscious</h3>
            <p className="text-gray-500 leading-relaxed max-w-xs">Sustainable packaging and made-to-order process to reduce waste.</p>
          </div>
        </div>
      </section>

      {/* Footer ลบออกแล้ว เพราะอยู่ใน Layout */}
    </div>
  );
}