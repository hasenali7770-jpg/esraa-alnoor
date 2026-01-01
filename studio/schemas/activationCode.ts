import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'activationCode',
  title: 'Activation codes',
  type: 'document',
  fields: [
    defineField({name: 'code', title: 'Code', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'course', title: 'Course', type: 'reference', to: [{type: 'course'}], validation: (r) => r.required()}),
    defineField({name: 'expiresAt', title: 'Expires at', type: 'datetime'}),
    defineField({name: 'maxUses', title: 'Max uses', type: 'number', initialValue: 1}),
    defineField({name: 'uses', title: 'Uses', type: 'number', initialValue: 0, readOnly: true}),
    defineField({name: 'active', title: 'Active', type: 'boolean', initialValue: true}),
    defineField({name: 'note', title: 'Note (optional)', type: 'string'}),
  ],
})
