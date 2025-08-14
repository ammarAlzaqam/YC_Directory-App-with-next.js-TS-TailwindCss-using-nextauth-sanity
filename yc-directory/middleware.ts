import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await auth();
  if (pathname.startsWith("/startup/create") && !session?.id) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/startup/create/:path*"],
};
