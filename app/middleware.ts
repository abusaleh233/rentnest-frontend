// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value; // LOGIN করার সময় কুকিতে সেট করতে হবে
  const pathname = request.nextUrl.pathname;

  // ১. লগইন না থাকলে ড্যাশবোর্ডে ঢুকতে দেবে না
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ২. রোল অনুযায়ী রুট প্রোটেকশন (ADMIN, OWNER, USER)
  if (pathname.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/dashboard/owner') && userRole !== 'OWNER') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/dashboard/user') && userRole !== 'USER') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};