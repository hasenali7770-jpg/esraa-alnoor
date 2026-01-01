import {createClient} from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityEnabled = Boolean(projectId && dataset);

export const sanityClient = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion: "2025-01-01",
      useCdn: true,
    })
  : null;
