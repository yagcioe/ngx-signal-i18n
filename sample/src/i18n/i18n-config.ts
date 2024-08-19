import { InjectionToken } from '@angular/core';
import { DefaultLanguageOf, TranslationConfigBase } from 'ngx-signal-i18n';
import en from './en';

export type SupportedLanguage = 'de' | 'en'
export type TranslationShape = typeof en;

export const translationConfig = {
  defaultTranslation: en,
  defaultLanguage: "en",
  useCache: true
} as const satisfies TranslationConfigBase<SupportedLanguage, TranslationShape>;

export type TranslationConfig = typeof translationConfig;
export type DefaultLanguage = DefaultLanguageOf<TranslationConfig>;

export const TranslationConfigToken = new InjectionToken<TranslationConfig>("translationConfig", { factory: () => translationConfig })