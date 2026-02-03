import { type SchemaTypeDefinition } from 'sanity'

// --- 1. Import ไฟล์จากแต่ละแผนก ---

// Common (ใช้ร่วมกัน)
import blockContent from './blockContent'
import siteSettings from './siteSettings'
import navigation from './navigation' // ✅ 1. เพิ่ม Navigation ที่เราเพิ่งคุยกัน

// Blog Section (Content Marketing)
import post from './blog/post'
import author from './blog/author'
import category from './blog/category'

// E-commerce Section (สินค้าและการขาย)
import product from './ecommerce/product'
// import brand from './ecommerce/brand'        // 💡 แนะนำ: สร้างเพิ่มเพื่อจัดการ Logo แบรนด์ต่างๆ
// import collection from './ecommerce/collection' // 💡 แนะนำ: สร้างเพิ่มเพื่อจัดเซ็ตสินค้า (เช่น Summer 2026)

// Marketing & Pages (การตลาดและหน้า Landing Page)
import testimonial from './marketing/testimonial'
// import page from './marketing/page'          // 💡 แนะนำ: สร้างเพิ่มเพื่อทำ Page Builder (ต่อบล็อกเอง)
// import faq from './marketing/faq'            // 💡 แนะนำ: สร้างเพิ่มสำหรับหน้า Help Center

import footer from './footer'
import hero from './hero'

// --- 2. รวมรายชื่อ Schema ทั้งหมด ---
const schemaTypesList = [
  // ⚙️ Configuration
  siteSettings,
  navigation,     // 👈 อย่าลืมใส่ตรงนี้ด้วยนะครับ

  // 📝 Blog Content
  post,
  author,
  category,
  blockContent,

  // 🛍️ Shop Content
  product,
  brand,     
  // collection,  // (รอสร้างไฟล์)

  // 📣 Marketing & Layout
  testimonial,
  // page,        // (รอสร้างไฟล์)
  // faq,         // (รอสร้างไฟล์)

  siteSettings,
  navigation,

  footer,
  hero,
  
  
]

// --- 3. ส่งออก (Export) ---
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypesList,
}

// Support for older configs
export const schemaTypes = schemaTypesList