// Copy lives in messages/*.json under Products.items.<slug>; images in public/products/<dir>/<name>.webp.
export const products = [
  {
    slug: "argos-suite",
    dir: "argos",
    images: ["panel", "guarderia", "veterinaria", "finanzas"],
    url: undefined,
  },
  {
    slug: "oniric",
    dir: "oniric",
    images: [],
    url: "https://oniric.oniriasolutions.com",
  },
] as const;

export type Product = (typeof products)[number];
