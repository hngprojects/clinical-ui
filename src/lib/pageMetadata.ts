import type { Metadata } from 'next';

export function pageMetadata(title: string, description?: string): Metadata {
  return {
    title: title ? title : 'Clinsight — Understand your lab results',
    description: description
      ? description
      : 'Clinsight helps you understand your lab results with clear insights and optional doctor review.',
    openGraph: {
      title: 'Join the Waitlist - Clinsight',
      description:
        'Get early access to a simpler way to understand your lab results — with clear insights and optional doctor review.',
      url: 'https://clinsight.hng14.com/waitlist',
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
