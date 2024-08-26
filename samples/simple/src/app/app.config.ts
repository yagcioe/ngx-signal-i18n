import { ApplicationConfig, InjectionToken, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideDefaultLocale } from "ngx-signal-i18n";
import en from '../i18n/en';
import { Locale, Translation } from '../i18n/i18n-config';

export const DEFAULT_TRANSLATION = new InjectionToken<Translation>("DEFAULT_TRANSLATION")

export const appConfig: ApplicationConfig = {
  providers: [
    // this app is zoneless
    provideExperimentalZonelessChangeDetection(),
    provideDefaultLocale<Locale>("en"),
    { provide: DEFAULT_TRANSLATION, useValue: en }
  ]
};
