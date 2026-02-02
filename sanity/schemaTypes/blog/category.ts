// sanity/schemaTypes/blog/category.ts
import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  // จัดกลุ่มเพื่อความสะอาดตาในหน้า Studio
  groups: [
    {name: 'general', title: '⚙️ General'},
    {name: 'style', title: '🎨 Styling'},
    {name: 'seo', title: '🔍 SEO'},
  ],
  fields: [
    // --- 1. GENERAL INFO ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    // ⭐ Feature เด็ด: Parent Category (ทำ Sub-category ได้)
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'ถ้าหมวดนี้เป็นหมวดย่อย ให้เลือกหมวดแม่ตรงนี้ (เช่น "SEO" อยู่ภายใต้ "Marketing")',
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'general',
    }),

    // --- 2. STYLING (สำหรับ Frontend) ---
    // ⭐ Feature เด็ด: Color Coding
    defineField({
      name: 'color',
      title: 'Badge Color',
      type: 'string',
      description: 'สีสำหรับป้ายชื่อหมวดหมู่ (เช่น #FF0000)',
      options: {
        list: [
          {title: 'Blue (Tech)', value: 'blue'},
          {title: 'Green (Growth)', value: 'green'},
          {title: 'Purple (Design)', value: 'purple'},
          {title: 'Orange (Marketing)', value: 'orange'},
        ],
      },
      group: 'style',
    }),
    // ⭐ รูปประจำหมวดหมู่ (Cover Image)
    defineField({
      name: 'image',
      title: 'Category Cover Image',
      type: 'image',
      options: {hotspot: true},
      group: 'style',
    }),

    // --- 3. SEO (สำคัญมากสำหรับเว็บใหญ่) ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'ชื่อที่จะโชว์บน Google Search Result',
      group: 'seo',
    }),
  ],
})