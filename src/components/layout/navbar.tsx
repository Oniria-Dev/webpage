"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import { Lockup } from "../brand/logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/products", key: "products" },
  { href: "/#que-hacemos", key: "services" },
  { href: "/about", key: "about" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navigation");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="wrap flex items-center justify-between py-3">
        <Link href="/" aria-label="Oniria Solutions">
          {/* 140px is the lockup's minimum width in the brand manual. */}
          <Lockup aria-hidden className="h-auto w-[140px]" />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={t("menu")}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="p-6" side="right">
              <SheetTitle className="sr-only">{t("menu")}</SheetTitle>

              <div className="flex flex-col gap-6 mt-10">
                <LocaleSwitcher />
                {links.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    className="text-lg text-foreground"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
