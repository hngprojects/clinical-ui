import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://clinsight.hng14.com').replace(
    /\/$/,
    '',
  );
  const pages = ['', '/about', '/contact', '/faqs', '/how-it-works', '/squeeze', '/waitlist'];

  return pages.map((path, index) => ({
    url: `${appUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: index === 0 ? 1 : 0.8,
  }));
}
