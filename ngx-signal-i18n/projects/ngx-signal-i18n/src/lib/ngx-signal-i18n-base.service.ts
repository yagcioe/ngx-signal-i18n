import { effect, signal, Signal, WritableSignal } from "@angular/core";
import { SupportedLanguagesOf, TranslationConfigBase, TranslationShapeOf } from "./i18n-config.types";
import { SupportedLanguageBase, TranslationShapeBase } from "./i18n.types";

export abstract class NgxSignalI18nBaseService<TSupportedLanguage extends SupportedLanguageBase, TTranslationShape extends TranslationShapeBase, TTranslationConfig extends TranslationConfigBase<TSupportedLanguage, TTranslationShape>> {
  /**
   * Object that contiains languages as keys and translations as values
   */
  private cache: Partial<Record<TSupportedLanguage, TTranslationShape>> = {}

  /**
   * Signal that holds the current Language
   */
  public language: WritableSignal<SupportedLanguagesOf<TSupportedLanguage, TTranslationConfig>>;

  #translation;

  /**
   * {@link Signal} that holds the current Translation
   */
  public translation: Signal<TranslationShapeOf<TTranslationShape, TTranslationConfig>>;

  /**
   * 
   * @param config specific instance of {@link TranslationConfigBase translation config}
   */
  constructor(protected readonly config: TTranslationConfig) {
    if (config.defaultLanguage) {
      this.cache[config.defaultLanguage] = config.defaultTranslation as TTranslationShape | undefined;
    }
    this.language = signal<SupportedLanguagesOf<TSupportedLanguage, TTranslationConfig>>(config.defaultLanguage as SupportedLanguagesOf<TSupportedLanguage, TTranslationConfig>);
    this.#translation = signal<TranslationShapeOf<TTranslationShape, TTranslationConfig>>(config.defaultTranslation as TranslationShapeOf<TTranslationShape, TTranslationConfig>)
    this.translation = this.#translation.asReadonly();

    effect(() => {
      const lang = this.language();
      if (!lang) {
        this.#translation.set(undefined as TranslationShapeOf<TTranslationShape, TTranslationConfig>)
        return;
      }

      if (this.config.useCache && this.cache[lang]) {
        this.#translation.set(this.cache[lang])
        return;
      }

      this.resolutionStrategy(lang).then((translations) => {
        this.cache[lang] = translations;
        this.#translation.set(translations)
      })
    }, { allowSignalWrites: true })
  }

  /**
   * Loads the provided language. 
   * @param lang Language that should be loaded
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import import() }
   */
  protected abstract resolutionStrategy(lang: TSupportedLanguage): Promise<TTranslationShape>;
}
