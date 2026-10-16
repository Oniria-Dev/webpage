import "./globals.css"
import type { Metadata, Viewport } from "next";
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {routing} from '../../i18n/routing';
import { SiteHeader } from '@/src/components/layout/site-header';
import Footer from '@/src/components/layout/footer';
import { MachineView } from '@/src/components/layout/machine-view';
import { ModeToggle } from '@/src/components/layout/mode-toggle';
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight, VT323 } from "next/font/google"
import { ThemeProvider } from "../../components/theme-provider"
import { cn } from "../../lib/utils";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Old-terminal face for the MACHINE side of the mode toggle.
const fontCli = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
})

// Condensed editorial serif for the nav, in the spirit of locomotive.ca.
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
})

// Neutral tight grotesk standing in for the Teenage Engineering bag lettering,
// whose actual face isn't public.
const fontGrotesk = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
})

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    alternates: {
      canonical: `https://oniriasolutions.com/${locale}`,
      languages: {
        en: "https://oniriasolutions.com/en",
        es: "https://oniriasolutions.com/es",
      },
    },
    openGraph: {
      locale: isEs ? "es_EC" : "en_US",
      alternateLocale: isEs ? ["en_US"] : ["es_EC"],
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={cn("antialiased font-sans", fontSans.variable, fontMono.variable, fontCli.variable, fontSerif.variable, fontGrotesk.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider forcedTheme="light">
            <NextIntlClientProvider>
                {/* The toggle swaps these two by setting <html data-mode>. */}
                <div className="machine:hidden">
                    <SiteHeader/>
                    {children}
                    <Footer/>
                </div>
                <MachineView/>
                <ModeToggle className="fixed right-[clamp(16px,3vw,40px)] bottom-[clamp(16px,3vw,40px)] z-50"/>
            </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
