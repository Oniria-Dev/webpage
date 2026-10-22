"use client"

// Halftone Mark — the dot field from HalftoneWordmarkFooter, printed from
// either SVG artwork (so a logo keeps its real drawing) or wrapped text in a
// page font. The source is rasterised once per size onto a mask: black prints
// in `ink`, pure red (#f00, SVG only) prints in `accent`, and each dot takes
// whichever its cell is mostly made of. With `split`, dots above a line across
// the canvas print in another ink, so a title can straddle a photo's edge.
// Hover parts the dots on springs; click sends a ring through. With `regions`,
// each dot remembers which zone of the art it sits in, and `active` lights one
// zone in `accent` and dims the rest, without moving anything.

import * as React from "react"

import { cn } from "@/src/lib/utils"
import { hwfHex, hwfRadius, hwfStep, hwfWarmth } from "./halftone-wordmark-footer"

export type HalftoneSource =
  | {
      kind: "svg"
      /** SVG inner markup, drawn in #000 (ink) and #f00 (accent). */
      markup: string
      /** The artwork's viewBox: x, y, width, height. */
      viewBox: readonly [number, number, number, number]
    }
  | {
      kind: "text"
      text: string
      /** CSS custom property holding the font-family list, e.g. "--font-x". */
      fontVar: string
      fontWeight?: number
      /** Font size: clamp(min px, vw% of the viewport, max px). */
      size: readonly [number, number, number]
      /** Line height as a multiple of the font size. */
      lineHeight?: number
    }

export interface HalftoneMarkProps {
  source: HalftoneSource
  /** Accessible name. */
  label: string
  /** Dot colour at rest. */
  ink?: string
  /** Colour for the parts drawn in #f00. */
  accent?: string
  /** The colour a dot warms toward as it is pushed off its place. */
  warm?: string
  /** Dots above `ratio` of the canvas height print in `ink` instead. */
  split?: { ratio: number; ink: string }
  /** Distance between dot centres, in CSS px. */
  dotGap?: number
  /** How far the pointer pushes, in CSS px. */
  radius?: number
  /** Room around the artwork for displaced dots, in CSS px. */
  pad?: number
  /** Pointer and click response. */
  interactive?: boolean
  /** SVG markup per zone, in the source's viewBox (SVG sources only). */
  regions?: readonly string[]
  /** The zone to light, by index into `regions`; none when undefined. */
  active?: number
  /** Sizes the mark: give the root a width. */
  className?: string
}

const STRIDE = 9 // x, y, vx, vy, hx, hy, r, accent, region
// Zone i is painted in red (i + 1) * ZONE so one mask holds them all.
const ZONE = 40

/** Greedy word wrap against `max` px. */
function wrap(m: CanvasRenderingContext2D, text: string, max: number) {
  const lines: string[] = []
  let line = ""
  for (const word of text.split(/\s+/)) {
    const next = line ? line + " " + word : word
    if (line && m.measureText(next).width > max) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

export function HalftoneMark({
  source,
  label,
  ink = "#0a0a0b",
  accent = "#ED1C24",
  warm = "#c2361c",
  split,
  dotGap = 4,
  radius = 60,
  pad = 24,
  interactive = true,
  regions,
  active,
  className,
}: HalftoneMarkProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const opts = React.useRef({ ink, accent, warm, split, dotGap, radius, pad, interactive, active })
  const wakeRef = React.useRef<() => void>(() => {})
  React.useEffect(() => {
    opts.current = { ink, accent, warm, split, dotGap, radius, pad, interactive, active }
  })
  // A new active zone only needs a redraw.
  React.useEffect(() => wakeRef.current(), [active])
  const sourceKey = JSON.stringify(source)
  const regionsKey = JSON.stringify(regions ?? [])
  const key = [sourceKey, regionsKey, ink, accent, warm, split?.ink, split?.ratio, dotGap, pad].join("|")

  // SVG art has a known aspect, so the box can reserve its height up front;
  // text sets its own height once it has been wrapped.
  const aspect = source.kind === "svg" ? source.viewBox[3] / source.viewBox[2] : 0

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const src = JSON.parse(sourceKey) as HalftoneSource

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0
    let dpr = 1
    let px = -1e5
    let py = -1e5
    let raf = 0
    let visible = true
    let awake = true
    let alive = true
    let ring = { x: 0, y: 0, t: -1 }
    let dots = new Float32Array(0)
    let count = 0
    let build = 0
    const inkRgb = hwfHex(opts.current.ink) || [10, 10, 11]
    const accentRgb = hwfHex(opts.current.accent) || [237, 28, 36]
    const warmRgb = hwfHex(opts.current.warm) || [194, 54, 28]
    const splitRgb = opts.current.split ? hwfHex(opts.current.split.ink) || accentRgb : inkRgb

    const sample = (data: Uint8ClampedArray, zones?: Uint8ClampedArray) => {
      const o = opts.current
      // Finer dots when the mark is small, so a phone-sized logo still reads.
      const gap = Math.max(2.5, Math.min(o.dotGap, w / 100))
      const cols = Math.ceil(w / gap)
      const rows = Math.ceil(h / gap)
      const tmp: number[] = []
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          // Coverage: average alpha over a 3×3 sample of the cell; redness
          // is weighted by alpha so anti-aliased edges don't flip a dot.
          let sum = 0
          let red = 0
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
              const p = (y * w + x) * 4
              sum += data[p + 3]
              red += Math.max(0, data[p] - data[p + 1]) * (data[p + 3] / 255)
            }
          }
          const cov = sum / (9 * 255)
          if (cov < 0.06) continue
          const isAccent = red / Math.max(1, sum) > 0.5 ? 1 : 0
          const hx = gx * gap + gap / 2
          const hy = gy * gap + gap / 2
          let zone = -1
          if (zones) {
            const p = (Math.min(h - 1, Math.floor(hy)) * w + Math.min(w - 1, Math.floor(hx))) * 4
            if (zones[p + 3] > 127) zone = Math.round(zones[p] / ZONE) - 1
          }
          tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap), isAccent, zone)
        }
      }
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      dots = new Float32Array(tmp)
      count = tmp.length / STRIDE
      wake()
    }

    const newMask = () => {
      const mask = document.createElement("canvas")
      mask.width = w
      mask.height = h
      return mask.getContext("2d", { willReadFrequently: true })
    }

    const layout = () => {
      const o = opts.current
      const id = ++build
      w = Math.max(1, Math.round(root.getBoundingClientRect().width))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const artW = Math.max(1, w - o.pad * 2)

      if (src.kind === "svg") {
        const artH = artW * aspect
        h = Math.max(1, Math.round(artH + o.pad * 2))
        const [vx, vy, vw, vh] = src.viewBox
        const raster = (markup: string) =>
          new Promise<Uint8ClampedArray | undefined>((resolve) => {
            const svg =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + [vx, vy, vw, vh].join(" ") +
              '" width="' + artW + '" height="' + artH + '">' + markup + "</svg>"
            const img = new Image()
            img.onload = () => {
              const m = newMask()
              if (!m) return resolve(undefined)
              m.drawImage(img, o.pad, o.pad, artW, artH)
              resolve(m.getImageData(0, 0, w, h).data)
            }
            img.onerror = () => resolve(undefined)
            img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg)
          })
        const zones = JSON.parse(regionsKey) as string[]
        const zoneMarkup = zones.map((m, i) => '<g fill="rgb(' + (i + 1) * ZONE + ',0,0)" stroke="none">' + m + "</g>").join("")
        Promise.all([raster(src.markup), zones.length ? raster(zoneMarkup) : undefined]).then(([art, zoneData]) => {
          // A newer layout may have started while these were decoding.
          if (!alive || id !== build || !art) return
          sample(art, zoneData)
        })
        return
      }

      const [min, vw, max] = src.size
      const size = Math.min(max, Math.max(min, (window.innerWidth * vw) / 100))
      const family = getComputedStyle(document.documentElement).getPropertyValue(src.fontVar).trim() || "serif"
      const font = (src.fontWeight ?? 400) + " " + size + "px " + family
      // Draw only once the face is in, or the dots print the fallback.
      document.fonts.load(font).then(() => {
        if (!alive || id !== build) return
        const probe = document.createElement("canvas").getContext("2d")
        if (!probe) return
        probe.font = font
        const lines = wrap(probe, src.text, artW)
        const metrics = probe.measureText("ÁHgjy")
        const ascent = metrics.actualBoundingBoxAscent || size * 0.8
        const descent = metrics.actualBoundingBoxDescent || size * 0.2
        const step = size * (src.lineHeight ?? 1)
        h = Math.max(1, Math.round(o.pad * 2 + ascent + descent + step * (lines.length - 1)))
        root.style.height = h + "px"
        const m = newMask()
        if (!m) return
        m.font = font
        m.fillStyle = "#000"
        m.textBaseline = "alphabetic"
        lines.forEach((line, i) => m.fillText(line, o.pad, o.pad + ascent + i * step))
        sample(m.getImageData(0, 0, w, h).data)
      })
    }

    const mix = (base: number[], k: number) =>
      "rgb(" +
      Math.round(base[0] + (warmRgb[0] - base[0]) * k) + "," +
      Math.round(base[1] + (warmRgb[1] - base[1]) * k) + "," +
      Math.round(base[2] + (warmRgb[2] - base[2]) * k) + ")"

    const draw = (now: number) => {
      const o = opts.current
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const r = o.interactive && !reduced ? Math.max(0, o.radius) : 0
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t
      const ringR = ringAge * 0.9
      const splitY = o.split ? h * o.split.ratio : -1
      let moving = false
      for (let i = 0; i < count; i++) {
        const j = i * STRIDE
        let x = dots[j]
        let y = dots[j + 1]
        let vx = dots[j + 2]
        let vy = dots[j + 3]
        const hx = dots[j + 4]
        const hy = dots[j + 5]
        if (!reduced) {
          if (ringAge < 900) {
            const dx = hx - ring.x
            const dy = hy - ring.y
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26)
            if (band > 0) {
              const f = band * 3.2 * (1 - ringAge / 900)
              vx += (dx / d) * f
              vy += (dy / d) * f
            }
          }
          const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r)
          x = s[0]
          y = s[1]
          vx = s[2]
          vy = s[3]
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true
          else {
            x = hx
            y = hy
            vx = 0
            vy = 0
          }
          dots[j] = x
          dots[j + 1] = y
          dots[j + 2] = vx
          dots[j + 3] = vy
        }
        // Colour follows where the dot is now, so a pushed dot changes ink as
        // it crosses the split.
        const above = o.split && y < splitY
        const base = dots[j + 7] > 0.5 ? accentRgb : above ? splitRgb : inkRgb
        const rest = dots[j + 7] > 0.5 ? o.accent : above && o.split ? o.split.ink : o.ink
        const k = hwfWarmth(x, y, hx, hy, 28)
        // A lit zone prints in the accent and a little larger; the others fade back.
        const lit = o.active !== undefined && dots[j + 8] === o.active
        ctx.globalAlpha = o.active === undefined || lit ? 1 : 0.22
        ctx.fillStyle = lit ? o.accent : k > 0.02 ? mix(base, k) : rest
        ctx.beginPath()
        ctx.arc(x, y, dots[j + 6] * (lit ? 1.25 : 1), 0, 6.2832)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      // Sleep once everything is home and nothing is pushing.
      awake = moving || ringAge < 900 || px > -1e4
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      draw(now)
      if (awake) raf = requestAnimationFrame(loop)
    }
    function wake() {
      awake = true
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }
    wakeRef.current = wake

    const toLocal = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      return [e.clientX - b.left, e.clientY - b.top]
    }
    const onMove = (e: PointerEvent) => {
      if (!opts.current.interactive) return
      const p = toLocal(e)
      px = p[0]
      py = p[1]
      wake()
    }
    const onLeave = () => {
      px = -1e5
      py = -1e5
      wake()
    }
    const onDown = (e: PointerEvent) => {
      if (!opts.current.interactive || reduced) return
      const p = toLocal(e)
      ring = { x: p[0], y: p[1], t: performance.now() }
      wake()
    }

    layout()

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)
    root.addEventListener("pointerdown", onDown)
    // Width drives everything; the height we set for text must not re-trigger.
    let lastW = w
    const ro = new ResizeObserver(() => {
      const next = Math.round(root.getBoundingClientRect().width)
      if (next === lastW) return
      lastW = next
      layout()
    })
    ro.observe(root)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true
      if (visible) wake()
    })
    io.observe(root)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      root.removeEventListener("pointerdown", onDown)
    }
  }, [key, sourceKey, regionsKey, aspect])

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={label}
      className={cn("relative select-none", className)}
      // Padding-bottom resolves against width, so SVG art takes its height
      // plus the pad before any script runs.
      style={aspect ? { paddingBottom: `calc((100% - ${pad * 2}px) * ${aspect} + ${pad * 2}px)` } : undefined}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block size-full" />
    </div>
  )
}

export default HalftoneMark
