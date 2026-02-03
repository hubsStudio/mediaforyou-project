import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand (แบรนด์สินค้า)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string', // เช่น Nike, Adidas
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: { hotspot: true }, // เอาไว้โชว์เล็กๆ ในเมนู
    }),
    defineField({
      name: 'heroImage',
      title: 'Brand Hero Image',
      type: 'image',
      description: 'รูปใหญ่ที่จะโชว์ในเมนูฝั่งขวา หรือหัวข้อหน้าแบรนด์',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text', // เรื่องราวของแบรนด์
    }),
  ],
})