import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es", "zh", "hi", "ar", "bn", "pt", "ru", "ja", "fr"],
 
  // Used when no locale matches
  defaultLocale: 'en'
});