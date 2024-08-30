import { Injectable } from '@angular/core';
import { createProxy } from 'ngx-signal-i18n';
import en from './en';
import { Locale, Translation } from './i18n-config';
import { TranslationService } from './translation.service';

@Injectable()
export class TranslationTestingService extends TranslationService {

  private translationMock: Translation

  constructor() {
    // override the default translation with a proxy that return the access path instead of the value
    const translation = createProxy(en)
    super({ translation })
    this.translationMock = translation
  }

  protected override async resolutionStrategy(_: Locale): Promise<Translation> {
    // don't actually resolve translation because the proxy will return the same value anyway
    return this.translationMock
  }
}
