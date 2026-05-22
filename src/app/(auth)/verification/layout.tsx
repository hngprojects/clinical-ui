import VerificationLayoutAnimation from '@/components/verification/VerificationLayoutAnimation';

import React, { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="px-4 space-y-14 py-10">
      {/* <VerificationNavbar /> */}

      <VerificationLayoutAnimation>{children}</VerificationLayoutAnimation>
    </div>
  );
}
