import {NextResponse} from "next/server";
import {createClient} from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client =
  projectId && dataset && token
    ? createClient({projectId, dataset, apiVersion: "2025-01-01", useCdn: false, token})
    : null;

export async function POST(req: Request) {
  if (!client) {
    return NextResponse.json({ok: false, message: "Sanity is not configured."}, {status: 500});
  }

  const {code} = await req.json();
  const clean = String(code || "").trim();
  if (!clean) return NextResponse.json({ok: false, message: "Missing code."}, {status: 400});

  const doc = await client.fetch(
    `*[_type=="activationCode" && active==true && code==$code][0]{
      _id, code, maxUses, uses, expiresAt,
      "courseSlug": course->slug.current
    }`,
    {code: clean}
  );

  if (!doc) return NextResponse.json({ok: false, message: "Invalid code."}, {status: 404});
  if (doc.expiresAt && new Date(doc.expiresAt).getTime() <= Date.now())
    return NextResponse.json({ok: false, message: "Code expired."}, {status: 410});
  if (typeof doc.maxUses === "number" && typeof doc.uses === "number" && doc.uses >= doc.maxUses)
    return NextResponse.json({ok: false, message: "Code already used."}, {status: 409});

  await client.patch(doc._id).set({uses: (doc.uses || 0) + 1}).commit({autoGenerateArrayKeys: true});

  return NextResponse.json({ok: true, courseSlug: doc.courseSlug, expiresAt: doc.expiresAt || null});
}
