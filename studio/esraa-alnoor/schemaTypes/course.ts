import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Courses",
  type: "document",
  fields: [
    defineField({ name: "titleAr", title: "Title (AR)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),

    defineField({ name: "shortAr", title: "Short (AR)", type: "text" }),
    defineField({ name: "shortEn", title: "Short (EN)", type: "text" }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titleEn", maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({ name: "priceIQD", title: "Price (IQD)", type: "number", initialValue: 0 }),

    defineField({ name: "tagsAr", title: "Tags (AR)", type: "array", of: [{ type: "string" }], initialValue: [] }),
    defineField({ name: "tagsEn", title: "Tags (EN)", type: "array", of: [{ type: "string" }], initialValue: [] }),

    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),

    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],
});
