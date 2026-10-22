"use client"

import * as React from "react"

/** True whenever the page is scrolled off its very top. */
export function useOffTop() {
  const [offTop, setOffTop] = React.useState(false)
  React.useEffect(() => {
    const check = () => setOffTop(window.scrollY > 8)
    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => window.removeEventListener("scroll", check)
  }, [])
  return offTop
}
