import { inject, resource, Signal } from "@angular/core";
import { LocaleBase, TranslationShape } from "./i18n.types";
import { LocaleProvider } from "./locale-provider";

export abstract class NgxSignalI18nBaseService<TLocale extends LocaleBase, TTranslation extends TranslationShape> {
  /**
   * Object that contiains languages as keys and translations as values
   */
  private cache: Partial<Record<TLocale, TTranslation>> = {}

  private readonly localeProvider: LocaleProvider<TLocale> = inject(LocaleProvider<TLocale>)

  #translation;

  public locale = this.localeProvider.locale

  /**
   * {@link Signal} that holds the current Translation
   */
  public translation: Signal<TTranslation>;

  constructor(defaultTranslation: TTranslation, private useCache = true) {
    if (this.localeProvider.locale()) {
      this.cache[this.localeProvider.locale()] = defaultTranslation as TTranslation;
    }

    this.#translation = resource({
      request: () => this.localeProvider.locale(),
      defaultValue: defaultTranslation,
      loader: async (request) => {
        const locale = request.request

        if (this.useCache) {
          const cachedTranslation = this.cache[locale];
          if (!!cachedTranslation) {
            return cachedTranslation
          }
        }

        const translation = await this.resolutionStrategy(locale);
        this.setCache(locale, translation);
        return translation;
      }
    })
    this.translation = this.#translation.value.asReadonly();
  }

  /**
   * updates the locale of the injected locale provider
   * @param locale locale to be set
   */
  public setLocale(locale: TLocale) {
    this.localeProvider.setLocale(locale)
  }

  /**
   * Loads the provided language. 
   * @param lang Language that should be loaded
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import import() }
   */
  protected abstract resolutionStrategy(lang: TLocale): Promise<TTranslation>;

  /**
   * function that defines the behaviour when a locale has been loaded
   * per default the cache and the translation signal will will be updated
   * 
   * @param locale locale that has been loaded
   * @param translationShape translation that has been loaded
   */
  protected setCache(locale: TLocale, translationShape: TTranslation) {
    if (this.useCache) {
      this.cache[locale] = translationShape
    }
  }

  /**
   * clears the cache
   */
  protected clearCache() {
    this.cache = {}
  }
}
