"use client"

// A title that stays hidden while the page sits at the top, then rises into
// place on scroll while its letters shuffle among themselves for `shuffle` ms before
// settling on the real text. Each letter sits in a box locked to its final
// width, so the shuffle never reflows the lines.

import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface ScrambleTitleProps {
  text: string
  /** Milliseconds of shuffling before the real text shows. */
  shuffle?: number
  className?: string
  style?: React.CSSProperties
}

export function ScrambleTitle({ text, shuffle = 500, className, style }: ScrambleTitleProps) {
  const rootRef = React.useRef<HTMLHeadingElement>(null)
  const [shown, setShown] = React.useState(false)
  const words = React.useMemo(() => text.split(" "), [text])

  // Shown whenever the page is off the very top, so going back up hides it
  // again and the next scroll replays the reveal.
  React.useEffect(() => {
    const check = () => setShown(window.scrollY > 8)
    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    if (!shown || !root) return
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-ch]"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Lock every letter to its final width before swapping glyphs in.
    for (const el of letters) el.style.width = el.getBoundingClientRect().width + "px"
    const pool = text.replace(/\s/g, "")
    const start = performance.now()
    let raf = 0
    const frame = (now: number) => {
      const done = now - start >= shuffle
      for (const el of letters) {
        el.textContent = done ? el.dataset.ch! : pool[Math.floor(Math.random() * pool.length)]
      }
      if (done) {
        for (const el of letters) el.style.width = ""
        return
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    // Hidden again mid-shuffle: put the real letters back.
    return () => {
      cancelAnimationFrame(raf)
      for (const el of letters) {
        el.textContent = el.dataset.ch!
        el.style.width = ""
      }
    }
  }, [shown, text, shuffle])

  return (
    <h2
      ref={rootRef}
      aria-label={text}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-[cubic-bezier(.2,.7,.1,1)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-[0.5em] opacity-0",
        className,
      )}
      style={style}
    >
      {words.map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 ? " " : null}
          <span aria-hidden="true" className="whitespace-nowrap">
            {Array.from(word).map((ch, i) => (
              <span key={i} data-ch={ch} className="inline-block text-center">
                {ch}
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </h2>
  )
}
