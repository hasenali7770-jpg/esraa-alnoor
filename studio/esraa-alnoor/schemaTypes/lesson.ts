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
      name: "videoSource",
      title: "Video Source",
      type: "string",
      initialValue: "url",
      options: {
        list: [
          { title: "URL (YouTube/Vimeo/Bunny...)", value: "url" },
          { title: "Upload file (Sanity)", value: "file" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ document }) => (document as any)?.videoSource !== "url",
      validation: (r) =>
        r.custom((val, ctx) => {
          const doc: any = ctx.document;
          if (doc?.videoSource === "url" && !val) return "Video URL is required";
          return true;
        }),
    }),

    defineField({
      name: "videoFile",
      title: "Video File (Upload)",
      type: "file",
      hidden: ({ document }) => (document as any)?.videoSource !== "file",
      options: {
        accept: "video/*",
      },
      validation: (r) =>
        r.custom((val, ctx) => {
          const doc: any = ctx.document;
          if (doc?.videoSource === "file" && !val) return "Video file is required";
          return true;
        }),
    }),

    defineField({
      name: "durationMinutes",
      title: "Duration (minutes)",
      type: "number",
      initialValue: 0,
      validation: (r) => r.min(0),
    }),

    defineField({
      name: "description",
      title: "Lesson Description",
      type: "text",
    }),

    defineField({
      name: "attachments",
      title: "Attachments (PDF/ZIP)",
      type: "array",
      of: [{ type: "file" }],
      initialValue: [],
    }),

    defineField({ name: "freePreview", title: "Free Preview", type: "boolean", initialValue: false }),
  ],

  preview: {
    select: {
      titleAr: "titleAr",
      titleEn: "titleEn",
      courseTitleAr: "course.titleAr",
      courseTitleEn: "course.titleEn",
      order: "order",
      freePreview: "freePreview",
      durationMinutes: "durationMinutes",
    },
    prepare(sel: any) {
      const title = sel.titleEn || sel.titleAr || "Untitled lesson";
      const courseTitle = sel.courseTitleEn || sel.courseTitleAr || "No course";
      const badges = [
        `#${sel.order ?? 0}`,
        sel.freePreview ? "🎁 Free" : null,
        sel.durationMinutes ? `⏱ ${sel.durationMinutes}m` : null,
      ].filter(Boolean);

      return {
        title,
        subtitle: `${courseTitle} • ${badges.join(" • ")}`,
      };
    },
  },
});
