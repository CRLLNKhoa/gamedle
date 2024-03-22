import createMiddleware from 'next-intl/middleware';
import {localePrefix} from './navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['vi', 'en'],
  localePrefix,
  // Used when no locale matches
  defaultLocale: 'vi'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en)/:path*']
};