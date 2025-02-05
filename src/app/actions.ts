"use server";

import { cookies } from 'next/headers';

export async function createCookies(token: string) {
  const url = new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000');
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    domain: url.hostname === 'localhost' ? 'localhost' : url.hostname,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

export async function removeCookies() {
  cookies().delete("token");
}

export async function getCookies(name: string) {
  const cookieStore = cookies();
  const cookie = await cookieStore.get(name);
  return cookie;
}

export async function authenticated() {
  const token = await getCookies("token");
  return !!token;
}
