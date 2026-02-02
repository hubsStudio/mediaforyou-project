import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next' // 1. import Metadata

const prisma = new PrismaClient()

interface PageProps {
  params: { slug: string }
}

// ---------------------------------------------------------
// ส่วนที่ 1: generateMetadata (สำคัญมากสำหรับ SEO)
// ---------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} | Media For You`, // ชื่อที่จะขึ้นบน Tab Browser และ Google
    description: product.description || `Buy ${product.title} - Premium quality custom design.`,
    openGraph: { // เวลาแชร์ลง Facebook / Twitter / LinkedIn
      title: product.title,
      description: product.description || 'Premium custom design for you.',
      images: product.image ? [{ url: product.image }] : [],
      url: `https://mediaforyou.store/product/${product.slug}`, // ใส่โดเมนจริงของคุณ
      siteName: 'Media For You',
      locale: 'en_US', // บอก Google ว่าเนื้อหาเป็นภาษาอังกฤษ (US)
      type: 'website',
    },
  }
}

// ---------------------------------------------------------
// ส่วนที่ 2: ตัวหน้าเว็บหลัก
// ---------------------------------------------------------
export default async function ProductPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) {
    return notFound()
  }

  // สร้างข้อมูล Structured Data (JSON-LD) สำหรับ Google Shopping
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Media For You',
    },
    offers: {
      '@type': 'Offer',
      url: `https://mediaforyou.store/product/${product.slug}`,
      priceCurrency: 'USD', // ตลาด Inter ต้องใช้ USD
      price: product.price,
      availability: 'https://schema.org/InStock', // หรือ Check stock จริงก็ได้
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ใส่ JSON-LD Script เพื่อให้ Google อ่านเจาะจง */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <nav className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2">
            ← Back to Shop
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* รูปภาพ */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square relative shadow-sm">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* ข้อมูล */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {product.description || "Premium quality, custom-designed just for you. Worldwide shipping available."}
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-black">
                ${product.price.toLocaleString()} {/* เปลี่ยนเป็น $ USD */}
              </span>
              <span className="text-gray-400 text-lg">USD</span>
            </div>

            {/* ปุ่ม Actions */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg transform active:scale-95">
                Add to Cart 🛒
              </button>
              
              <button className="w-full bg-white border-2 border-black text-black text-lg font-bold py-4 rounded-xl hover:bg-gray-50 transition transform active:scale-95">
                ✨ Customize Design (Coming Soon)
              </button>
            </div>
            
            {/* Trust Badges (เสริมความมั่นใจให้ลูกค้าฝรั่ง) */}
            <div className="mt-8 pt-6 border-t flex gap-4 text-sm text-gray-500">
               <span>🌍 Worldwide Shipping</span>
               <span>🔒 Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}