"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- Fallback Data (ใช้ก่อนเชื่อม Sanity) ---
const HERO_DATA = {
  heading: "REDEFINE YOUR STYLE",
  subheading: "Experience the perfect blend of comfort and urban aesthetics. Designed for those who dare to lead, not follow.",
  // วิดีโอแฟชั่นเท่ๆ (ฟรีจาก Pexels)
  videoUrl: "https://videos.pexels.com/video-files/3756003/3756003-hd_1920_1080_25fps.mp4", 
  // รูปสำรองกรณีวิดีโอไม่เล่น
  image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  buttons: [
    { label: "Shop Men", link: "/shop/men", style: "Primary (Black)" },
    { label: "Shop Women", link: "/shop/women", style: "Secondary (White)" },
  ]
};

interface HeroProps {
  sanityData?: any; // รองรับข้อมูลจริงในอนาคต
}

export default function Hero({ sanityData }: HeroProps) {
  // ใช้ข้อมูลจริงถ้ามี ถ้าไม่มีใช้ Fallback
  const data = sanityData || HERO_DATA;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 1. Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Overlay สีดำจางๆ เพื่อให้อ่านตัวหนังสือออก */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {data.videoUrl ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src={data.videoUrl} type="video/mp4" />
            {/* ถ้าวิดีโอเล่นไม่ได้ จะโชว์รูปแทน */}
            <img src={data.image} alt="Hero Background" className="w-full h-full object-cover" />
          </video>
        ) : (
          <img 
            src={data.image} 
            alt="Hero Background" 
            className="w-full h-full object-cover animate-in fade-in duration-1000" 
          />
        )}
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-5xl mx-auto mt-16">
        
        {/* Animated Text */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 drop-shadow-xl animate-in slide-in-from-bottom-5 fade-in duration-1000">
          {data.heading}
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-200">
          {data.subheading}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-300">
          {data.buttons.map((btn: any, idx: number) => (
            <Link 
              key={idx} 
              href={btn.link}
              className={`
                px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 flex items-center gap-2 group
                ${btn.style === 'Primary (Black)' 
                  ? 'bg-white text-black hover:bg-gray-200 border border-transparent' 
                  : 'bg-transparent text-white border border-white hover:bg-white hover:text-black backdrop-blur-sm'}
              `}
            >
              {btn.label}
              {/* ลูกศรขยับได้เมื่อเอาเมาส์ชี้ */}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

      </div>

      {/* 3. Scroll Indicator (ลูกศรเด้งๆ ด้านล่าง) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/70">
        <span className="text-xs font-medium uppercase tracking-widest mb-2 block text-center">Explore</span>
        <ArrowRight className="rotate-90 mx-auto" />
      </div>

    </div>
  );
}