import { InjectionToken } from '@angular/core';
import { TranslationConfigBase } from 'ngx-signal-i18n';
import { SupportedLanguage } from '../../../i18n/i18n-config';
import en from './en';

export type LazyTranslationShape = typeof en;
export type LazyTranslationConfig = Required<TranslationConfigBase<SupportedLanguage, LazyTranslationShape>>
export const LazyTranslationConfigToken = new InjectionToken<LazyTranslationConfig>("LazyTranslationConfig")