import "./globals.css"
import type { Metadata, Viewport } from "next";
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {routing} from '../../i18n/routing';
import Navbar from '@/src/components/layout/navbar';
import Footer from '@/src/components/layout/footer';
import { Geist, Geist_Mono } from "next/font/google"
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
    <html lang={locale} className={cn("antialiased font-sans", fontSans.variable, fontMono.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider>
            <NextIntlClientProvider>
                <Navbar/>
                    {children}
                <Footer/>
            </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
