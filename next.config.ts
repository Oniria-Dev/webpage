import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  output: 'standalone',

  // Pages removed in the 2026 redesign; keeps indexed links from 404ing.
  async redirects() {
    return ['solutions', 'contact', 'education/:path*', 'process/:path*'].map((path) => ({
      source: `/:locale(en|es)/${path}`,
      destination: '/:locale',
      permanent: true,
    }));
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
