import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image, { StaticImageData } from "next/image";

import humboldt from "@/public/images/archive/humboldt-tableau-physique-1807.jpg";
import khipu from "@/public/images/archive/khipu-inca-cleveland.jpg";
import jacquard from "@/public/images/archive/telar-jacquard-1867.jpg";
import meridian from "@/public/images/archive/meridiana-quito-1748.jpg";
import quito from "@/public/images/archive/plano-quito-1748.jpg";
import { Cedula } from "@/src/components/cedula";
import { Dreamcatcher } from "@/src/components/dreamcatcher";
import { RevealOnScroll } from "@/src/components/reveal-on-scroll";
import { Section, plain } from "@/src/components/section";
import { cn } from "@/src/lib/utils";

type Item = { title: string; description: string };
type Archive = { title: string; medium: string; author: string; credit: string; alt: string };

// The archive pictures' source pages, in the order of About.archive.
const SOURCES = [
  "https://www.biodiversitylibrary.org/item/37872",
  "https://www.clevelandart.org/art/1940.469",
  "https://wellcomecollection.org/works/nbxw869a",
  "https://archive.org/details/BUSA313_203",
  "https://archive.org/details/BUSA313_202",
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

/** An archive picture in the 12-column grid, `span` placing it, with its credit under it. */
function Plate({ image, item, source, span, sizes, className, imageClassName }: {
  image: StaticImageData;
  item: Archive;
  source: string;
  span: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("grid md:grid-cols-12 md:gap-x-8", className)}>
      <figure className={span}>
        <Image data-reveal src={image} alt={item.alt} sizes={sizes} className={cn("h-auto w-full", imageClassName)} />
        <Credit item={item} source={source} />
      </figure>
    </div>
  );
}

// Between a section's intro and its content.
const lead = "mb-[clamp(64px,8vw,128px)]";

export default function AboutPage() {
  const t = useTranslations("About");
  const home = useTranslations("Home");
  const parts = t.raw("concept.parts") as Item[];
  const steps = home.raw("how.steps") as Item[];
  // Found pictures, credited, never shown as our own; one per section.
  const archive = t.raw("archive") as Archive[];

  return (
    <main className="bg-white text-[#0a0a0b]">
      <div className={`${gutter} pt-[clamp(32px,5vw,80px)]`}>
        <h1 className="font-editorial max-w-[22ch] text-[clamp(36px,6.4vw,112px)] leading-[0.98] font-bold tracking-normal">
          {t.rich("title", plain)}
        </h1>
        <p className="font-editorial mt-8 max-w-[56ch] text-[clamp(24px,2.5vw,36px)] leading-[1.2]">{t("lead")}</p>
        {/* Humboldt's Chimborazo, full bleed; a phone keeps the volcano and drops the data columns. */}
        <figure className="-mx-[calc(clamp(4px,1.5vw,16px)+24px)] mt-[clamp(64px,8vw,128px)]">
          <Image
            data-reveal
            src={humboldt}
            alt={archive[0].alt}
            sizes="100vw"
            className="aspect-[4/5] w-full object-cover object-[48%_50%] md:aspect-auto"
          />
          <div className={gutter}>
            <Credit item={archive[0]} source={SOURCES[0]} />
          </div>
        </figure>
      </div>

      {/* The dreamcatcher: the isotipo in halftone dots and its four parts, each lighting its zone. */}
      <Section title={t.rich("concept.title", plain)} intro={t("concept.body")} className="pt-[clamp(120px,14vw,220px)]">
        <Plate image={khipu} item={archive[1]} source={SOURCES[1]} span="md:col-span-7" sizes="(min-width: 768px) 58vw, 100vw" className={lead} />
        <Dreamcatcher parts={parts} label="Oniria" />
      </Section>

      <Section title={home.rich("how.title", plain)} intro={home("how.intro")}>
        <Plate image={jacquard} item={archive[2]} source={SOURCES[2]} span="md:col-span-7 md:col-start-6" sizes="(min-width: 768px) 58vw, 100vw" className={lead} />
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

      {/* Quito in the archive: the French Geodesic Mission (1736–1744) measured the meridian here. */}
      <Section title={t.rich("origin.title", plain)} intro={t("origin.body")}>
        {/* The meridian is a 4:1 strip: it takes the whole section to stay legible, and a phone crops to Quito. */}
        <Plate
          image={meridian}
          item={archive[3]}
          source={SOURCES[3]}
          span="md:col-span-12"
          sizes="100vw"
          className={lead}
          imageClassName="aspect-[3/2] object-cover object-[30%_50%] md:aspect-auto"
        />
        <Plate image={quito} item={archive[4]} source={SOURCES[4]} span="md:col-span-7 md:col-start-4" sizes="(min-width: 768px) 58vw, 100vw" />
      </Section>
      <RevealOnScroll />
    </main>
  );
}
