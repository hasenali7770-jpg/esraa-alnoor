import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION || "2026-01-06";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_PROJECT_ID / SANITY_DATASET");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  ...(token ? { token } : {}),
});

export async function POST(req: Request) {
  if (!token) {
    return NextResponse.json({ ok: false, message: "Missing SANITY_API_TOKEN" }, { status: 500 });
  }

  const { code } = await req.json();
  const clean = String(code || "").trim();
  if (!clean) return NextResponse.json({ ok: false, message: "Missing code." }, { status: 400 });

  const doc = await client.fetch(
    `*[_type=="activationCode" && active==true && code==$code][0]{
      _id, code, maxUses, uses, expiresAt,
      "courseSlug": course->slug.current
    }`,
    { code: clean }
  );

  if (!doc) return NextResponse.json({ ok: false, message: "Invalid code." }, { status: 404 });
  if (doc.expiresAt && new Date(doc.expiresAt).getTime() <= Date.now())
    return NextResponse.json({ ok: false, message: "Code expired." }, { status: 410 });
  if (typeof doc.maxUses === "number" && typeof doc.uses === "number" && doc.uses >= doc.maxUses)
    return NextResponse.json({ ok: false, message: "Code already used." }, { status: 409 });

  await client.patch(doc._id).set({ uses: (doc.uses || 0) + 1 }).commit({ autoGenerateArrayKeys: true });

  return NextResponse.json({ ok: true, courseSlug: doc.courseSlug, expiresAt: doc.expiresAt || null });
}
