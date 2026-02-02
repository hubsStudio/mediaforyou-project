// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // สร้างสินค้าตัวอย่าง 1 ชิ้น
  const product = await prisma.product.create({
    data: {
      title: 'Premium Cotton T-Shirt | Limited Edition Custom Design Apparel',
      slug: 'media-foryou-limited-shirt',
      description: 'Discover our Limited Edition Premium Cotton T-Shirt–100% soft cotton, breathable comfort, and customizable design. Perfect for fashion lovers seeking exclusive apparel in 2026.',
      price: 29,
      image: 'https://placehold.co/600x400/png', // รูปสมมติ
      category: 'Apparel',
      stock: 100,
    },
  })
  console.log('✅ เพิ่มสินค้าตัวอย่างสำเร็จ:', product)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })