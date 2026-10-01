import { NextRequest, NextResponse } from 'next/server';
import { createContentSecurityPolicy } from './lib/content-security-policy';

export function middleware(request: NextRequest) {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const nonce = btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''));
  const policy = createContentSecurityPolicy(nonce, process.env.NODE_ENV === 'development');
  const requestHeaders = new Headers(request.headers);

  // Replace caller-supplied values. Next.js reads this request CSP and attaches
  // the nonce to both its framework scripts and inline hydration scripts.
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', policy);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', policy);
  // HTML and its nonce must stay paired and must not be reused by a CDN.
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
}

export const config = {
  matcher: [
    '/((?!api(?:/|$)|_next/static(?:/|$)|_next/image(?:/|$)|favicon\\.svg$|Akshat_Shettigar_Resume1?\\.pdf$|flowboard-overview\\.txt$).*)',
  ],
};
