import { useTranslations } from "next-intl";
import { Instagram } from "lucide-react";
import { Link } from "../../i18n/navigation";
import { Isotipo } from "../brand/logo";

function Footer() {
  const t = useTranslations("Navigation");
  return (
    // Always the Negro field, in both themes.
    <footer className="dark bg-background text-foreground">
      <div className="wrap py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <Isotipo aria-hidden className="h-12 w-12" />
            <div>
              <p className="text-lg font-medium tracking-tight">{t("tagline")}</p>
              <p className="mono-label text-muted-foreground">{t("signature")}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-3 text-sm md:flex-row md:gap-6">
            <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("products")}
            </Link>
            <Link href="/#que-hacemos" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("services")}
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("about")}
            </Link>
            <a
              href="https://www.instagram.com/oniriasolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @oniriasolutions
            </a>
          </nav>
        </div>

        <div className="mono-label mt-12 flex flex-col gap-2 border-t border-border pt-6 text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} ONIRIASOLUTIONS S.A.S.</span>
          <span>{t("origin")}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
