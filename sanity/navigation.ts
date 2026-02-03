import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation Menu (Header)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Name',
      type: 'string',
      description: 'ตั้งชื่อเมนู (เช่น Main Menu)',
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string', // ชื่อเมนู เช่น "Shop", "About"
            }),
            defineField({
              name: 'link',
              title: 'Link URL',
              type: 'string', // ลิงก์ไปหน้าไหน
              hidden: ({ parent }) => parent?.type === 'mega', // ซ่อนถ้าเป็น Mega Menu
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Normal Link', value: 'link' },
                  { title: 'Mega Menu (Stairs)', value: 'mega' },
                ],
                layout: 'radio',
              },
              initialValue: 'link',
            }),
            // --- ส่วนเฉพาะของ Mega Menu ---
            defineField({
              name: 'sections',
              title: 'Menu Sections (Groups)',
              type: 'array',
              hidden: ({ parent }) => parent?.type !== 'mega',
              of: [
                {
                  type: 'object',
                  title: 'Section',
                  fields: [
                    defineField({ name: 'title', type: 'string', title: 'Group Title' }),
                    defineField({
                      name: 'links',
                      title: 'Sub Links',
                      type: 'array',
                      of: [{ type: 'string' }], // รายชื่อเมนูย่อย
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'featuredImage',
              title: 'Featured Image (Right Side)',
              type: 'image',
              hidden: ({ parent }) => parent?.type !== 'mega',
              options: { hotspot: true },
              fields: [
                 defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                 defineField({ name: 'caption', title: 'Caption Text', type: 'string' })
              ]
            }),
          ],
        },
      ],
    }),
  ],
})