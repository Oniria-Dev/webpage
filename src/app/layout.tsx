import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://oniriasolutions.com'),
  title: {
    default: 'Oniria Solutions',
    template: '%s | Oniria Solutions',
  },
  description: 'Custom software, automation and AI for companies that want to stop running by hand and start growing.',
  openGraph: {
    type: 'website',
    siteName: 'Oniria Solutions',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}