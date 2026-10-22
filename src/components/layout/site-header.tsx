"use client"

import { Fragment } from "react"
import { useTranslations } from "next-intl"

import { Link, usePathname } from "@/src/i18n/navigation"
import { HalftoneMark } from "@/src/components/ui/halftone-mark"
import { LOCKUP_MARKUP, LOCKUP_VIEWBOX } from "@/src/components/brand/lockup-markup"
import { MobileMenu, type NavItem } from "@/src/components/layout/mobile-menu"

const links = [
  { href: "/products", key: "products" },
  { href: "/#que-hacemos", key: "services" },
  { href: "/about", key: "about" },
  { href: "/philosophy", key: "philosophy" },
] as const

export function SiteHeader() {
  const t = useTranslations("Navigation")
  // Only the home page has a photo behind the header; elsewhere it sits on white.
  const onPhoto = usePathname() === "/"
  const items: NavItem[] = links.map((link) => ({
    href: link.href,
    label: link.key === "philosophy" ? `“${t(link.key)}”` : t(link.key),
  }))

  return (
      <header className={`${onPhoto ? "absolute inset-x-0 top-0" : "relative"} z-10 flex items-center justify-between p-[clamp(4px,1.5vw,16px)] pr-[clamp(16px,3vw,40px)]`}>
        <Link href="/" className="block">
          <HalftoneMark
            source={{ kind: "svg", markup: LOCKUP_MARKUP, viewBox: LOCKUP_VIEWBOX }}
            label="Oniria"
            ink={onPhoto ? "#ffffff" : "#0a0a0b"}
            className="w-[clamp(230px,25vw,420px)]"
          />
        </Link>
        <nav className={`font-editorial hidden items-baseline gap-x-3 text-[clamp(20px,1.8vw,28px)] leading-tight md:flex ${onPhoto ? "text-white" : "text-[#0a0a0b]"}`}>
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
        <MobileMenu items={items} label={t("menu")} light={onPhoto} className="md:hidden" />
      </header>
  )
}
