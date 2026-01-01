import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lessons / Episodes',
  type: 'document',
  fields: [
    defineField({name: 'course', title: 'Course', type: 'reference', to: [{type: 'course'}], validation: (r) => r.required()}),
    defineField({name: 'titleAr', title: 'Lesson title (AR)', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'titleEn', title: 'Lesson title (EN)', type: 'string'}),
    defineField({name: 'order', title: 'Order', type: 'number', validation: (r) => r.required()}),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Cloudinary/Bunny/etc)',
      type: 'url',
      description: 'ضع رابط الفيديو المباشر أو رابط Cloudinary secure_url',
      validation: (r) => r.required(),
    }),
    defineField({name: 'poster', title: 'Poster image (optional)', type: 'image', options: {hotspot: true}}),
    defineField({name: 'durationMin', title: 'Duration (minutes) (optional)', type: 'number'}),
  ],
})
