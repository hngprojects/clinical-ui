export async function getCurrentUser() {
  try {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    const response = await fetch('/api/auth/me', {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) return null;
    const result = await response.json();
    return result?.data || null;
  } catch {
    return null;
  }
}
