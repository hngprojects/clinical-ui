import type { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getPublicSiteUrl();
  if (!appUrl) return [];

  const pages = ['', '/about', '/contact', '/faqs', '/how-it-works', '/squeeze', '/waitlist'];

  return pages.map((path, index) => ({
    url: `${appUrl}${path}`,
    changeFrequency: 'weekly',
    priority: index === 0 ? 1 : 0.8,
  }));
}
