import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({name: 'brandName', title: 'Brand name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
    defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
    defineField({name: 'whatsapp', title: 'WhatsApp (local)', type: 'string'}),
    defineField({name: 'whatsappWaMe', title: 'WhatsApp wa.me', type: 'url'}),
    defineField({name: 'pricingCourse', title: 'Course price (IQD)', type: 'number'}),
    defineField({name: 'pricingMonthly', title: 'Monthly subscription (IQD)', type: 'number'}),
    defineField({name: 'pricingSemiAnnual', title: 'Semi-annual (IQD)', type: 'number'}),
    defineField({name: 'pricingAnnual', title: 'Annual (IQD)', type: 'number'}),
  ],
})
