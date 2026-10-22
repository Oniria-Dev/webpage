import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Isotipo } from "../../../components/brand/logo";
import { Section, em } from "../../../components/section";

type Item = { title: string; description: string };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

function Items({ items, className }: { items: Item[]; className: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.title} className="border-t border-border pt-5">
          <h3 className="text-lg">{item.title}</h3>
          <p className="mt-2 text-muted-foreground">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main>
      <div className="wrap py-16 md:py-24">
        <p className="mono-label text-muted-foreground">{t("label")}</p>
        <h1 className="mt-4 max-w-[18ch] text-5xl md:text-7xl">{t.rich("title", em)}</h1>
        <p className="mt-8 max-w-[60ch] text-xl text-muted-foreground">{t("lead")}</p>
        <Items items={t.raw("facts") as Item[]} className="mt-16 grid gap-10 md:grid-cols-3" />
      </div>

      <Section title={t.rich("concept.title", em)} intro={t("concept.body")}>
        <div className="grid items-center gap-12 md:grid-cols-[240px_1fr]">
          <Isotipo aria-hidden className="w-full max-w-[240px]" />
          <Items items={t.raw("concept.parts") as Item[]} className="grid gap-8 sm:grid-cols-2" />
        </div>
      </Section>

      <Section title={t.rich("traits.title", em)}>
        <Items items={t.raw("traits.items") as Item[]} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" />
      </Section>

      <Section title={t.rich("origin.title", em)} className="bg-muted">
        <p className="max-w-[60ch] text-lg text-muted-foreground">{t("origin.body")}</p>
      </Section>
    </main>
  );
}
