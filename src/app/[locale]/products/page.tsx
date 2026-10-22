import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ProductRoom } from "../../../components/product-room";
import { em } from "../../../components/section";

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
    <main className="pb-16 md:pb-24">
      <div className="px-[calc(clamp(4px,1.5vw,16px)+24px)] pt-16 pb-[clamp(48px,6vw,96px)] md:pt-24">
        <h1 className="font-editorial max-w-[18ch] text-[clamp(40px,6.4vw,112px)] leading-[0.98] font-bold tracking-normal">{t.rich("title", em)}</h1>
        <p className="mt-6 max-w-[52ch] text-[clamp(18px,1.5vw,22px)] leading-snug">{t("intro")}</p>
      </div>
      <ProductRoom />
    </main>
  );
}
