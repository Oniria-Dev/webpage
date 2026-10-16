import { Fragment } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/src/i18n/navigation"
import { HalftoneMark } from "@/src/components/ui/halftone-mark"
import { LOCKUP_MARKUP, LOCKUP_VIEWBOX } from "@/src/components/brand/lockup-markup"
import { MobileMenu, type NavItem } from "@/src/components/layout/mobile-menu"

const links = [
  { href: "/products", key: "products" },
  { href: "/#que-hacemos", key: "services" },
  { href: "/about", key: "about" },
  // TODO: no /philosophy page yet.
  { href: "/philosophy", key: "philosophy" },
] as const

export function SiteHeader() {
  const t = useTranslations("Navigation")
  const items: NavItem[] = links.map((link) => ({
    href: link.href,
    label:
      link.key === "philosophy"
        ? `“${t(link.key)}”`
        : link.key === "services"
          ? `${t(link.key)}¿`
          : t(link.key),
  }))

  return (
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-[clamp(4px,1.5vw,16px)] pr-[clamp(16px,3vw,40px)]">
        <Link href="/" className="block">
          <HalftoneMark
            source={{ kind: "svg", markup: LOCKUP_MARKUP, viewBox: LOCKUP_VIEWBOX }}
            label="Oniria"
            ink="#ffffff"
            className="w-[clamp(230px,25vw,420px)]"
          />
        </Link>
        <nav className="font-editorial hidden items-baseline gap-x-3 text-[clamp(20px,1.8vw,28px)] leading-tight text-white md:flex">
          {items.map((item, i) => (
            <Fragment key={item.href}>
              {i > 0 ? (
                <span aria-hidden="true" className="font-bold">
                  -
                </span>
              ) : null}
              <Link href={item.href} className="transition-opacity hover:opacity-55 active:opacity-55">
                {item.label}
              </Link>
            </Fragment>
          ))}
        </nav>
        <MobileMenu items={items} label={t("menu")} className="md:hidden" />
      </header>
  )
}
