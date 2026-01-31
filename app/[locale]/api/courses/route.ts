import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

const apiVersion =
  process.env.SANITY_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-01-06";

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_PROJECT_ID / SANITY_DATASET");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // بالـ dev خليها false حتى تشوف التغييرات مباشرة، وبالـ prod true للأداء
  useCdn: process.env.NODE_ENV === "production",
});

export async function GET() {
  try {
    const query = `
      *[_type=="course"] | order(coalesce(order, 9999) asc) {
        _id,
        "order": coalesce(order, 9999),
        "priceIQD": coalesce(priceIQD, 0),

        // slug current مع تعويض
        "slug": coalesce(slug.current, ""),

        // عناوين مع تعويض
        "title": {
          "ar": coalesce(titleAr, ""),
          "en": coalesce(titleEn, "")
        },

        "short": {
          "ar": coalesce(shortAr, ""),
          "en": coalesce(shortEn, "")
        },

        "tags": {
          "ar": coalesce(tagsAr, []),
          "en": coalesce(tagsEn, [])
        },

        // صورة الغلاف
        "coverImageUrl": coverImage.asset->url
      }
    `;

    const courses = await client.fetch(query);

    // منع التخزين المؤقت وقت التطوير حتى ما تشوف نتائج قديمة
    return NextResponse.json(
      { ok: true, courses },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: err?.message || "Failed to load courses" },
      { status: 500 }
    );
  }
}
