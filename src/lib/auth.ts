const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.staging.clinsight.hng14.com';

export async function getCurrentUser() {
  const token = localStorage.getItem('token'); // TODO: confirm key with team
  if (!token) return null;

  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data; // { email, first_name, last_name, role, id, ... }
  } catch {
    return null;
  }
}
