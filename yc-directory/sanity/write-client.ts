import "server-only";

import { createClient } from "next-sanity";

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "vX",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

if (!writeClient.config().token) {
  throw new Error("Write token not found.");
}
