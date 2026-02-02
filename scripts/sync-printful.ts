// scripts/sync-printful.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Printful API Endpoint
const PRINTFUL_API_URL = 'https://api.printful.com/store/products'

async function main() {
  console.log('🔄 Connecting to Printful API...')

  const token = process.env.PRINTFUL_ACCESS_TOKEN

  if (!token) {
    throw new Error('❌ Error: PRINTFUL_ACCESS_TOKEN is missing in .env file')
  }

  // 1. Fetch data from Printful
  const response = await fetch(PRINTFUL_API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`❌ API Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const products = data.result

  console.log(`📦 Found ${products.length} products in your Printful store.`)

  // 2. Insert into Supabase
  for (const item of products) {
    // Generate a URL-friendly slug (e.g., "My T-Shirt" -> "my-t-shirt")
    const generatedSlug = item.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')

    console.log(`Processing: ${item.name}...`)

    // Using upsert: If it exists, update it. If not, create it.
    // NOTE: Adapted to match your current schema (using String for category)
    await prisma.product.upsert({
      where: { slug: generatedSlug }, // Check existence by slug
      update: {
        title: item.name,
        image: item.thumbnail_url,
      },
      create: {
        title: item.name,
        slug: generatedSlug,
        description: `Imported from Printful (Printful ID: ${item.id})`,
        price: 590, // Default price (can be updated later)
        stock: 100, // Default stock
        category: 'Printful Import', // Using String as per your schema
        image: item.thumbnail_url,
      },
    })
  }

  console.log('✅ Success! All products have been synced to Supabase.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })