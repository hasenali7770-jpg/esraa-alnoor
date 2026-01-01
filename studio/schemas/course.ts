import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Courses',
  type: 'document',
  fields: [
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'titleAr', maxLength: 96}}),
    defineField({name: 'titleAr', title: 'Title (AR)', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'titleEn', title: 'Title (EN)', type: 'string'}),
    defineField({name: 'shortAr', title: 'Short desc (AR)', type: 'text'}),
    defineField({name: 'shortEn', title: 'Short desc (EN)', type: 'text'}),
    defineField({name: 'detailsAr', title: 'Details (AR)', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'detailsEn', title: 'Details (EN)', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'priceIQD', title: 'Price (IQD)', type: 'number'}),
    defineField({name: 'hoursMin', title: 'Minimum hours', type: 'number'}),
    defineField({name: 'tagsAr', title: 'Tags (AR)', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'tagsEn', title: 'Tags (EN)', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'cover', title: 'Cover image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'published', title: 'Published', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Sort order', type: 'number', initialValue: 0}),
  ],
})
