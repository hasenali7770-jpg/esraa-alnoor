import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

<<<<<<< HEAD
const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-06";

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_PROJECT_ID / SANITY_DATASET");
}

=======
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2025-01-01";

>>>>>>> 0fd0750 (Fix CourseCard + enable Sanity images)
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function GET() {
<<<<<<< HEAD
  try {
    const courses = await client.fetch(
      `*[_type == "course"] | order(order asc) {
        _id,
        "slug": slug.current,
        "title": {
          "ar": titleAr,
          "en": coalesce(titleEn, titleAr)
        },
        "short": {
          "ar": shortAr,
          "en": coalesce(shortEn, shortAr)
        },
        "tags": {
          "ar": coalesce(tagsAr, []),
          "en": coalesce(tagsEn, [])
        },
        "priceIQD": coalesce(priceIQD, 0),
        "order": coalesce(order, 0),
        "coverImageUrl": coverImage.asset->url
      }`
    );

    return NextResponse.json({ ok: true, courses });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
=======
  const courses = await client.fetch(`
    *[_type=="course"] | order(order asc) {
      _id,
      "slug": slug.current,
      "title": { "ar": titleAr, "en": titleEn },
      "short": { "ar": shortAr, "en": shortEn },
      "tags": { "ar": tagsAr, "en": tagsEn },
      priceIQD,
      order,
      "coverImageUrl": coverImage.asset->url
    }
  `);

  return NextResponse.json({ ok: true, courses });
>>>>>>> 0fd0750 (Fix CourseCard + enable Sanity images)
}
