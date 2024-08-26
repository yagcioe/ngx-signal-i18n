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

export function provideDefaultLocale<TLocale extends LocaleBase>(defaultLocale: TLocale): Provider {
  return {
    provide: LocaleProvider<TLocale>, useValue: new LocaleProvider<TLocale>(defaultLocale)
  }
}
