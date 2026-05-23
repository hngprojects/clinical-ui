import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, endpoint: string): Metadata {
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://clinsight.hng14.com${endpoint}`,
      images: [
        {
          url: 'https://clinsight.hng14.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Clinsight - Understand your lab results',
        },
      ],
    },
  };
}
