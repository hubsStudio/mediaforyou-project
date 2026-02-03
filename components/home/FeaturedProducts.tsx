import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock Data (จำลองไปก่อน เดี๋ยวต่อ Sanity)
const PRODUCTS = [
  {
    id: "1",
    name: "Oversized Graphic Hoodie",
    price: 2490,
    category: "Men",
    image1: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1578587018596-3c05c083236e?auto=format&fit=crop&q=80&w=800", // รูปเปลี่ยนตอน Hover
    isNew: true,
    slug: "hoodie-1"
  },
  {
    id: "2",
    name: "Urban Cargo Pants",
    price: 1890,
    originalPrice: 2200, // มีลดราคา
    category: "Men",
    image1: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1517445312882-6468b449b5c3?auto=format&fit=crop&q=80&w=800",
    isNew: false,
    slug: "pants-1"
  },
  {
    id: "3",
    name: "Essential Cotton Tee",
    price: 890,
    category: "Unisex",
    image1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800",
    isNew: true,
    slug: "tee-1"
  },
  {
    id: "4",
    name: "Streetwear Cap",
    price: 590,
    category: "Accessories",
    image1: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    image2: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=800",
    isNew: false,
    slug: "cap-1"
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Weekly Drops</h2>
            <p className="text-gray-500 max-w-md">
              The latest streetwear trends, curated just for you. Limited stock available.
            </p>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 border-b border-black pb-1 hover:text-gray-600 transition">
            View All Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

      </div>
    </section>
  );
}