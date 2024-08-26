import { Inject, Injectable } from '@angular/core';
import { NgxSignalI18nBaseService } from 'ngx-signal-i18n';
import { Locale } from '../../../i18n/i18n-config';
import { LAZY_DEFAULT_TRANSLATION, LazyTranslation } from './i18n.config';

@Injectable()
export class LazyTranslationService extends NgxSignalI18nBaseService<Locale, LazyTranslation> {
  constructor(@Inject(LAZY_DEFAULT_TRANSLATION) lazyTranslation: LazyTranslation) {
    super(lazyTranslation)
  }

  protected override resolutionStrategy(lang: Locale): Promise<LazyTranslation> {
    return import(`./${lang}/index.ts`).then(m => m.default)
  }
}
