"use client"

import * as React from "react"

// The shared entrance: every [data-reveal] element on the page that starts below
// the fold is hidden here and rises in (globals.css) once it enters the screen,
// 75ms after the one that entered with it. Only this script hides anything, so
// without it, or for what is already on screen, the page is simply there.
// Mark parts that don't carry their own transition (wrap links and buttons).
export function RevealOnScroll() {
  React.useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${i * 75}ms`
            el.dataset.reveal = "shown"
            io.unobserve(el)
          })
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    items.forEach((el) => {
      el.dataset.reveal = "hidden"
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return null
}
