import { Inject, Injectable } from '@angular/core';
import { createProxy } from 'ngx-signal-i18n';

import { SupportedLanguage } from '../../../i18n/i18n-config';
import { TranslationService } from '../../../i18n/translation.service';
import { LazyTranslationConfig, LazyTranslationConfigToken, LazyTranslationShape } from './i18n.config';
import { LazyTranslationService } from './lazy-translation.service';

@Injectable()
export class LazyTranslationTestingService extends LazyTranslationService {

  constructor(rootTranslationService: TranslationService, @Inject(LazyTranslationConfigToken) config: LazyTranslationConfig) {
    // override the default translation with a proxy that return the access path instead of the value
    const testingConfig = { ...config, defaultTranslation: createProxy(config.defaultTranslation) };
    super(rootTranslationService, testingConfig)
  }

  protected override async resolutionStrategy(_: SupportedLanguage): Promise<LazyTranslationShape> {
    // don't actually resolve translation because the proxy will return the same value anyway
    return this.config.defaultTranslation
  }
}
