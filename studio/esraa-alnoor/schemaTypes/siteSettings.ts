import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // نخليها وثيقة وحدة فقط
  fields: [
    defineField({ name: "titleAr", title: "Site Title (AR)", type: "string" }),
    defineField({ name: "titleEn", title: "Site Title (EN)", type: "string" }),

    defineField({ name: "heroTitleAr", title: "Hero Title (AR)", type: "string" }),
    defineField({ name: "heroTitleEn", title: "Hero Title (EN)", type: "string" }),

    defineField({ name: "heroSubtitleAr", title: "Hero Subtitle (AR)", type: "text" }),
    defineField({ name: "heroSubtitleEn", title: "Hero Subtitle (EN)", type: "text" }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({ name: "whatsApp", title: "WhatsApp", type: "string" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "youtube", title: "YouTube", type: "url" }),

    defineField({
      name: "footerTextAr",
      title: "Footer Text (AR)",
      type: "text",
    }),
    defineField({
      name: "footerTextEn",
      title: "Footer Text (EN)",
      type: "text",
    }),
  ],
});
