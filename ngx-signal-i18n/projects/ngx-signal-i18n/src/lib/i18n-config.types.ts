import { type SupportedLanguageBase, type TranslationShapeBase } from "./i18n.types";

export interface TranslationConfigBase<
  TSupportedLanguage extends SupportedLanguageBase,
  TTranslationShape extends TranslationShapeBase
> {
  /** provide default Translation to remove the possible undefined type in {@link NgxSignalI18nBaseService.translation}*/
  readonly defaultTranslation?: TTranslationShape;

  /** provide default language to initally set the default language and automatically load it on startup.
   * {@link NgxSignalI18nBaseService.language$} will have an inital value.
   */
  readonly defaultLanguage?: TSupportedLanguage;

  /** Use cache to prevent calling the resolution strategy when a language has already been loaded. This reduces the amount of change detections
   * When {@link defaultTranslation} and {@link defaultLanguage} is set then those will be put into the cache aswell
   */
  readonly useCache?: boolean
}

export interface TranslationConfigWithDefaultTranslation<TTranslationShape extends TranslationShapeBase> {
  readonly defaultTranslation: TTranslationShape;
}

export interface TranslationConfigWithDefaultLanguage<TSupportedLanguage extends SupportedLanguageBase> {
  readonly defaultLanguage: TSupportedLanguage;
}

export type TranslationShapeOf<
  TTranslationShape extends TranslationShapeBase,
  TTranslationConfig extends TranslationConfigBase<SupportedLanguageBase, TranslationShapeBase>
> =
  TTranslationConfig extends TranslationConfigWithDefaultTranslation<TTranslationShape> ? TTranslationShape : TTranslationShape | undefined;

export type SupportedLanguagesOf<
  TSupportedLanguage extends SupportedLanguageBase,
  TTranslationConfig extends TranslationConfigBase<SupportedLanguageBase, TranslationShapeBase>
> =
  TTranslationConfig extends TranslationConfigWithDefaultLanguage<TSupportedLanguage> ? TSupportedLanguage : TSupportedLanguage | undefined;

export type DefaultLanguageOf<
  TTranslationConfig extends TranslationConfigBase<SupportedLanguageBase, TranslationShapeBase>
> = TTranslationConfig['defaultLanguage'];