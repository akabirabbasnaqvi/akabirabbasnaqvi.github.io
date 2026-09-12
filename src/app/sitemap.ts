import type { MetadataRoute } from "next";

const siteUrl = "https://akabirabbas.me";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-09-12"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/case-studies/autotube/`,
      lastModified: new Date("2026-09-12"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
