import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product (สินค้า)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'price',
      title: 'Price (THB)',
      type: 'number',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (ถ้ามีลดราคา)',
      type: 'number',
      description: 'ใส่ราคาเต็มถ้าสินค้านี้ลดราคา (เพื่อให้โชว์ขีดฆ่า)',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'isNew',
      title: 'New Arrival?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({ // 🔥 จุดสำคัญสำหรับหน้าแรก
      name: 'isFeatured',
      title: 'Show on Homepage (Featured)?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }], // ต้องมี schema brand ก่อนนะ
    }),
     defineField({
      name: 'category', // เพิ่ม Category
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Accessories', value: 'accessories' },
        ],
      },
    }),
  ],
})