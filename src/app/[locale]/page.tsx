import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";

import heroPhoto from "@/public/images/crucita-hero.webp";
import { ScrambleTitle } from "@/src/components/scramble-title";
import { ProductsWheel } from "@/src/components/products-wheel";


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
          {/* Darkens the top so the white header reads; clear from 80% down. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(10_10_11/0.85)_0%,rgb(10_10_11/0.45)_35%,rgb(10_10_11/0)_80%)]"
          />
          <h1 className="font-grotesk absolute inset-0 grid place-content-center px-6 text-center text-[clamp(30px,3vw,44px)] leading-[1.02] font-normal tracking-[-0.035em] text-white">
            <span>{t("line1")}</span>
            <span>{t("line2")}</span>
          </h1>
          {/* Pinned just under the boat. The photo is object-cover and
              centred, so its scale is max(width/900, height/506) and a point
              (x, y) in the 900×506 file sits at 50% + (x - 450, y - 253) × scale. */}
          <figcaption
            className="font-editorial absolute -translate-x-full bg-[#ED1C24] px-2.5 py-1 text-[clamp(15px,1.2vw,19px)] leading-tight whitespace-nowrap text-white"
            style={{
              // Right edge flush with the boat's stern (x ≈ 646).
              left: "calc(50cqw + 196 * max(100cqw / 900, 100cqh / 506))",
              top: "calc(50cqh + 92 * max(100cqw / 900, 100cqh / 506))",
            }}
          >
            Crucita, Ecuador. 2026
          </figcaption>
      </figure>
      {/* Straddles the photo's bottom edge: shifted up by half its own height,
          and the type is filled with a hard red/black split at that same half,
          so whatever sits over the photo is red and the rest is black. The
          half it leaves behind is the gap before what follows. */}
      <div className="relative z-10 -translate-y-1/2 px-[calc(clamp(4px,1.5vw,16px)+24px)]">
        <ScrambleTitle
          text={t("title")}
          className="font-editorial bg-[linear-gradient(to_bottom,#ED1C24_50%,#0a0a0b_50%)] bg-clip-text text-[clamp(44px,6.4vw,112px)] leading-[0.98] font-bold tracking-normal text-transparent [font-synthesis:weight]"
        />
      </div>
      <ProductsWheel />
    </main>
  );
}
