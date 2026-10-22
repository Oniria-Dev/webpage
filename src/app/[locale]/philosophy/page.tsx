import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";

import photo from "@/public/images/crucita.webp";
import { Cedula } from "@/src/components/cedula";
import { RevealOnScroll } from "@/src/components/reveal-on-scroll";

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

// The manifesto: seven beliefs set large, each with its explanation beside it.
// The first one opens on the boat it talks about.
export default function PhilosophyPage() {
  const t = useTranslations("Philosophy");
  const items = t.raw("items") as Item[];

  return (
    <main className="bg-white px-[calc(clamp(4px,1.5vw,16px)+24px)] pt-[clamp(32px,5vw,80px)] pb-[clamp(80px,10vw,160px)] text-[#0a0a0b]">
      <h1 className="font-editorial font-bold text-[clamp(44px,6.4vw,112px)] leading-[0.98] tracking-normal">{t("title")}</h1>
      <p className="mt-8 max-w-[52ch] text-[clamp(18px,1.5vw,22px)] leading-snug">{t("lead")}</p>

      {/* role="list": Safari drops list semantics from an ol without markers. */}
      <ol role="list" className="mt-[clamp(80px,10vw,160px)] flex flex-col gap-[clamp(80px,10vw,160px)]">
        {items.map((item, i) => (
          <li key={item.title}>
            {i === 0 ? (
              <figure className="-mx-[calc(clamp(4px,1.5vw,16px)+24px)] mb-[clamp(40px,5vw,80px)]">
                <div data-reveal className="relative aspect-[4/3] md:aspect-[21/9]">
                  <Image
                    src={photo}
                    alt="A small boat alone on a glittering sea off Crucita, Ecuador"
                    fill
                    sizes="100vw"
                    className="object-cover object-[46%_62%]"
                  />
                </div>
                <div data-reveal className="relative z-10 mx-[calc(clamp(4px,1.5vw,16px)+24px)] -mt-8">
                  <Cedula as="figcaption" className="text-[24px]">
                    Crucita, Ecuador. 2026
                  </Cedula>
                </div>
              </figure>
            ) : null}
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-12">
              <h2
                data-reveal
                className="font-editorial text-[clamp(34px,6.4vw,112px)] leading-none font-normal tracking-normal md:col-span-8"
              >
                {item.title}
              </h2>
              <p
                data-reveal
                className="max-w-[46ch] text-[clamp(18px,1.5vw,22px)] leading-snug md:col-span-4 md:pt-[0.5em]"
              >
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p data-reveal className="mt-[clamp(80px,10vw,160px)]">
        <a
          href="mailto:info@oniriasolutions.com"
          className="font-editorial text-[clamp(28px,3vw,48px)] underline decoration-1 underline-offset-[0.15em] transition-opacity hover:opacity-55 active:opacity-55"
        >
          {t("cta")}
        </a>
      </p>
      <RevealOnScroll />
    </main>
  );
}
