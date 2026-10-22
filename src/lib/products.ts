// Copy lives in messages/*.json under Products.items.<slug>; images in public/products/<dir>/<name>.webp.
// `year` goes on the product's Cedula, after its category.
export const products = [
  {
    slug: "argos-suite",
    dir: "argos",
    images: ["panel", "guarderia", "veterinaria", "finanzas"],
    year: 2026,
    url: "https://argos.oniriasolutions.com",
  },
  {
    slug: "oniric",
    dir: "oniric",
    images: [],
    year: 2026,
    url: "https://oniric.oniriasolutions.com",
  },
] as const;

export type Product = (typeof products)[number];
