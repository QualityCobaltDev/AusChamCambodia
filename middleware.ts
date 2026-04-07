import { NextRequest, NextResponse } from 'next/server';

const gonePrefixes = ['/author/', '/tag/', '/wp-admin/', '/wp-content/', '/wp-includes/'];
const goneExact = new Set(['/feed', '/comments/feed', '/xmlrpc.php', '/wp-login.php']);
const goneDateRegex = /^\/\d{4}\/\d{2}\/\d{2}\/.+/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    goneExact.has(pathname) ||
    gonePrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.startsWith('/category/uncategorized/') ||
    goneDateRegex.test(pathname)
  ) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
