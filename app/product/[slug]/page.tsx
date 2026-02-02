import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const prisma = new PrismaClient()

// ส่วนนี้จำเป็นสำหรับ Next.js App Router เพื่อดึงค่า slug จาก URL
interface PageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: PageProps) {
  // ดึงสินค้าชิ้นเดียว โดยหาจาก slug
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  // ถ้าไม่เจอสินค้า (เช่น มั่ว URL มา) ให้ดีดไปหน้า 404
  if (!product) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar แบบง่าย */}
      <nav className="p-4 border-b">
        <div className="container mx-auto">
          <Link href="/" className="text-sm text-gray-500 hover:text-black">
            ← กลับไปหน้าร้านค้า
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ฝั่งซ้าย: รูปภาพใหญ่ */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* ฝั่งขวา: ข้อมูลและการสั่งซื้อ */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.title}</h1>
            <p className="text-gray-500 mb-6 text-lg leading-relaxed">
              {product.description || "สินค้าคุณภาพพรีเมียม สั่งผลิตพิเศษสำหรับคุณ"}
            </p>

            <div className="text-3xl font-bold text-blue-600 mb-8">
              ฿{product.price.toLocaleString()}
            </div>

            {/* ปุ่ม Actions */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg">
                ใส่ตะกร้าเลย 🛒
              </button>
              
              {/* นี่คือปุ่มที่จะพาไป Web 2.5 ในอนาคต */}
              <button className="w-full bg-white border-2 border-black text-black text-lg font-bold py-4 rounded-xl hover:bg-gray-50 transition">
                ✨ ปรับแต่งลายสินค้านี้ (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}ิ