import { createClient } from "@sanity/client"; // Import createClient as a named export
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "luhx5wg8",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-06-29", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
