import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Site Configuration', // เมนูตั้งค่าเว็บไซต์
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Website Name',
      type: 'string',
      description: 'ชื่อเว็บไซต์หลัก (เช่น Media4You)',
    }),
    defineField({
      name: 'description',
      title: 'Global Description',
      type: 'text',
      description: 'คำอธิบายเว็บหลัก สำหรับหน้า Home และ SEO',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Share Image',
      type: 'image',
      description: 'รูปที่จะโชว์เวลาแชร์หน้าเว็บ (ถ้าหน้านั้นไม่มีรูปเฉพาะ)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{type: 'string'}],
      description: 'ลิงก์ Facebook, IG, Twitter ของแบรนด์ (เอาไปโชว์ที่ Footer)',
    }),
  ],
})