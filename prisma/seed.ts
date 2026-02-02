// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // สร้างสินค้าตัวอย่าง 1 ชิ้น
  const product = await prisma.product.create({
    data: {
      title: 'เสื้อยืด Media For You รุ่น Limited',
      description: 'เสื้อยืดผ้า Cotton 100% ใส่สบาย ออกแบบลายเองได้',
      price: 590,
      image: 'https://placehold.co/600x400/png', // รูปสมมติ
      category: 'T-Shirt',
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