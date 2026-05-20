import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string, endpoint: string): Metadata {
  return {
    title: title ? title : 'Clinsight — Understand your lab results',
    description: description
      ? description
      : 'Clinsight helps you understand your lab results with clear insights and optional doctor review.',
    openGraph: {
      title: title ? title : 'Clinsight — Understand your lab results',
      description: description
        ? description
        : 'Clinsight helps you understand your lab results with clear insights and optional doctor review.',
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

export default pageMetadata;
