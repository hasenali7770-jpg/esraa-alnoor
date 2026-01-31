import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Dashboard")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),

      S.listItem().title("Courses").child(S.documentTypeList("course").title("Courses")),
      S.listItem().title("Lessons").child(S.documentTypeList("lesson").title("Lessons")),
    ]);
