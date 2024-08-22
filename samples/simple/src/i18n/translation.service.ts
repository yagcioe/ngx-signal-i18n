import { Inject, Injectable } from '@angular/core';
import { NgxSignalI18nBaseService } from 'ngx-signal-i18n';
import { SupportedLanguage, TranslationConfig, TranslationConfigToken, TranslationShape } from './i18n-config';

export let globalLanguage: SupportedLanguage;

@Injectable({
  providedIn: 'root',
})
export class TranslationService extends NgxSignalI18nBaseService<SupportedLanguage, TranslationShape, TranslationConfig> {

  constructor(@Inject(TranslationConfigToken) config: TranslationConfig) {
    globalLanguage = config.defaultLanguage
    super(config);
  }

  protected override async resolutionStrategy(lang: SupportedLanguage): Promise<TranslationShape> {
    // lazy load translation file
    return (await import(`./${lang}/index.ts`)).default
  }

  override setLanguage(lang: SupportedLanguage): void {
    globalLanguage = lang;
    super.setLanguage(lang);
  }
}