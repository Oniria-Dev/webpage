import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { Isotipo } from "../brand/logo";

// Same layout as the previous landing's footer, on white, with raw
// browser-default links: Arial, #0000EE, lowercase (MSCHF / old Google).
// TODO: interim; the final footer art is being designed separately.
const linkClass =
  "font-[Arial,Helvetica,sans-serif] text-[14px] lowercase whitespace-nowrap text-[#0000EE] hover:underline active:text-[#551A8B] max-md:py-2";

function Footer() {
  const t = useTranslations("Navigation");
  return (
    <footer className="bg-white text-foreground">
      {/* Bottom padding keeps the fixed human/machine toggle clear of the last line. */}
      <div className="wrap pt-14 pb-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Isotipo aria-hidden className="h-12 w-12" />
            <p className="mono-label text-muted-foreground">{t("signature")}</p>
          </div>

          <nav className="flex flex-col text-sm md:flex-row md:flex-wrap md:gap-x-5 md:gap-y-2">
            <Link href="/products" className={linkClass}>
              {t("products")}
            </Link>
            <Link href="/about" className={linkClass}>
              {t("about")}
            </Link>
            <a href="mailto:info@oniriasolutions.com" className={linkClass}>
              info@oniriasolutions.com
            </a>
            <a
              href="https://www.instagram.com/oniriasolutions"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              instagram
            </a>
          </nav>
        </div>

        <div className="mono-label mt-12 flex flex-col gap-2 text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} ONIRIASOLUTIONS</span>
          <span>{t("origin")}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
