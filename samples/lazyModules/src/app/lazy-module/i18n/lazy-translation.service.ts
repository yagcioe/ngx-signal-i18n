import { Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { NgxSignalI18nBaseService } from 'ngx-signal-i18n';
import { filter } from 'rxjs';
import { SupportedLanguage } from '../../../i18n/i18n-config';
import { TranslationService } from '../../../i18n/translation.service';
import { LazyTranslationConfig, LazyTranslationConfigToken, LazyTranslationShape } from './i18n.config';

@Injectable()
export class LazyTranslationService extends NgxSignalI18nBaseService<SupportedLanguage, LazyTranslationShape, LazyTranslationConfig> {
  constructor(private rootTranslationService: TranslationService, @Inject(LazyTranslationConfigToken) lazyTranslationConfig: LazyTranslationConfig) {

    super(lazyTranslationConfig)
    //sync with rootTranslationService
    toObservable(rootTranslationService.language).pipe(takeUntilDestroyed(), filter((lang) => lang != this.language()))
      .subscribe((lang) => super.setLanguage(lang))
  }

  protected override resolutionStrategy(lang: SupportedLanguage): Promise<LazyTranslationShape> {
    return import(`./${lang}/index.ts`).then(m => m.default)
  }

  //sync with rootTranslationService
  public override setLanguage(lang: SupportedLanguage): void {
    this.rootTranslationService.setLanguage(lang);
  }

}
