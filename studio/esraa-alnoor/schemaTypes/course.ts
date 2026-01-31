import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Courses",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft (Hidden)", value: "draft" },
          { title: "Published (Visible)", value: "published" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),

    defineField({ name: "titleAr", title: "Title (AR)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),

    defineField({ name: "shortAr", title: "Short (AR)", type: "text" }),
    defineField({ name: "shortEn", title: "Short (EN)", type: "text" }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc: any) => doc?.titleEn || doc?.titleAr,
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "isFree",
      title: "Is Free?",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "priceIQD",
      title: "Price (IQD)",
      type: "number",
      initialValue: 0,
      hidden: ({ document }) => Boolean((document as any)?.isFree),
      validation: (r) => r.min(0),
    }),

    defineField({
      name: "featured",
      title: "Featured Course",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "tagsAr",
      title: "Tags (AR)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [],
    }),
    defineField({
      name: "tagsEn",
      title: "Tags (EN)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [],
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Important for SEO & accessibility",
        }),
      ],
    }),

    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
  ],

  preview: {
    select: {
      titleAr: "titleAr",
      titleEn: "titleEn",
      media: "coverImage",
      status: "status",
      featured: "featured",
      isFree: "isFree",
      priceIQD: "priceIQD",
    },
    prepare(sel: any) {
      const title = sel.titleEn || sel.titleAr || "Untitled course";
      const badges = [
        sel.status === "published" ? "✅ Published" : "📝 Draft",
        sel.featured ? "⭐ Featured" : null,
        sel.isFree ? "🆓 Free" : typeof sel.priceIQD === "number" ? `${sel.priceIQD} IQD` : null,
      ].filter(Boolean);

      return {
        title,
        subtitle: badges.join(" • "),
        media: sel.media,
      };
    },
  },
});
