import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ProductCard } from "../../../components/product-card";
import { em } from "../../../components/section";
import { products } from "../../../lib/products";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProductsPage() {
  const t = useTranslations("Products");

  return (
    <main className="wrap py-16 md:py-24">
      <p className="mono-label text-muted-foreground">{t("label")}</p>
      <h1 className="mt-4 max-w-[16ch] text-5xl md:text-7xl">{t.rich("title", em)}</h1>
      <p className="mt-6 max-w-[60ch] text-lg text-muted-foreground">{t("intro")}</p>

      <div className="mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
