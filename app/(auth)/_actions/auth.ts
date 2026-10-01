'use server';

import { cookies } from 'next/headers';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://campus-guide-backend.vercel.app';

export async function loginUserAction(payload: { email: string; password: string }) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // সংশোধন করা হয়েছে
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      console.error('Backend returned HTML or Non-JSON response:', errorText);
      return { 
        success: false, 
        message: `Server Error (${response.status}): Backend API URL ভুল অথবা ব্যাকএন্ডে সমস্যা হয়েছে।` 
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data?.message || 'Login failed' };
    }

    const token = data?.data?.accessToken || data?.accessToken || data?.token;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set('accessToken', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true, data: data?.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}

export async function registerUserAction(payload: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  departmentId: string;
  profilePhoto?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await response.text();
      console.error('Backend returned HTML or Non-JSON response:', errorText);
      return { 
        success: false, 
        message: `Server Error (${response.status}): Backend API URL ভুল অথবা ব্যাকএন্ডে সমস্যা হয়েছে।` 
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data?.message || 'Registration failed' };
    }

    const token = data?.data?.accessToken || data?.accessToken || data?.token;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set('accessToken', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true, data: data?.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
}