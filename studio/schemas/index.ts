// schemaTypes/course.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "course",
  title: "Courses",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "ar", title: "Arabic", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.ar",
        maxLength: 96,
      },
    }),
    defineField({
      name: "short",
      title: "Short Description",
      type: "object",
      fields: [
        { name: "ar", type: "text" },
        { name: "en", type: "text" },
      ],
    }),
    defineField({
      name: "priceIQD",
      title: "Price (IQD)",
      type: "number",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
