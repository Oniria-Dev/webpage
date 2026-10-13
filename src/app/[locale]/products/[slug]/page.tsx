import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "../../../../i18n/navigation";
import { Button } from "../../../../components/ui/button";
import { ProductVisual } from "../../../../components/product-card";
import { Section, em } from "../../../../components/section";
import { products } from "../../../../lib/products";

type Props = { params: Promise<{ locale: string; slug: string }> };
type Feature = { title: string; description: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!products.some((p) => p.slug === slug)) return {};
  const t = await getTranslations({ locale, namespace: `Products.items.${slug}` });

  return {
    title: t('name'),
    description: t('tagline'),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations("Products");
  const item = `items.${product.slug}` as const;
  const name = t(`${item}.name`);

  return (
    <main>
      <div className="wrap py-12 md:py-20">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mono-label text-muted-foreground">{t(`${item}.category`)}</p>
            <h1 className="mt-4 text-5xl md:text-7xl">{name}</h1>
            <p className="mt-6 max-w-[32ch] text-2xl tracking-tight">{t(`${item}.tagline`)}</p>
            <p className="mt-6 max-w-[56ch] text-muted-foreground">{t(`${item}.description`)}</p>
            {product.url && (
              <Button asChild className="mt-8 h-11 rounded-full px-5 text-sm">
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  {t("visit", { name })}
                  <ArrowUpRight />
                </a>
              </Button>
            )}
          </div>
          <ProductVisual product={product} alt={name} priority />
        </div>

        <dl className="mt-16 grid gap-10 border-t border-foreground pt-8 md:grid-cols-2">
          {(["forWhom", "solves"] as const).map((key) => (
            <div key={key}>
              <dt className="mono-label text-muted-foreground">{t(key)}</dt>
              <dd className="mt-2 max-w-[48ch] text-lg">{t(`${item}.${key}`)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section index="01" label={t("includes.label")} title={t.rich("includes.title", em)}>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw(`${item}.features`) as Feature[]).map((feature) => (
            <li key={feature.title} className="border-t border-border pt-5">
              <h3 className="text-lg">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {product.images.length > 1 && (
        <Section index="02" label={t("screens.label")} title={t.rich("screens.title", em)}>
          <div className="grid gap-10 md:grid-cols-2">
            {product.images.map((image) => (
              <figure key={image}>
                <Image
                  src={`/products/${product.dir}/${image}.webp`}
                  alt={`${name}: ${t(`${item}.shots.${image}`)}`}
                  width={1440}
                  height={900}
                  sizes="(min-width: 768px) 480px, 100vw"
                  className="h-auto w-full rounded-lg border border-border"
                />
                <figcaption className="mono-label mt-3 text-muted-foreground">{t(`${item}.shots.${image}`)}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
