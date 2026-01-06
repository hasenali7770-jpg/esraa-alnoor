import { defineField, defineType } from "sanity";

export default defineType({
  name: "lesson",
  title: "Lessons",
  type: "document",
  fields: [
    defineField({ name: "titleAr", title: "Title (AR)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),

    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (r) => r.required(),
    }),

    defineField({ name: "order", title: "Lesson order inside course", type: "number", initialValue: 1 }),

    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube / Vimeo / Bunny)",
      type: "url",
      validation: (r) => r.required(),
    }),

    defineField({ name: "freePreview", title: "Free Preview", type: "boolean", initialValue: false }),
  ],
});
