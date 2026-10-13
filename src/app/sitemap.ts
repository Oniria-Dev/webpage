import { MetadataRoute } from "next";

const BASE_URL = "https://oniriasolutions.com";
const LOCALES = ["en", "es"];
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "",                     priority: 1.0, changeFrequency: "weekly" },
  { path: "/products",             priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/argos-suite", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/oniric",      priority: 0.8, changeFrequency: "monthly" },
  { path: "/about",                priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );
}
