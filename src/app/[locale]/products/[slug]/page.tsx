import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Cedula } from "../../../../components/cedula";
import { TypeCover } from "../../../../components/product-room";
import { RevealOnScroll } from "../../../../components/reveal-on-scroll";
import { Section, plain } from "../../../../components/section";
import { products } from "../../../../lib/products";

type Props = { params: Promise<{ locale: string; slug: string }> };
type Feature = { title: string; description: string };

const gutter = "px-[calc(clamp(4px,1.5vw,16px)+24px)]";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!products.some((p) => p.slug === slug)) return {};
  const t = await getTranslations({ locale, namespace: `Products.items.${slug}` });

  return {
    title: t('name'),
    description: t('tagline'),
  };
}

// The product as a room of its own: the main shot full-bleed with its Cedula,
// then who it is for and what it solves, its features and every screen.
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations("Products");
  const item = `items.${product.slug}` as const;
  const name = t(`${item}.name`);
  const [main, ...screens] = product.images;
  const label = (image: string) => t(`${item}.shots.${image}`);

  return (
    <main className="bg-white text-[#0a0a0b]">
      <figure>
        {main ? (
          <Image
            src={`/products/${product.dir}/${main}.webp`}
            alt={`${name}: ${label(main)}`}
            width={1440}
            height={900}
            priority
            sizes="100vw"
            className="h-auto w-full"
          />
        ) : (
          <TypeCover name={name} />
        )}
        <div className={`relative z-10 -mt-8 ${gutter}`}>
          <Cedula
            as="figcaption"
            name={name}
            medium={`${t(`${item}.category`)}, ${product.year}`}
            origin="Quito, Ecuador"
            className="max-w-full text-[24px]"
          />
        </div>
      </figure>

      <div className={`${gutter} pt-[clamp(48px,6vw,96px)]`}>
        <h1 className="font-editorial text-[clamp(44px,6.4vw,112px)] leading-[0.98] font-bold tracking-normal">{name}</h1>
        <p className="mt-6 max-w-[40ch] text-[clamp(20px,1.8vw,26px)] leading-snug">{t(`${item}.tagline`)}</p>
        <p className="mt-4 max-w-[60ch] text-[clamp(17px,1.3vw,19px)] leading-relaxed">{t(`${item}.description`)}</p>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-[#0a0a0b] px-7 py-4 text-[18px] text-white transition-opacity hover:opacity-80 active:opacity-70"
          >
            {t("visit", { name })} ↗
          </a>
        )}
      </div>

      {/* Who it is for and what it solves, as two statements. */}
      <div className={`${gutter} grid gap-[clamp(32px,4vw,64px)] pt-[clamp(120px,14vw,220px)] md:grid-cols-2`}>
        {(["forWhom", "solves"] as const).map((key) => (
          <p key={key} data-reveal className="font-editorial text-[clamp(24px,2.4vw,36px)] leading-[1.15]">
            {t(`${item}.${key}`)}
          </p>
        ))}
      </div>

      <Section title={t.rich("includes.title", plain)} className="pt-[clamp(120px,14vw,220px)]">
        <ul className="flex flex-col gap-[clamp(32px,4vw,56px)]">
          {(t.raw(`${item}.features`) as Feature[]).map((feature) => (
            <li key={feature.title} className="grid gap-3 md:grid-cols-12 md:gap-x-8">
              <h3 data-reveal className="font-editorial text-[clamp(30px,3vw,48px)] leading-none font-bold tracking-normal md:col-span-5">
                {feature.title}
              </h3>
              <p data-reveal className="max-w-[52ch] text-[clamp(18px,1.5vw,22px)] leading-snug md:col-span-6 md:col-start-7">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {screens.length > 0 && (
        <Section title={t.rich("screens.title", plain)}>
          {/* Full-bleed: out of the section's side margins. */}
          <div className="-mx-[calc(clamp(4px,1.5vw,16px)+24px)] flex flex-col gap-[clamp(64px,8vw,128px)]">
            {screens.map((image) => (
              <figure key={image}>
                <Image
                  data-reveal
                  src={`/products/${product.dir}/${image}.webp`}
                  alt={`${name}: ${label(image)}`}
                  width={1440}
                  height={900}
                  sizes="100vw"
                  className="h-auto w-full"
                />
                <div data-reveal className={`relative z-10 -mt-8 ${gutter}`}>
                  <Cedula as="figcaption" className="text-[24px]">
                    {label(image)}
                  </Cedula>
                </div>
              </figure>
            ))}
          </div>
        </Section>
      )}
      <RevealOnScroll />
    </main>
  );
}
