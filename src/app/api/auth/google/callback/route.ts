import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.staging.useclinsight.com';

function getAccessToken(data: unknown) {
  if (!data || typeof data !== 'object') return null;

  const response = data as {
    access_token?: string;
    accessToken?: string;
    google_token?: string;
    googleToken?: string;
    data?: {
      access_token?: string;
      accessToken?: string;
      google_token?: string;
      googleToken?: string;
    };
  };

  return (
    response.data?.access_token ??
    response.data?.accessToken ??
    response.access_token ??
    response.accessToken ??
    null
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const callbackUrl =
      process.env.GOOGLE_CALLBACK_API_URL || `${BASE_URL}/api/v1/auth/google/callback`;

    const backendResponse = await fetch(callbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    const response = NextResponse.json(data);
    const accessToken = getAccessToken(data);

    if (accessToken) {
      response.cookies.set('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: 'Unable to complete Google authentication. Please try again.' },
      { status: 500 },
    );
  }
}
