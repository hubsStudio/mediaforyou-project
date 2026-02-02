// sanity/schemaTypes/blog/post.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Journal / Articles',
  type: 'document',
  groups: [
    { name: 'content', title: '✍️ Content' },
    { name: 'seo', title: '🚀 SEO & Google' },
    { name: 'social', title: '📲 Social Media' },
  ],
  fields: [
    // --- 1. CONTENT ZONE ---
    defineField({
      name: 'title',
      title: 'Headline (H1)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().error('หัวข้อบทความห้ามว่าง!'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'ลิงก์ของบทความ (เช่น /journal/future-fashion)',
      options: { source: 'title', maxLength: 96 },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    // เพิ่ม Excerpt (บทคัดย่อ)
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Short Summary)',
      type: 'text',
      rows: 2,
      description: 'บทคัดย่อสั้นๆ ไว้โชว์หน้าหน้ารวมบทความ (Card)',
      group: 'content',
      validation: (rule) => rule.max(200),
    }),
    // เพิ่ม Author
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (For SEO)',
          description: 'สำคัญมาก! อธิบายภาพนี้ให้ Google รู้',
          validation: (rule) => rule.required(),
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'blockContent',
      group: 'content',
    }),

    // --- 2. SEO WAR ROOM ---
    defineField({
      name: 'seoTitle',
      title: 'Meta Title (Google Search)',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'focusKeywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
      group: 'seo',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Google (NoIndex)',
      type: 'boolean',
      initialValue: false,
      group: 'seo',
    }),

    // --- 3. SOCIAL MEDIA CONTROL ---
    defineField({
      name: 'socialImage',
      title: 'Facebook/Twitter Image',
      type: 'image',
      group: 'social',
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Share Title',
      type: 'string',
      group: 'social',
    }),
  ],
})