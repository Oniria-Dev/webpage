import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import type { Product } from "../lib/products";

/* Brand resource: guide lines, the heavier 0° line, and nodes joined by thin lines. */
function NodesGraphic() {
  const nodes = [
    [90, 250], [200, 170], [310, 250], [420, 130], [420, 330], [530, 250], [640, 170], [710, 250],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [6, 7], [5, 7]];
  return (
    <svg viewBox="0 0 800 500" aria-hidden className="dark block w-full rounded-lg bg-background text-foreground">
      {[90, 170, 330, 410].map((y) => (
        <path key={y} d={`M0 ${y}H800`} stroke="currentColor" strokeWidth="1" opacity="0.12" />
      ))}
      <path d="M0 250H800" stroke="currentColor" strokeWidth="3" />
      {links.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          d={`M${nodes[a][0]} ${nodes[a][1]}L${nodes[b][0]} ${nodes[b][1]}`}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6 + i} fill="var(--background)" stroke="currentColor" strokeWidth="2" />
      ))}
      <circle cx="640" cy="170" r="20" fill="var(--dot)" />
    </svg>
  );
}

export function ProductVisual({ product, alt, priority }: { product: Product; alt: string; priority?: boolean }) {
  if (!product.images.length) return <NodesGraphic />;
  return (
    <Image
      src={`/products/${product.dir}/${product.images[0]}.webp`}
      alt={alt}
      width={1440}
      height={900}
      priority={priority}
      sizes="(min-width: 1024px) 560px, 100vw"
      className="h-auto w-full rounded-lg border border-border"
    />
  );
}

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("Products");
  const name = t(`items.${product.slug}.name`);
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <ProductVisual product={product} alt={name} />
      <p className="mono-label mt-5 text-muted-foreground">{t(`items.${product.slug}.category`)}</p>
      <h3 className="mt-1 text-2xl">{name}</h3>
      <p className="mt-2 max-w-[48ch] text-muted-foreground">{t(`items.${product.slug}.tagline`)}</p>
      <p className="mt-4 flex items-center gap-1.5 text-sm font-medium">
        {t("view")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}
