import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer (ส่วนท้ายเว็บ)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'ตั้งชื่อ Footer (เช่น Main Footer)',
      initialValue: 'Main Footer',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Column',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Column Header' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Link',
                  fields: [
                    defineField({ name: 'label', type: 'string', title: 'Label' }),
                    defineField({ name: 'url', type: 'string', title: 'URL' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', type: 'string', title: 'Facebook URL' }),
        defineField({ name: 'instagram', type: 'string', title: 'Instagram URL' }),
        defineField({ name: 'twitter', type: 'string', title: 'Twitter / X URL' }),
        defineField({ name: 'youtube', type: 'string', title: 'YouTube URL' }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2026 MediaForYou. All rights reserved.',
    }),
  ],
})