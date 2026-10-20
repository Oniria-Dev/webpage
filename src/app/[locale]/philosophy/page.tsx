import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Item = { title: string; description: string };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Philosophy.Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

// A short numbered manifesto. The header is absolute, so the top padding
// clears the lockup.
export default function PhilosophyPage() {
  const t = useTranslations("Philosophy");
  const items = t.raw("items") as Item[];

  return (
    <main className="bg-white px-[calc(clamp(4px,1.5vw,16px)+24px)] pt-[clamp(140px,14vw,240px)] pb-[clamp(80px,10vw,160px)] text-[#0a0a0b]">
      <p className="mono-label text-muted-foreground">{t("label")}</p>
      <h1 className="font-editorial mt-4 text-[clamp(44px,6.4vw,112px)] leading-[0.98]">{t("title")}</h1>
      <p className="font-grotesk mt-8 max-w-[52ch] text-[clamp(18px,1.5vw,22px)] leading-snug text-muted-foreground">
        {t("lead")}
      </p>

      <ol className="mt-[clamp(56px,7vw,112px)]">
        {items.map((item, i) => (
          <li
            key={item.title}
            className="grid gap-x-8 gap-y-3 border-t border-[#0a0a0b] py-[clamp(24px,3vw,40px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <h2 className="font-editorial flex gap-4 text-[clamp(28px,3vw,48px)] leading-[1.02]">
              <span className="font-grotesk shrink-0 pt-[0.35em] text-[clamp(13px,1vw,15px)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.title}</span>
            </h2>
            <p className="font-grotesk max-w-[46ch] text-[clamp(17px,1.3vw,20px)] leading-snug md:pt-[0.6em]">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <p className="font-editorial mt-[clamp(56px,7vw,112px)] text-[clamp(28px,3vw,48px)]">
        <a href="mailto:info@oniriasolutions.com" className="underline decoration-1 underline-offset-[0.15em] hover:opacity-55">
          {t("cta")}
        </a>
      </p>
    </main>
  );
}
