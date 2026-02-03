"use client";

// โลโก้แบรนด์จำลอง (ใช้ Text ไปก่อน หรือจะเปลี่ยนเป็น Image ก็ได้)
const BRANDS = ["NIKE", "ADIDAS", "CHAMPION", "PUMA", "SUPREME", "STUSSY", "OFF-WHITE", "YEEZY"];

export default function BrandMarquee() {
  return (
    <div className="w-full py-8 bg-black overflow-hidden border-y border-gray-800">
      <div className="relative w-full flex overflow-x-hidden">
        
        {/* แถวที่ 1 */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {BRANDS.map((brand, i) => (
            <span key={i} className="text-2xl md:text-4xl font-bold text-transparent stroke-text mx-8 uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-default">
              {brand}
            </span>
          ))}
        </div>

        {/* แถวที่ 2 (Copy เพื่อให้ Loop เนียน) */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
          {BRANDS.map((brand, i) => (
            <span key={`copy-${i}`} className="text-2xl md:text-4xl font-bold text-transparent stroke-text mx-8 uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* CSS เล็กน้อยสำหรับ Outline Text และ Animation */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}