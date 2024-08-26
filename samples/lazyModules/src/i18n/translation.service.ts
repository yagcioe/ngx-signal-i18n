import { Inject, Injectable } from '@angular/core';
import { NgxSignalI18nBaseService } from 'ngx-signal-i18n';
import { DEFAULT_TRANSLATION, Locale, Translation } from './i18n-config';

@Injectable({
  providedIn: 'root',
})
export class TranslationService extends NgxSignalI18nBaseService<Locale, Translation> {
  constructor(@Inject(DEFAULT_TRANSLATION) config: Translation) {
    super(config, true);
  }

  protected override async resolutionStrategy(lang: Locale): Promise<Translation> {
    // lazy load translation file
    return (await import(`./${lang}/index.ts`)).default
  }
}