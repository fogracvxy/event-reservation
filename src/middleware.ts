import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  console.log("Middleware executing for path:", request.nextUrl.pathname);
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" || path === "/register" || path === "/";

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Token retrieved in middleware:", token);
  // Redirect to login if accessing a protected route without authentication
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect to home if accessing login/register while authenticated
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/admin"],
};
