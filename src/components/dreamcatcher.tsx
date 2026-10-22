"use client"

import * as React from "react"

import { Cedula } from "@/src/components/cedula"
import { HalftoneMark } from "@/src/components/ui/halftone-mark"
import { ISOTIPO_MARKUP, ISOTIPO_REGIONS, ISOTIPO_VIEWBOX } from "@/src/components/brand/lockup-markup"
import { cn } from "@/src/lib/utils"

type Part = { title: string; description: string }

// The isotipo in halftone dots beside its four parts. Each part is a button:
// hover, focus or a tap lights its zone of the logo and marks its Cedula with
// an arrow, so the state shows without colour. One part at a time; it stays lit
// until another is chosen. Without script, the logo and every part still read.
export function Dreamcatcher({ parts, label }: { parts: Part[]; label: string }) {
  const [active, setActive] = React.useState<number>()

  return (
    <div className="grid items-center gap-[clamp(40px,5vw,80px)] md:grid-cols-12">
      <div data-reveal className="md:col-span-6">
        <HalftoneMark
          source={{ kind: "svg", markup: ISOTIPO_MARKUP, viewBox: ISOTIPO_VIEWBOX }}
          regions={ISOTIPO_REGIONS}
          active={active}
          label={active === undefined ? label : `${label}: ${parts[active].title}`}
          className="w-full max-w-[640px]"
        />
      </div>
      <ul className="flex flex-col gap-4 md:col-span-5 md:col-start-8">
        {parts.map((part, i) => (
          <li key={part.title} data-reveal>
            <button
              type="button"
              aria-pressed={active === i}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="block cursor-pointer py-2 text-left"
            >
              <Cedula as="span" className="block text-[24px]">
                <span aria-hidden="true" className={cn("inline-block", active === i ? "mr-2" : "hidden")}>
                  →
                </span>
                {part.title}
              </Cedula>
            </button>
            <p
              className={cn(
                "mt-1 max-w-[44ch] text-[clamp(18px,1.5vw,22px)] leading-snug transition-opacity",
                active === undefined || active === i ? "opacity-100" : "opacity-60",
              )}
            >
              {part.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
