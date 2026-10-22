"use client"

import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { Link } from "@/src/i18n/navigation"
import { products } from "@/src/lib/products"

const gutter = "px-[calc(clamp(4px,1.5vw,16px)+24px)]"

/**
 * The products as a list on the black field. With a mouse, a white bar slides
 * to the row under the pointer or focus and that product's first shot opens
 * from its centre, inverted wherever it crosses the bar. On touch every shot
 * sits under its row. The last row is the piece still to come.
 */
export function ProductIndex() {
  const t = useTranslations("Products")
  const [active, setActive] = React.useState<number | null>(null)
  const [bar, setBar] = React.useState({ top: 0, height: 0 })
  const shots = React.useRef<HTMLDivElement>(null)

  const enter = (i: number) => (e: React.SyntheticEvent<HTMLLIElement>) => {
    setActive(i)
    setBar({ top: e.currentTarget.offsetTop, height: e.currentTarget.offsetHeight })
  }
  const leave = () => {
    setActive(null)
    shots.current?.style.setProperty("--x", "0px")
    shots.current?.style.setProperty("--y", "0px")
  }
  // The open shot drifts up to 10px toward the pointer; the CSS transition smooths it.
  const drift = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    shots.current?.style.setProperty("--x", `${((e.clientX - box.left) / box.width - 0.5) * 20}px`)
    shots.current?.style.setProperty("--y", `${((e.clientY - box.top) / box.height - 0.5) * 20}px`)
  }

  const row = "transition-colors duration-300"

  return (
    <div className="relative" onMouseMove={drift} onMouseLeave={leave}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden bg-white opacity-0 transition-[translate,height,opacity] duration-350 ease-out data-active:opacity-100 motion-reduce:transition-none pointer-fine:block"
        data-active={active !== null || undefined}
        style={{ translate: `0 ${bar.top}px`, height: bar.height }}
      />
      <div
        ref={shots}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden translate-x-(--x) translate-y-(--y) mix-blend-difference transition-transform duration-300 ease-out motion-reduce:translate-none pointer-fine:block"
      >
        {products.map((product, i) => (
          <div
            key={product.slug}
            data-active={active === i || undefined}
            className="absolute top-1/2 left-[35%] aspect-[16/10] w-[min(30rem,30vw)] -translate-y-1/2 transition-[clip-path] duration-600 ease-[cubic-bezier(0.65,0,0.35,1)] [clip-path:inset(50%)] data-active:z-10 data-active:[clip-path:inset(0)] motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:[clip-path:none] motion-reduce:data-active:opacity-100"
          >
            <Image src={`/products/${product.dir}/${product.images[0]}.webp`} alt="" fill sizes="30rem" className="object-cover" />
          </div>
        ))}
      </div>

      <ul role="list" className="relative" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && leave()}>
        {products.map((product, i) => {
          const name = t(`items.${product.slug}.name`)
          return (
            <li key={product.slug} data-reveal data-active={active === i || undefined} className={`${row} pointer-fine:data-active:text-[#0a0a0b]`} onMouseEnter={enter(i)} onFocus={enter(i)}>
              <Link href={`/products/${product.slug}`} className={`grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-[clamp(12px,1.5vw,24px)] ${gutter}`}>
                <span className="font-editorial col-span-12 text-[clamp(34px,6.4vw,112px)] leading-[0.98] font-bold md:col-span-8">{name}</span>
                <span className="col-span-12 text-[clamp(17px,1.3vw,19px)] leading-snug md:col-span-4">
                  {t(`items.${product.slug}.category`)}
                  <br />
                  {product.year}
                </span>
              </Link>
              <Image
                src={`/products/${product.dir}/${product.images[0]}.webp`}
                alt={`${name}: ${t(`items.${product.slug}.shots.${product.images[0]}`)}`}
                width={1440}
                height={900}
                sizes="100vw"
                className="mb-[clamp(12px,1.5vw,24px)] h-auto w-full pointer-fine:hidden"
              />
            </li>
          )
        })}
        <li
          data-reveal
          data-active={active === products.length || undefined}
          className={`${row} text-white/40 pointer-fine:data-active:text-[#0a0a0b]/40`}
          onMouseEnter={enter(products.length)}
        >
          <p className={`font-editorial py-[clamp(12px,1.5vw,24px)] text-[clamp(34px,6.4vw,112px)] leading-[0.98] font-bold ${gutter}`}>
            {t("next")}
          </p>
        </li>
      </ul>
    </div>
  )
}
