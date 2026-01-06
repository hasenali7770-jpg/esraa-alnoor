import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-06";

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function GET(req: Request, { params }: { params: { locale: string } }) {
  const locale = (params?.locale === "en" ? "en" : "ar") as "ar" | "en";

  const query = `*[_type=="course"] | order(order asc) {
    _id,
    "slug": slug.current,
    "title": select($locale == "en" => coalesce(titleEn, titleAr), titleAr),
    "short": select($locale == "en" => coalesce(shortEn, shortAr), shortAr),
    "tags": select($locale == "en" => coalesce(tagsEn, []), coalesce(tagsAr, [])),
    priceIQD,
    order,
    "coverImageUrl": coverImage.asset->url
  }`;

  const courses = await client.fetch(query, { locale });

  return NextResponse.json({ ok: true, courses });
}
