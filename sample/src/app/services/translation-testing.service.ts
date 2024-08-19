import { Inject, Injectable } from '@angular/core';
import { createProxy } from 'ngx-signal-i18n';
import { SupportedLanguage, TranslationConfig, TranslationConfigToken, TranslationShape } from '../../i18n/i18n-config';
import { TranslationService } from './translation.service';

@Injectable()
export class TranslationTestingService extends TranslationService {

  constructor(@Inject(TranslationConfigToken) config: TranslationConfig) {
    // override the default translation with a proxy that return the access path instead of the value
    const testingConfig = { ...config, defaultTranslation: createProxy(config.defaultTranslation) };
    super(testingConfig)
  }

  protected override async resolutionStrategy(_: SupportedLanguage): Promise<TranslationShape> {
    // don't actually resolve translation because the proxy will return the same value anyway
    return this.config.defaultTranslation
  }
}
