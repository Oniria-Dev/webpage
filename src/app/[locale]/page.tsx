import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "../../i18n/navigation";
import { Button } from "../../components/ui/button";
import { Isotipo } from "../../components/brand/logo";
import { ProductCard } from "../../components/product-card";
import { Section, em } from "../../components/section";
import { products } from "../../lib/products";

type Item = { title: string; description: string; example?: string };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}


export default function LandingPage() {
  const t = useTranslations("Home");
  const nav = useTranslations("Navigation");

  return (
    <main>
      {/* Hero: always the Negro field, in both themes */}
      <section className="dark bg-background text-foreground">
        <div className="wrap grid items-center gap-12 pt-20 pb-16 md:grid-cols-[1.5fr_1fr] md:pt-32 md:pb-24">
          <div>
            <p className="mono-label text-muted-foreground">{t("hero.label")}</p>
            <h1 className="mt-6 text-[clamp(2.75rem,8vw,6rem)]">{t.rich("hero.title", em)}</h1>
            <p className="mt-8 max-w-[52ch] text-lg text-muted-foreground">{t("hero.lead")}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild className="h-11 rounded-full px-5 text-sm">
                <Link href="/products">
                  {t("hero.products")}
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 rounded-full px-5 text-sm">
                <Link href="/about">{t("hero.about")}</Link>
              </Button>
            </div>
          </div>
          <Isotipo aria-hidden className="hidden w-full max-w-[340px] justify-self-end md:block" />
        </div>
        {/* The 0° line, the brand's recurring graphic */}
        <div className="wrap flex items-center gap-4 pb-8">
          <span className="mono-label">0°</span>
          <span className="h-0.5 flex-1 bg-foreground" />
          <span className="mono-label hidden text-muted-foreground sm:inline">{nav("signature")}</span>
        </div>
      </section>

      {/* What we do */}
      <Section id="que-hacemos" index="01" label={t("what.label")} title={t.rich("what.title", em)} intro={t("what.intro")} className="border-t-0">
        <div className="grid gap-10 md:grid-cols-3">
          {(t.raw("what.items") as Item[]).map((item) => (
            <div key={item.title} className="border-t border-foreground pt-5">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
              <p className="mono-label mt-6 text-muted-foreground">{t("what.example")}</p>
              <p className="mt-1 font-medium">{item.example}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Products */}
      <Section index="02" label={t("products.label")} title={t.rich("products.title", em)} intro={t("products.intro")}>
        <div className="grid gap-12 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section index="03" label={t("how.label")} title={t.rich("how.title", em)} intro={t("how.intro")}>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw("how.steps") as Item[]).map((step, i) => (
            <li key={step.title} className="border-t border-border pt-5">
              <p className="mono-label text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-3 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Origin */}
      <Section index="04" label={t("origin.label")} title={t.rich("origin.title", em)} className="bg-muted">
        <p className="max-w-[60ch] text-lg text-muted-foreground">{t("origin.body")}</p>
        <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 active:opacity-70">
          {t("origin.link")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>
    </main>
  );
}
