import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";

import heroPhoto from "@/public/images/crucita-hero.webp";
import { ScrambleTitle } from "@/src/components/scramble-title";
import { ProductRoom } from "@/src/components/product-room";
import { Cedula } from "@/src/components/cedula";
import { HeroTitle } from "@/src/components/hero-title";


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

// The header and mode toggle live in the layout; the header sits over the hero.
export default function LandingPage() {
  const t = useTranslations("Home.Hero");
  const tp = useTranslations("Products");

  return (
    <main className="min-h-dvh bg-white">
      <figure className="relative h-dvh w-full overflow-hidden bg-[#0a0a0b] [container-type:size]">
          <Image
            src={heroPhoto}
            alt="A small boat alone on a glittering sea off Crucita, Ecuador"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Darkens the top so the white header reads and the bottom so the
              h1 reads over the glitter; the boat in between stays clear. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_11/0.85)_0%,rgb(10_10_11/0.45)_35%,rgb(10_10_11/0)_62%,rgb(10_10_11/0.7)_100%)]"
          />
          {/* Bottom-left on the water, on the logo's left edge. Capped by the
              photo's height too, so on wide, short screens it stays below the
              boat. From md up its bottom margin matches the left one (the mode
              toggle is far to its right); on a phone it rises above the toggle. */}
          <HeroTitle className="font-editorial absolute bottom-24 left-0 px-[calc(clamp(4px,1.5vw,16px)+24px)] text-[clamp(44px,min(9vw,14cqh),150px)] leading-[0.95] font-bold tracking-normal text-white md:bottom-[calc(clamp(4px,1.5vw,16px)+24px)]">
            <span className="block">{t("line1")}</span>
            <span className="block">{t("line2")}</span>
          </HeroTitle>
          {/* Pinned just under the boat. The photo is object-cover and
              centred, so its scale is max(width/1080, height/607) and a point
              (x, y) in the 1080×607 file sits at 50% + (x - 540, y - 303.5) × scale. */}
          {/* On a phone the stern is off-screen, so the label stops 16px short
              of the edge; 24px there keeps white on #ED1C24 legible (3:1, large text). */}
          <Cedula
            as="figcaption"
            className="absolute -translate-x-full text-[24px] whitespace-nowrap md:text-[clamp(15px,1.2vw,19px)]"
            style={{
              // Right edge flush with the boat's stern (x ≈ 775).
              left: "min(calc(50cqw + 235 * max(100cqw / 1080, 100cqh / 607)), calc(100cqw - 16px))",
              top: "calc(50cqh + 110 * max(100cqw / 1080, 100cqh / 607))",
            }}
          >
            Crucita, Ecuador. 2026
          </Cedula>
      </figure>
      {/* Straddles the photo's bottom edge: shifted up by one line, and the
          type is filled with a hard red/black split after that same line, so
          the first line sits red over the photo and the rest is black. Splitting
          on a line (not at half the box) keeps a three-line phone title from
          cutting through its letters. The line it leaves behind is the gap
          before what follows. */}
      <div className="relative z-10 -translate-y-[1lh] px-[calc(clamp(4px,1.5vw,16px)+24px)] text-[clamp(44px,6.4vw,112px)] leading-[0.98]">
        <ScrambleTitle
          text={t("title")}
          className="font-editorial bg-[linear-gradient(to_bottom,#ED1C24_1lh,#0a0a0b_1lh)] bg-clip-text font-bold tracking-normal text-transparent"
        />
      </div>
      <section aria-label={tp("label")}>
        <ProductRoom />
      </section>
    </main>
  );
}
