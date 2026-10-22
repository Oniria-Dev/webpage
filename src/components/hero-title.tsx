"use client"

import * as React from "react"

import { useOffTop } from "@/src/lib/use-off-top"
import { cn } from "@/src/lib/utils"

// The hero h1 hands over to the edge title: it fades out as soon as the page
// leaves the top, which is when the edge title rises in over the same spot.
export function HeroTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  const offTop = useOffTop()
  return (
    <h1 className={cn("transition-opacity duration-300 motion-reduce:transition-none", offTop && "opacity-0", className)}>
      {children}
    </h1>
  )
}
