import { Fragment } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/src/i18n/navigation"
import { products } from "@/src/lib/products"

// The MACHINE side of the human / machine toggle: the whole site as plain text,
// in the spirit of basement.studio's machine mode, but on white. It is always in
// the HTML (crawlers and agents read it without clicking anything) and only
// shown when <html data-mode="machine">. The one colour is the logo's red, on
// the O of the banner.

type Item = { title: string; description: string; example?: string }

// 5-row block letters. The O is drawn separately so it can take the red.
const GLYPHS: Record<string, string[]> = {
  O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
  N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
  I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
  R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
  A: [" ███ ", "█   █", "█████", "█   █", "█   █"],
}

const plain = (s: string) => s.replace(/<\/?[^>]+>/g, "")

function Banner() {
  return (
    <div aria-hidden="true" className="flex gap-[1ch] font-mono text-[clamp(9px,1.6vw,18px)] leading-none">
      {Array.from("ONIRIA").map((ch, i) => (
        <pre key={i} className={ch === "O" ? "text-[#ED1C24]" : undefined}>
          {GLYPHS[ch].join("\n")}
        </pre>
      ))}
    </div>
  )
}

function Rule({ label }: { label: string }) {
  return (
    <h2 className="mt-12 mb-4 flex items-center gap-3 text-inherit leading-[1.35] font-normal tracking-normal">
      <span className="h-px w-6 bg-current" />
      <span>{label}</span>
      <span className="h-px flex-1 bg-current" />
    </h2>
  )
}

/** "NAME ........ VALUE", with the dots stretching to a shared label column. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(9ch,14ch)_1fr] gap-x-2 sm:grid-cols-[16ch_1fr]">
      <dt className="flex overflow-hidden whitespace-nowrap after:ml-1 after:content-['............................................']">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  )
}

export function MachineView() {
  const m = useTranslations("Machine")
  const nav = useTranslations("Navigation")
  const home = useTranslations("Home")
  const prod = useTranslations("Products")

  const links = [
    { href: "/", label: m("home") },
    { href: "/products", label: nav("products") },
    { href: "/#que-hacemos", label: nav("services") },
    { href: "/about", label: nav("about") },
    { href: "/philosophy", label: nav("philosophy") },
  ]
  const what = home.raw("what.items") as Item[]
  const how = home.raw("how.steps") as Item[]

  return (
    <div className="font-cli hidden min-h-dvh bg-white px-[clamp(16px,4vw,48px)] pt-[clamp(24px,5vw,56px)] pb-32 text-[clamp(17px,1.5vw,21px)] leading-[1.35] text-[#0a0a0b] uppercase machine:block">
      <h1 className="sr-only">Oniria</h1>
      <Banner />

      <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-1">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              i === 0
                ? "bg-[#0a0a0b] px-1 text-white"
                : "underline decoration-1 underline-offset-4 hover:bg-[#0a0a0b] hover:text-white"
            }
          >
            /{link.label}
          </Link>
        ))}
      </nav>

      <p className="mt-8">{m("index")}</p>
      <p className="mt-4 max-w-[70ch] opacity-60">{m("note")}</p>

      <Rule label={m("sections.about")} />
      <dl className="max-w-[90ch]">
        <Row label={m("fields.name")}>Oniria Solutions</Row>
        <Row label={m("fields.origin")}>{nav("origin")}</Row>
        <Row label={m("fields.does")}>{what.map((item) => item.title).join(", ")}</Row>
        <Row label={m("fields.email")}>
          <a href="mailto:info@oniriasolutions.com" className="underline underline-offset-4">
            info@oniriasolutions.com
          </a>
        </Row>
        <Row label={m("fields.instagram")}>
          <a href="https://www.instagram.com/oniriasolutions" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            @oniriasolutions
          </a>
        </Row>
        <Row label={m("fields.signature")}>{nav("signature")}</Row>
      </dl>
      <p className="mt-6 max-w-[70ch]">{home("hero.lead")}</p>

      <Rule label={m("sections.now")} />
      <dl className="max-w-[90ch]">
        <Row label={m("fields.headline")}>
          {home("Hero.line1")} {home("Hero.line2")}
        </Row>
        <Row label={m("fields.title")}>{home("Hero.title")}</Row>
        <Row label={m("fields.photo")}>{m("photo")}</Row>
      </dl>

      <Rule label={m("sections.what")} />
      <p className="max-w-[70ch]">
        {plain(home.raw("what.title") as string)} {home("what.intro")}
      </p>
      <ol className="mt-4 max-w-[70ch] space-y-4">
        {what.map((item, i) => (
          <li key={item.title}>
            <p>
              [{String(i + 1).padStart(2, "0")}] {item.title}
            </p>
            <p className="pl-[5ch] opacity-60">{item.description}</p>
            {item.example ? (
              <p className="pl-[5ch]">
                &gt; {m("fields.example")}: {item.example}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <Rule label={m("sections.products")} />
      <p className="max-w-[70ch]">{home("products.intro")}</p>
      <ol className="mt-4 max-w-[70ch] space-y-4">
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`} className="underline underline-offset-4">
              {prod(`items.${product.slug}.name`)}
            </Link>{" "}
            :: {prod(`items.${product.slug}.category`)}
            <p className="pl-[5ch] opacity-60">{prod(`items.${product.slug}.tagline`)}</p>
            {product.url ? (
              <p className="pl-[5ch]">
                &gt; {m("fields.site")}:{" "}
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="normal-case underline underline-offset-4">
                  {product.url.replace(/^https:\/\//, "")}
                </a>
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <Rule label={m("sections.how")} />
      <p className="max-w-[70ch]">
        {plain(home.raw("how.title") as string)} {home("how.intro")}
      </p>
      <ol className="mt-4 max-w-[70ch] space-y-3">
        {how.map((step, i) => (
          <Fragment key={step.title}>
            <li>
              <p>
                {String(i + 1).padStart(2, "0")} / {step.title}
              </p>
              <p className="pl-[5ch] opacity-60">{step.description}</p>
            </li>
          </Fragment>
        ))}
      </ol>

      <Rule label={m("sections.origin")} />
      <p className="max-w-[70ch]">{plain(home.raw("origin.title") as string)}</p>
      <p className="mt-2 max-w-[70ch] opacity-60">{home("origin.body")}</p>

      <p className="mt-16 opacity-60">© {new Date().getFullYear()} ONIRIASOLUTIONS · {nav("origin")}</p>
    </div>
  )
}
