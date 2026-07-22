import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, endpoint: string): Metadata {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://clinsight.hng14.com').replace(
    /\/$/,
    '',
  );
  const url = `${appUrl}${endpoint}`;

  return {
    title,
    description,
    alternates: { canonical: endpoint },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      images: [
        {
          url: 'https://clinsight.hng14.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Clinsight - Understand your lab results',
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  };
}
