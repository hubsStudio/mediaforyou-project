import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section (หน้าแรก)',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading (หัวข้อหลัก)',
      type: 'string',
      description: 'คำที่เด่นที่สุด เช่น NEW COLLECTION',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (คำโปรย)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'รูปพื้นหลัง (ถ้าไม่ใส่วิดีโอ)',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Optional)',
      type: 'url',
      description: 'ลิงก์ไฟล์วิดีโอ mp4 (ถ้าใส่ จะเล่นวิดีโอแทนรูป)',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Button Text' }),
            defineField({ name: 'link', type: 'string', title: 'Link URL' }),
            defineField({ 
              name: 'style', 
              type: 'string', 
              title: 'Style', 
              options: { list: ['Primary (Black)', 'Secondary (White)', 'Outline'] } 
            }),
          ],
        },
      ],
    }),
  ],
})