import { effect, inject, signal, Signal } from "@angular/core";
import { LocaleBase, TranslationShape } from "./i18n.types";
import { LocaleProvider } from "./locale-provider";

export abstract class NgxSignalI18nBaseService<TLocale extends LocaleBase, TTranslation extends TranslationShape> {
  /**
   * Object that contiains languages as keys and translations as values
   */
  private cache: Partial<Record<TLocale, TTranslation>> = {}

  private readonly localeProvider: LocaleProvider<TLocale> = inject(LocaleProvider<TLocale>)

  #translation;

  /**
   * {@link Signal} that holds the current Translation
   */
  public translation: Signal<TTranslation>;

  constructor(defaultTranslation: TTranslation, private useCache = true) {
    if (this.localeProvider.locale()) {
      this.cache[this.localeProvider.locale()] = defaultTranslation as TTranslation;
    }

    this.#translation = signal<TTranslation>(defaultTranslation)
    this.translation = this.#translation.asReadonly();

    effect(() => {
      const locale = this.localeProvider.locale();
      if (!locale) {
        this.setTranslation(undefined as any)
        return;
      }

      if (this.useCache) {
        const cachedValue = this.getCache(locale);
        if (!!cachedValue) {
          this.#translation.set(cachedValue)
          return;
        }
      }

      this.loadTranslation(locale)
    }, { allowSignalWrites: true })
  }

  /**
   * updates the locale of the injected locale provider
   * @param locale locale to be set
   */
  public setLocale(locale: TLocale) {
    this.localeProvider.setLocale(locale)
  }

  protected loadTranslation(locale: TLocale): Promise<void> {
    return this.resolutionStrategy(locale).then((translations) => this.onLocaleResolution(locale, translations))
  }

  /**
   * Loads the provided language. 
   * @param lang Language that should be loaded
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import import() }
   */
  protected abstract resolutionStrategy(lang: TLocale): Promise<TTranslation>;

  /**
   * updates the translation sigal with the provided value
   * @param translationShape value to be set
   */
  protected setTranslation(translationShape: TTranslation) {
    this.#translation.set(translationShape)
  }

  /**
   * sets the value into the cache if enabled
   * @param locale locale to set the value for
   * @param translationShape value to be set
   */
  protected setCache(locale: TLocale, translationShape: TTranslation) {
    if (this.useCache) {
      this.cache[locale] = translationShape
    }
  }

  /**
   * function that defines the behaviour when a locale has been loaded
   * per default the cache and the translation signal will will be updated
   * 
   * @param locale locale that has been loaded
   * @param translationShape translation that has been loaded
   */
  protected onLocaleResolution(locale: TLocale, translationShape: TTranslation) {
    this.setCache(locale, translationShape)
    this.setTranslation(translationShape)
  }

  /**
   * 
   * @param locale locale to look up
   * @returns cached value for provided locale
   */
  protected getCache(locale: TLocale): TTranslation | undefined {
    return this.cache[locale]
  }

  /**
   * clears the cache
   */
  protected clearCache() {
    this.cache = {}
  }
}
