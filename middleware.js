import { NextResponse } from "next/server";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    let data = (await request.cookies).get("token");
    if (data === undefined || data === "undefined") {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  } else if (request.nextUrl.pathname === "/page") {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  api: {
    bodyParser: false,
    matcher: /^(\/admin|\/page)$/i,
  },
};
