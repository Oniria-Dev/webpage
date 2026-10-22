import * as React from "react"

import { cn } from "@/src/lib/utils"

// The red museum label that ties the site together: every photo, product and
// piece carries one. Either a single line (the hero photo's caption) or three:
// the name in bold, the medium with its year, and where it comes from.
type CedulaProps = {
  as?: "p" | "figcaption" | "div" | "span"
  className?: string
  style?: React.CSSProperties
} & ({ children: React.ReactNode } | { name: string; medium: string; origin: string })

export function Cedula({ as: Tag = "p", className, style, ...content }: CedulaProps) {
  return (
    // White on #ED1C24 is 4.4:1, so the text must read as large (24px, or 18.5px bold).
    <Tag className={cn("font-editorial w-fit bg-[#ED1C24] px-2.5 py-1 leading-tight text-white", className)} style={style}>
      {"children" in content ? (
        content.children
      ) : (
        <>
          <span className="block font-bold">{content.name}</span>
          <span className="block">{content.medium}</span>
          <span className="block">{content.origin}</span>
        </>
      )}
    </Tag>
  )
}
