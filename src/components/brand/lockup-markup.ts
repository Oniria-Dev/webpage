// The Oniria lockup (isotipo + wordmark) as plain SVG markup, for rasterising
// into a halftone mask. Generated from Lockup in ./logo.tsx without the
// SOLUTIONS line; do not redraw it. Black (#000) is the ink, pure red (#f00) is
// the accent dot, so a mask pixel tells which is which.
export const LOCKUP_VIEWBOX = [0, 15, 300, 76] as const

// The isotipo alone: the lockup's first group, in a box of its own width.
export const ISOTIPO_VIEWBOX = [0, 15, 100, 76] as const

export const ISOTIPO_MARKUP =
  '<g transform="translate(0 -3.88)"><path d="M84 56A34 34 0 0 1 16 56" fill="none" stroke="#000" stroke-width="7.5"/><clipPath id="c"><rect x="0" y="56" width="100" height="60"/></clipPath><path clip-path="url(#c)" d="M50 25.45 L76.46 40.73 L76.46 71.27 L50 86.55 L23.54 71.28 L23.54 40.72Z M63.23 33.09 L76.46 56 L63.23 78.91 L36.77 78.91 L23.54 56 L36.77 33.09Z M69.84 44.54 L69.84 67.46 L50 78.91 L30.16 67.46 L30.16 44.54 L50 33.09Z M69.84 56 L59.92 73.18 L40.08 73.18 L30.16 56 L40.08 38.82 L59.92 38.82Z" fill="none" stroke="#000" stroke-width="2.4" stroke-linejoin="round"/><path d="M2 56H98" stroke="#000" stroke-width="2.8"/><circle cx="17.16" cy="47.2" r="1.23" fill="#000"/><circle cx="20.56" cy="39" r="1.36" fill="#000"/><circle cx="25.96" cy="31.96" r="1.49" fill="#000"/><circle cx="33" cy="26.56" r="1.62" fill="#000"/><circle cx="41.2" cy="23.16" r="1.75" fill="#000"/><circle cx="50" cy="22" r="1.88" fill="#000"/><circle cx="79.44" cy="39" r="2.4" fill="#000"/><circle cx="82.84" cy="47.2" r="2.53" fill="#000"/><circle cx="69.76" cy="28.33" r="7.5" fill="#f00"/></g>'

// The isotipo's four parts as zones for HalftoneMark's `regions`, in its own
// coordinates and in the order of About.concept.parts: the net, the 0° line,
// the trail of dots and the idea. Generous shapes are fine: only dots that
// print the logo get a zone.
const zone = (shapes: string) => '<g transform="translate(0 -3.88)">' + shapes + "</g>"
export const ISOTIPO_REGIONS = [
  zone('<rect x="0" y="57.4" width="100" height="40"/>'),
  zone('<rect x="0" y="54.4" width="100" height="3"/>'),
  zone('<circle cx="17.16" cy="47.2" r="4.23"/><circle cx="20.56" cy="39" r="4.36"/><circle cx="25.96" cy="31.96" r="4.49"/><circle cx="33" cy="26.56" r="4.62"/><circle cx="41.2" cy="23.16" r="4.75"/><circle cx="50" cy="22" r="4.88"/><circle cx="79.44" cy="39" r="5.4"/><circle cx="82.84" cy="47.2" r="5.53"/>'),
  zone('<circle cx="69.76" cy="28.33" r="9.5"/>'),
] as const

export const LOCKUP_MARKUP =
  ISOTIPO_MARKUP +
  '<g transform="translate(124 19) scale(0.97)"><g transform="translate(1.25 50.46)">' +
  '<path d="M24.38 1.02Q17.66 1.02 12.8 -1.82Q7.94 -4.67 5.34 -9.98Q2.75 -15.3 2.75 -22.66Q2.75 -30.02 5.34 -35.36Q7.94 -40.7 12.8 -43.58Q17.66 -46.46 24.38 -46.46Q31.23 -46.46 36.06 -43.58Q40.9 -40.7 43.49 -35.36Q46.08 -30.02 46.08 -22.66Q46.08 -15.3 43.49 -9.98Q40.9 -4.67 36.06 -1.82Q31.23 1.02 24.38 1.02ZM24.38 -6.21Q28.54 -6.21 31.46 -8.16Q34.37 -10.11 35.94 -13.79Q37.5 -17.47 37.5 -22.66Q37.5 -27.84 35.94 -31.55Q34.37 -35.26 31.46 -37.25Q28.54 -39.23 24.38 -39.23Q20.35 -39.23 17.41 -37.25Q14.46 -35.26 12.9 -31.55Q11.33 -27.84 11.33 -22.66Q11.33 -17.47 12.9 -13.79Q14.46 -10.11 17.41 -8.16Q20.35 -6.21 24.38 -6.21Z M51.39 0V-34.18H58.82L59.14 -24.58L58.18 -24.96Q58.69 -28.54 60.29 -30.72Q61.89 -32.9 64.19 -33.92Q66.5 -34.94 69.25 -34.94Q73.02 -34.94 75.62 -33.28Q78.21 -31.62 79.55 -28.7Q80.9 -25.79 80.9 -21.95V0H72.7V-19.33Q72.7 -22.21 72.13 -24.19Q71.55 -26.18 70.24 -27.23Q68.93 -28.29 66.75 -28.29Q63.49 -28.29 61.54 -25.98Q59.58 -23.68 59.58 -19.33V0Z M88.58 0V-34.18H96.77V0ZM88.45 -38.72V-46.02H96.96V-38.72Z M104.51 0V-34.18H112.19L112.51 -24.7L111.81 -24.83Q112.58 -29.76 114.72 -31.97Q116.86 -34.18 120.58 -34.18H123.71V-27.14H120.51Q117.89 -27.14 116.16 -26.37Q114.43 -25.6 113.57 -23.97Q112.7 -22.34 112.7 -19.71V0Z M129.41 0V-34.18H137.6V0ZM129.28 -38.72V-46.02H137.79V-38.72Z M155.26 0.77Q149.89 0.77 146.62 -1.7Q143.36 -4.16 143.36 -8.58Q143.36 -12.99 146.11 -15.49Q148.86 -17.98 154.5 -19.07L165.82 -21.31Q165.82 -24.96 164.16 -26.78Q162.5 -28.61 159.23 -28.61Q156.29 -28.61 154.59 -27.23Q152.9 -25.86 152.26 -23.3L143.94 -23.68Q144.96 -29.12 148.93 -32.03Q152.9 -34.94 159.23 -34.94Q166.53 -34.94 170.27 -31.26Q174.02 -27.58 174.02 -20.74V-8.32Q174.02 -6.98 174.5 -6.46Q174.98 -5.95 175.94 -5.95H177.02V0Q176.64 0.13 175.78 0.19Q174.91 0.26 174.02 0.26Q171.9 0.26 170.24 -0.42Q168.58 -1.09 167.68 -2.78Q166.78 -4.48 166.78 -7.42L167.49 -6.91Q166.98 -4.67 165.28 -2.91Q163.58 -1.15 161.02 -0.19Q158.46 0.77 155.26 0.77ZM156.93 -5.18Q159.68 -5.18 161.66 -6.27Q163.65 -7.36 164.74 -9.28Q165.82 -11.2 165.82 -13.82V-15.74L156.99 -13.95Q154.24 -13.38 153.06 -12.26Q151.87 -11.14 151.87 -9.34Q151.87 -7.36 153.18 -6.27Q154.5 -5.18 156.93 -5.18Z" fill="#000"/></g></g>'
