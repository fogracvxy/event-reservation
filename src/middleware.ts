import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" || path === "/register" || path === "/";

  // Explicitly exclude paths for static files and assets
  const isStaticAsset =
    path.startsWith("/_next/") || path.startsWith("/images/");

  if (isStaticAsset) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    "/admin",
  ],
};
