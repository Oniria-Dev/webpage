"use client"

import * as React from "react"

import { cn } from "@/src/lib/utils"

export type Mode = "human" | "machine"

// MS Paint red, the same red as the logo's dot.
const SELECTED = "#ED1C24"
const IDLE = "rgb(255 255 255 / 0.45)"

/** human / machine switch. Each click flips the mode; the selected side is red.
    The mode is mirrored to `<html data-mode>` so any part of the page can
    restyle off it. */
export function ModeToggle({ className }: { className?: string }) {
  const [mode, setMode] = React.useState<Mode>("human")

  React.useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mode === "machine"}
      aria-label="Machine-readable mode"
      onClick={() => setMode((m) => (m === "human" ? "machine" : "human"))}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-[#0a0a0b] px-5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0b] focus-visible:ring-offset-2",
        className,
      )}
    >
      <span
        className="font-helvetica text-[12px] leading-none font-bold transition-colors duration-150"
        style={{ color: mode === "human" ? SELECTED : IDLE }}
      >
        human
      </span>
      <span aria-hidden="true" className="font-helvetica text-[13px] leading-none" style={{ color: IDLE }}>
        /
      </span>
      <span
        className="font-cli text-[18px] leading-none transition-colors duration-150"
        style={{ color: mode === "machine" ? SELECTED : IDLE }}
      >
        machine
      </span>
    </button>
  )
}
