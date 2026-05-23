import { NextResponse } from 'next/server';
import { EMAIL_REGEX } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Call backend with timeout
    const WAITLIST_API_URL = `${process.env.API_BASE_URL}/api/v1/waitlist`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(WAITLIST_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = 'Backend error';
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          try {
            const err = await response.json();
            errorMessage =
              err.detail || err.message || err.error || JSON.stringify(err) || 'Backend error';
          } catch {
            errorMessage = await response.text();
          }
        } else {
          errorMessage = await response.text();
        }

        // ✅ Catch duplicate email specifically
        const isDuplicate =
          response.status === 409 ||
          errorMessage.toLowerCase().includes('already') ||
          errorMessage.toLowerCase().includes('exist') ||
          errorMessage.toLowerCase().includes('duplicate');

        if (isDuplicate) {
          return NextResponse.json(
            { error: 'This email is already on the waitlist!' },
            { status: 409 },
          );
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 201 });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('Waitlist API timeout:', fetchError.message);
        return NextResponse.json({ error: 'Request timeout' }, { status: 504 });
      }
      throw fetchError;
    }
  } catch (error) {
    const err = error as Error;

    // Log full error for debugging
    console.error('Waitlist API error:', err.message, err.stack);

    // Classify errors
    if (err.message.includes('timeout') || err.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timeout' }, { status: 504 });
    }

    if (err.message.includes('fetch') || err.message.includes('network')) {
      return NextResponse.json({ error: 'Unable to reach backend service' }, { status: 502 });
    }

    // Return error details in dev, hide in prod
    const isDev = process.env.NODE_ENV === 'development';
    const errorMessage = isDev ? err.message : 'Failed to join waitlist';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
