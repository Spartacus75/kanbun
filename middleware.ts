import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Redirect to the same path with the locale prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

function getLocale(request: NextRequest): string {
  // Check for locale in cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && i18n.locales.includes(localeCookie as any)) {
    return localeCookie;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
      .find((lang) => {
        // Match exact locale (e.g., 'en')
        if (i18n.locales.includes(lang as any)) return true;
        // Match language part (e.g., 'en-US' -> 'en')
        const langPart = lang.split('-')[0];
        return i18n.locales.includes(langPart as any);
      });

    if (preferredLocale) {
      const locale = preferredLocale.split('-')[0];
      if (i18n.locales.includes(locale as any)) {
        return locale;
      }
    }
  }

  return i18n.defaultLocale;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\..*).*)'],
};
