import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        //Allow auth-related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        //public routes
        if (pathname.startsWith("/api/videos") || pathname === "/") {
          return true;
        }

        //All other routes require authentication
        return !!token;
      },
    },
  }
);

//Runs middleware in all routes expect this routes that are in the matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
