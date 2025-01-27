import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const getJwtSecretKey = () => {
  return new TextEncoder().encode(JWT_SECRET);
};

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function verifyAuth(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1] || "";

  if (!token) {
    return null;
  }

  return await verifyJwtToken(token);
}

export function setTokenCookie(token: string) {
  // 设置 cookie
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    // 设置过期时间为 7 天
    maxAge: 7 * 24 * 60 * 60
  });
}

export function getTokenFromCookie() {
  return cookies().get("token")?.value;
}

export function removeTokenCookie() {
  cookies().delete("token");
}
