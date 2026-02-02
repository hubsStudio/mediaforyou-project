import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: '📦 Products',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Product Name', type: 'string'}),
    defineField({name: 'price', title: 'Price', type: 'number'})
  ]
})