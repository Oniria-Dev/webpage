import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";

import meridian from "@/public/images/archive/meridiana-quito-1752.jpg";
import quito from "@/public/images/archive/plano-quito-1736.jpg";
import bouguer from "@/public/images/archive/bouguer-figure-de-la-terre-1749.jpg";
import routes from "@/public/images/archive/viaje-la-condamine-1749.jpg";
import { Cedula } from "@/src/components/cedula";
import { RevealOnScroll } from "@/src/components/reveal-on-scroll";
import { Section, plain } from "@/src/components/section";
import { HalftoneMark } from "@/src/components/ui/halftone-mark";
import { ISOTIPO_MARKUP, ISOTIPO_VIEWBOX } from "@/src/components/brand/lockup-markup";

type Item = { title: string; description: string };
type Archive = { title: string; medium: string; author: string; credit: string; alt: string };

// The archive pictures' source pages, in the order of About.origin.archive.
const SOURCES = [
  "https://commons.wikimedia.org/wiki/File:%22Pl._XXI_A-B-C%22_(19864899908).jpg",
  "https://commons.wikimedia.org/wiki/File:1736_French_Draft_of_the_Plan_of_Quito.jpg",
  "https://commons.wikimedia.org/wiki/File:Illustrations_de_Le_figure_de_la_terre..._Voyage_au_P%C3%A9rou._-_(Non_identifi%C3%A9)_;_Pierre_Bouguer_(aut._du_texte)_-_btv1b20000441_(8_of_9).jpg",
  "https://commons.wikimedia.org/wiki/File:Voyage_aller_et_retour_de_La_Condamine_1735_1744.jpg",
];

const gutter = "px-[calc(clamp(4px,1.5vw,16px)+24px)]";

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

/** An archive picture's Cedula and, under it, the credit that links to its source. */
function Credit({ item, source }: { item: Archive; source: string }) {
  return (
    // Pulled up over the picture from md; on a phone the long titles would cover it.
    <figcaption className="relative z-10 md:-mt-8">
      <div data-reveal>
        <Cedula name={item.title} medium={item.medium} origin={item.author} className="max-w-full text-[24px]" />
      </div>
      <p className="mt-3 text-base">
        <a href={source} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 transition-opacity hover:opacity-55">
          {item.credit}
        </a>
      </p>
    </figcaption>
  );
}

export default function AboutPage() {
  const t = useTranslations("About");
  const home = useTranslations("Home");
  const parts = t.raw("concept.parts") as Item[];
  const steps = home.raw("how.steps") as Item[];
  const archive = t.raw("origin.archive") as Archive[];

  return (
    <main className="bg-white text-[#0a0a0b]">
      <div className={`${gutter} pt-[clamp(32px,5vw,80px)]`}>
        <h1 className="font-editorial max-w-[22ch] text-[clamp(36px,6.4vw,112px)] leading-[0.98] font-bold tracking-normal">
          {t.rich("title", plain)}
        </h1>
        <p className="font-editorial mt-8 max-w-[56ch] text-[clamp(24px,2.5vw,36px)] leading-[1.2]">{t("lead")}</p>
      </div>

      {/* The dreamcatcher: the isotipo in halftone dots and its four parts. */}
      <Section title={t.rich("concept.title", plain)} intro={t("concept.body")} className="pt-[clamp(120px,14vw,220px)]">
        <div className="grid items-center gap-[clamp(40px,5vw,80px)] md:grid-cols-12">
          <div data-reveal className="md:col-span-6">
            <HalftoneMark
              source={{ kind: "svg", markup: ISOTIPO_MARKUP, viewBox: ISOTIPO_VIEWBOX }}
              label="Oniria"
              className="w-full max-w-[640px]"
            />
          </div>
          <ul className="flex flex-col gap-8 md:col-span-5 md:col-start-8">
            {parts.map((part) => (
              <li key={part.title} data-reveal>
                <Cedula className="text-[24px]">{part.title}</Cedula>
                <p className="mt-3 max-w-[44ch] text-[clamp(18px,1.5vw,22px)] leading-snug">{part.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title={home.rich("how.title", plain)} intro={home("how.intro")}>
        {/* role="list": Safari drops list semantics from an ol without markers. */}
        <ol role="list" className="flex flex-col gap-[clamp(40px,5vw,72px)]">
          {steps.map((step) => (
            <li key={step.title} className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-x-8">
              <h3 data-reveal className="font-editorial text-[clamp(56px,9vw,160px)] leading-[0.9] font-bold tracking-normal md:col-span-7">
                {step.title}
              </h3>
              <p data-reveal className="max-w-[44ch] text-[clamp(18px,1.5vw,22px)] leading-snug md:col-span-5">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Quito in the archive: the French Geodesic Mission (1736–1744) measured
          the meridian here. Found pictures, credited, never shown as our own. */}
      <Section title={t.rich("origin.title", plain)} intro={t("origin.body")}>
        <figure className="-mx-[calc(clamp(4px,1.5vw,16px)+24px)]">
          <Image
            data-reveal
            src={meridian}
            alt={archive[0].alt}
            sizes="100vw"
            className="aspect-[3/2] w-full object-cover object-[28%_50%] md:aspect-auto"
          />
          <div className={gutter}>
            <Credit item={archive[0]} source={SOURCES[0]} />
          </div>
        </figure>
        <div className="mt-[clamp(64px,8vw,128px)] grid gap-[clamp(64px,8vw,128px)] md:grid-cols-12 md:gap-x-8">
          <figure className="md:col-span-7">
            <Image data-reveal src={quito} alt={archive[1].alt} sizes="(min-width: 768px) 58vw, 100vw" className="h-auto w-full" />
            <Credit item={archive[1]} source={SOURCES[1]} />
          </figure>
          <figure className="md:col-span-5 md:mt-[clamp(80px,12vw,200px)]">
            <Image data-reveal src={bouguer} alt={archive[2].alt} sizes="(min-width: 768px) 40vw, 100vw" className="h-auto w-full" />
            <Credit item={archive[2]} source={SOURCES[2]} />
          </figure>
          <figure className="md:col-span-6 md:col-start-4">
            <Image data-reveal src={routes} alt={archive[3].alt} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
            <Credit item={archive[3]} source={SOURCES[3]} />
          </figure>
        </div>
      </Section>
      <RevealOnScroll />
    </main>
  );
}
