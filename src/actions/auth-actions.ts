'use server';

const SIGNUP_URL =
  process.env.NEXT_PUBLIC_SIGNUP_API_URL ||
  'https://api.staging.clinsight.hng14.com/api/v1/auth/signup';
const SIGNIN_URL =
  process.env.NEXT_PUBLIC_SIGNIN_API_URL ||
  'https://api.staging.clinsight.hng14.com/api/v1/auth/login';
const VERIFY_OTP_URL =
  process.env.NEXT_PUBLIC_VERIFY_OTP_API_URL ||
  'https://api.staging.clinsight.hng14.com/api/v1/auth/verify-otp';
const RESEND_OTP_URL =
  process.env.NEXT_PUBLIC_RESEND_OTP_API_URL ||
  'https://api.staging.clinsight.hng14.com/api/v1/auth/resend-otp';

async function handleApiResponse(response: Response, defaultError: string) {
  if (!response.ok) {
    let errorMessage = defaultError;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        const err = await response.json();
        errorMessage =
          err.message || err.detail || err.error || JSON.stringify(err) || defaultError;
      } catch {
        errorMessage = (await response.text()) || defaultError;
      }
    } else {
      errorMessage = (await response.text()) || defaultError;
    }
    return { error: errorMessage };
  }

  try {
    const data = await response.json();
    return { success: true, data };
  } catch {
    return { success: true, data: null };
  }
}

export async function verifyOtpAction(email: string, code: string) {
  if (!email) return { error: 'Email is required for verification.' };
  if (!code || code.length !== 6) {
    return { error: 'Invalid OTP. Please enter a 6-digit code.' };
  }

  console.log(`Verifying OTP for ${email}: ${code} at ${VERIFY_OTP_URL}`);

  try {
    const response = await fetch(VERIFY_OTP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    const result = await handleApiResponse(response, 'Verification failed');
    if (result.error) {
      console.error('OTP Verification API Error:', result.error);
    }
    return result;
  } catch (error) {
    console.error('OTP Verification Network Error:', error);
    return { error: 'Unable to reach the server. Please check your connection.' };
  }
}

export async function signupAction(data: { fullName: string; email: string; password: string }) {
  const nameParts = data.fullName.trim().split(' ');
  const first_name = nameParts[0] || '';
  const last_name = nameParts.slice(1).join(' ') || first_name;

  try {
    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name,
        last_name,
        email: data.email,
        password: data.password,
        confirm_password: data.password,
      }),
    });

    return await handleApiResponse(response, 'Signup failed');
  } catch (error) {
    console.error('Signup Error:', error);
    return { error: 'Unable to reach the server. Please check your connection.' };
  }
}

export async function signinAction(data: { email: string; password: string }) {
  try {
    const response = await fetch(SIGNIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    return await handleApiResponse(response, 'Signin failed');
  } catch (error) {
    console.error('Signin Error:', error);
    return { error: 'Unable to reach the server. Please check your connection.' };
  }
}

export async function resendOtpAction(email: string) {
  if (!email) return { error: 'Email is required to resend OTP.' };

  try {
    const response = await fetch(RESEND_OTP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    return await handleApiResponse(response, 'Failed to resend OTP');
  } catch (error) {
    console.error('Resend OTP Error:', error);
    return { error: 'Unable to reach the server. Please check your connection.' };
  }
}
