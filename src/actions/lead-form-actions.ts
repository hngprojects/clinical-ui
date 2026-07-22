'use server';

import { leadFormSchema } from '@/schemas/lead-form-schema';

export async function submitLeadFormAction(input: { firstName: string; email: string }) {
  const validation = leadFormSchema.safeParse(input);

  if (!validation.success) {
    const flattened = validation.error.flatten();
    const errorMessage =
      flattened.fieldErrors.email?.[0] ||
      flattened.fieldErrors.firstName?.[0] ||
      'Please check your input.';

    return {
      error: errorMessage,
    };
  }

  const { email, firstName } = validation.data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_name: firstName,
        source: 'lead_magnet',
      }),
    });

    if (!response.ok && response.status !== 409) {
      let message = 'Something went wrong. Please try again.';
      try {
        const data = (await response.json()) as { error?: unknown };
        if (typeof data?.error === 'string') message = data.error;
      } catch {
        /* keep default message */
      }
      throw new Error(message);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    };
  }
}
