import { Provider, signal, WritableSignal } from '@angular/core';
import { LocaleBase } from './i18n.types';

export class LocaleProvider<TLocale extends LocaleBase> {
  #locale: WritableSignal<TLocale>

  /**
   * Signal that holds the current Locale
   */
  locale

  /** provide the initially set default Locale
  */
  constructor(defaultLocale: TLocale) {
    this.#locale = signal(defaultLocale)
    this.locale = this.#locale.asReadonly()
  }

  public setLocale(locale: TLocale) {
    this.#locale.set(locale)
  }
}

/**
 * @param defaultLocale 
 * @returns Angular provider with a {@link LocaleProvider LocaleProvider} with a value of the default locale
 */
export function provideLocale<TLocale extends LocaleBase>(defaultLocale: TLocale) {
  return {
    provide: LocaleProvider<TLocale>, useValue: new LocaleProvider<TLocale>(defaultLocale)
  } satisfies Provider
}

/**
 * Tries to find the prefered locale or language in the provided locales array. If the full locale of the prefered locale does not match it tries to match the language code of the prefered locale.
 * @param locales readonly Array with available locales
 * @param preferedLocale locale that is tried to match against the prvided locales
 * @param fallbackLocale fallback when no Locale matches the browser locale
 * @returns Angular provider with a {@link LocaleProvider LocaleProvider} containing a the prefered locale or language from the provided Array or the fallback.
 */
export function providePreferedLocale<TLocale extends LocaleBase, TLocales extends readonly TLocale[] = readonly TLocale[]>(locales: TLocales, preferedLocale: LocaleBase | null, fallbackLocale: TLocale) {

  let bestLocale: TLocale = fallbackLocale;

  const supportedLocale = locales.find((locale) => locale === preferedLocale)
  if (supportedLocale) bestLocale = supportedLocale;

  const preferedLanguage = preferedLocale?.split("-")[0]
  const supportedLanguage = locales.find(locale => locale === preferedLanguage)
  if (supportedLanguage)
    bestLocale = supportedLanguage;

  return provideLocale(bestLocale)
}

/**
 * 
 * @param locales readonly Array with available locales
 * @param fallbackLocale fallback when no Locale matches the browser locale
 * @returns Angular provider with a {@link LocaleProvider LocaleProvider} containing a matching locale from the provided Array or the fallback
 */
export function provideBrowserLocale<TLocale extends LocaleBase, TLocales extends readonly TLocale[] = readonly TLocale[]>(locales: TLocales, fallbackLocale: TLocale) {
  const navigator = window.navigator as any;
  const browserLocale = navigator.languages && navigator.languages[0] || navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage || null;

  return providePreferedLocale(locales, browserLocale, fallbackLocale)
}
