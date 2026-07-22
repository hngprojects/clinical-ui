const faqItems = [
  {
    question: 'Is Clinsight a medical diagnosis tool?',
    answer:
      'No, Clinsight is an informational tool designed to help you understand your laboratory results. It is not a substitute for professional medical advice, diagnosis, or treatment.',
  },
  {
    question: 'How accurate are the AI insights?',
    answer:
      'Clinsight uses structured medical interpretation principles to provide helpful insights. For additional confidence, you can request a doctor review.',
  },
  {
    question: 'Is my medical data safe?',
    answer:
      'Yes, we take data security very seriously. Your medical information is encrypted and handled according to strict privacy standards to ensure your data remains confidential.',
  },
  {
    question: 'Can I speak to a doctor through Clinsight?',
    answer:
      'Yes, Clinsight provides an optional service where you can request a review and consultation with a medical professional for added clarity.',
  },
  {
    question: 'Do I need to pay before seeing my results?',
    answer:
      'Clinsight offers a transparent pricing model. Basic insights may be available, while detailed AI analysis or consultations may require a fee.',
  },
  {
    question: "What if I don't understand the results?",
    answer:
      "If you find any part of the analysis confusing, we recommend using our 'Request Consultation' feature to speak with a doctor.",
  },
];

const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://clinsight.hng14.com').replace(
  /\/$/,
  '',
);

export function StructuredData() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Clinsight',
      url: appUrl,
      description: 'Clear lab-result insights with optional doctor review.',
      logo: `${appUrl}/clinsight-favicon.svg`,
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
