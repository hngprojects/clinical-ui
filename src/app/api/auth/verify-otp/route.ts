import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp || otp.length !== 6) {
      return NextResponse.json({ error: 'Invalid verification payload' }, { status: 400 });
    }

    const BACKEND_URL =
      process.env.NEXT_PUBLIC_VERIFY_OTP_API_URL ||
      'https://api.staging.clinsight.hng14.com/api/v1/auth/verify-otp';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), code: otp }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = 'Verification unsuccessful';
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          const err = await response.json();

          // FastAPI 422 Parser
          if (response.status === 422 && Array.isArray(err.detail) && err.detail.length > 0) {
            errorMessage = err.detail[0].msg;
          } else {
            errorMessage = err.message || err.error || JSON.stringify(err);
          }
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      // 200 Success - Returns access_token and user object
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({ error: 'Verification timeout occurred' }, { status: 504 });
      }
      throw fetchError;
    }
  } catch (error) {
    const err = error as Error;
    console.error('Verify OTP proxy trace error:', err.message);
    return NextResponse.json(
      { error: err.message || 'Internal verification token error' },
      { status: 500 },
    );
  }
}
