import Image from "next/image"
import { useTranslations } from "next-intl"

import { Cedula } from "@/src/components/cedula"
import { Link } from "@/src/i18n/navigation"
import { products, type Product } from "@/src/lib/products"

// A product with no screenshots yet shows its name as the piece: Imbue, huge,
// on black, with the logo's red dot.
function TypeCover({ name }: { name: string }) {
  return (
    <div className="grid aspect-[16/10] w-full place-items-center bg-[#0a0a0b] text-white">
      <span className="font-editorial relative text-[clamp(96px,22vw,360px)] leading-none font-bold">
        {name}
        <span aria-hidden="true" className="absolute top-[0.12em] -right-[0.22em] size-[0.14em] rounded-full bg-[#ED1C24]" />
      </span>
    </div>
  )
}

function Piece({ product }: { product: Product }) {
  const t = useTranslations("Products")
  const name = t(`items.${product.slug}.name`)
  return (
    <Link href={`/products/${product.slug}`} className="group block transition-opacity active:opacity-70">
      <div className="overflow-hidden">
        {product.images.length ? (
          <Image
            src={`/products/${product.dir}/${product.images[0]}.webp`}
            alt={name}
            width={1440}
            height={900}
            sizes="100vw"
            className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <TypeCover name={name} />
        )}
      </div>
      {/* Pulled up over the picture's bottom edge, like a label on the wall
          under a painting. */}
      <Cedula
        name={name}
        medium={`${t(`items.${product.slug}.category`)}, ${product.year}`}
        origin="Quito, Ecuador"
        className="relative z-10 mx-[calc(clamp(4px,1.5vw,16px)+24px)] -mt-8 max-w-[calc(100%-2*(clamp(4px,1.5vw,16px)+24px))] text-[24px]"
      />
    </Link>
  )
}

/** Every product as a full-bleed piece with its Cedula, each linking to its page. */
export function ProductRoom() {
  return (
    <div className="flex flex-col gap-[clamp(64px,9vw,144px)]">
      {products.map((product) => (
        <Piece key={product.slug} product={product} />
      ))}
    </div>
  )
}
