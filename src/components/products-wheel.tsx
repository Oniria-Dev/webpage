import { useLocale, useTranslations } from "next-intl"

import { WorksWheel, type WorksWheelItem } from "@/src/components/ui/works-wheel"
import { products } from "@/src/lib/products"

// The wheel only reads as a ring with several pieces, and there are two
// products, so for now each product screenshot is its own card.
// TODO: real covers per piece; Oniric has no screenshots yet (cover.svg is a stand-in).
export function ProductsWheel() {
  const t = useTranslations("Products")
  // The wheel renders plain <a>s, so the locale has to be in the href.
  const locale = useLocale()
  const items: WorksWheelItem[] = products.flatMap((p) => {
    const name = t(`items.${p.slug}.name`)
    const href = `/${locale}/products/${p.slug}`
    if (!p.images.length) return [{ title: name, image: `/products/${p.dir}/cover.svg`, href }]
    return p.images.map((img) => ({
      title: `${name} · ${t(`items.${p.slug}.shots.${img}`)}`,
      image: `/products/${p.dir}/${img}.webp`,
      href,
    }))
  })

  return (
    <section className="h-dvh w-full">
      <WorksWheel items={items} label={t("label")} action={t("view")} className="font-editorial" />
    </section>
  )
}
