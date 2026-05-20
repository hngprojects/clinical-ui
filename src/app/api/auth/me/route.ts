const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.staging.clinsight.hng14.com';

export async function GET(request: Request) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: {
        // Forward the auth header from the client
        Authorization: request.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) return Response.json(null, { status: response.status });

    const data = await response.json();
    return Response.json(data);
  } catch {
    return Response.json(null, { status: 500 });
  }
}
