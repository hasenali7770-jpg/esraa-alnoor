import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-06",
  useCdn: true,
});

export async function GET() {
  const courses = await sanity.fetch(
    `*[_type=="course"]|order(order asc){
      _id,
      "slug": slug.current,
      title,
      short,
      priceIQD,
      tags
    }`
  );

  return NextResponse.json({ courses });
}
