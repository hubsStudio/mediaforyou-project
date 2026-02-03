"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image1: string; // รูปหลัก
  image2: string; // รูปตอน Hover
  isNew?: boolean;
  category: string;
  slug: string;
}

export default function ProductCard({ 
  name, price, originalPrice, image1, image2, isNew, category, slug 
}: ProductCardProps) {
  
  // คำนวณส่วนลด %
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative w-full">
      {/* 1. Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 mb-4">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button (โผล่มามุมขวาบน) */}
        <button className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white">
          <Heart size={16} />
        </button>

        <Link href={`/product/${slug}`}>
          {/* Main Image */}
          <Image
            src={image1}
            alt={name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
          {/* Second Image (Hover) */}
          <Image
            src={image2}
            alt={`${name} hover`}
            fill
            className="absolute inset-0 object-cover opacity-0 transition-all duration-700 scale-105 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {/* Quick Add Button (Slide Up Interaction) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button className="w-full bg-white text-black font-bold py-3 rounded-lg shadow-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
            <ShoppingBag size={16} /> Quick Add
          </button>
        </div>
      </div>

      {/* 2. Product Info */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{category}</p>
        <Link href={`/product/${slug}`}>
          <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-gray-900">฿{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ฿{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}