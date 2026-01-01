import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({name: 'key', title: 'Key', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'titleAr', title: 'Title (AR)', type: 'string'}),
    defineField({name: 'titleEn', title: 'Title (EN)', type: 'string'}),
    defineField({name: 'bodyAr', title: 'Body (AR)', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'bodyEn', title: 'Body (EN)', type: 'array', of: [{type: 'block'}]}),
  ],
})
