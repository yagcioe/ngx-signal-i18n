import { Injectable } from '@angular/core';
import { createProxy } from 'ngx-signal-i18n';
import { Locale } from '../../../i18n/i18n-config';
import lazyEn from './en';
import { LazyTranslation } from './i18n.config';
import { LazyTranslationService } from './lazy-translation.service';

@Injectable()
export class LazyTranslationTestingService extends LazyTranslationService {

  private translationMock: LazyTranslation

  constructor() {
    // override the default translation with a proxy that return the access path instead of the value
    const translation = createProxy(lazyEn)
    super(translation)
    this.translationMock = translation
  }

  protected override async resolutionStrategy(_: Locale): Promise<LazyTranslation> {
    // don't actually resolve translation because the proxy will return the same value anyway
    return this.translationMock
  }
}
