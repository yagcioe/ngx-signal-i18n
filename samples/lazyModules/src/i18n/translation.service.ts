import { Inject, Injectable } from '@angular/core';
import { NgxSignalI18nBaseService } from 'ngx-signal-i18n';
import { SupportedLanguage, TranslationConfig, TranslationConfigToken, TranslationShape } from './i18n-config';
import { LanguageProvider } from './language-provider.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService extends NgxSignalI18nBaseService<SupportedLanguage, TranslationShape, TranslationConfig> implements LanguageProvider {
  constructor(@Inject(TranslationConfigToken) config: TranslationConfig) {
    super(config);
  }

  protected override async resolutionStrategy(lang: SupportedLanguage): Promise<TranslationShape> {
    // lazy load translation file
    return (await import(`./${lang}/index.ts`)).default
  }
}