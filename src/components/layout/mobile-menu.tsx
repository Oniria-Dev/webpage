"use client"

import * as React from "react"

import { Link } from "@/src/i18n/navigation"
import { cn } from "@/src/lib/utils"

export type NavItem = { href: string; label: string }

// First pass: a full-screen black sheet with the same links set large.
// TODO: final mobile menu design is still to be decided.
export function MobileMenu({
  items,
  label,
  light = true,
  className,
}: {
  items: NavItem[]
  label: string
  /** White bars for a dark backdrop; the open sheet is always black. */
  light?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="relative z-[60] flex size-11 cursor-pointer flex-col items-center justify-center gap-[7px]"
      >
        <span
          className={cn(
            "block h-[2px] w-7 transition-transform duration-200",
            light || open ? "bg-white" : "bg-[#0a0a0b]",
            open && "translate-y-[4.5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "block h-[2px] w-7 transition-transform duration-200",
            light || open ? "bg-white" : "bg-[#0a0a0b]",
            open && "-translate-y-[4.5px] -rotate-45",
          )}
        />
      </button>

      <nav
        id="mobile-menu"
        aria-label={label}
        inert={!open}
        className={cn(
          "font-editorial fixed inset-0 z-50 flex flex-col justify-center gap-2 bg-[#0a0a0b] px-8 text-[44px] leading-[1.05] text-white transition-[opacity,visibility] duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="active:opacity-55"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
