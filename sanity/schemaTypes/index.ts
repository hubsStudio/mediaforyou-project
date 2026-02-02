import { type SchemaTypeDefinition } from 'sanity'

// --- 1. Import ไฟล์จากแต่ละแผนก ---

// Common (ใช้ร่วมกัน)
import blockContent from './blockContent'
import siteSettings from './siteSettings'

// Blog Section (ดึงจากโฟลเดอร์ blog)
import post from './blog/post'
import author from './blog/author'
import category from './blog/category'

// E-commerce Section (ดึงจากโฟลเดอร์ ecommerce)
// *ต้องสร้างไฟล์ product.ts ก่อนนะครับ ถ้ายังไม่สร้าง ให้คอมเมนต์บรรทัดนี้ไว้ก่อน*
import product from './ecommerce/product' 

// Marketing Section (ดึงจากโฟลเดอร์ marketing)
// *ต้องสร้างไฟล์ testimonial.ts ก่อนนะครับ ถ้ายังไม่สร้าง ให้คอมเมนต์บรรทัดนี้ไว้ก่อน*
import testimonial from './marketing/testimonial' 

// --- 2. รวมรายชื่อ Schema ทั้งหมด ---
const schemaTypesList = [
  // Site Config
  siteSettings,
  blockContent,
  
  // Blog Content
  post,
  author,
  category,

  // Shop Content
  product,

  // Marketing Content
  testimonial,
]

// --- 3. ส่งออก (Export) ---
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypesList,
}

// Support for older configs
export const schemaTypes = schemaTypesList