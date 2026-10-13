// app/[locale]/not-found.tsx
import { useTranslations } from 'next-intl';
import { Button } from '../../components/ui/button';
import { Link } from '../../i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('NotFound');

  return (
    <main className="wrap flex min-h-[70vh] flex-col items-start justify-center">
      <p className="mono-label text-muted-foreground">404</p>
      <h1 className="mt-4 text-5xl md:text-7xl">{t('title')}</h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted-foreground">{t('description')}</p>
      <Button asChild className="mt-8 h-11 rounded-full px-5 text-sm">
        <Link href="/">{t('backHome')}</Link>
      </Button>
    </main>
  );
}
