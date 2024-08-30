import { ApplicationConfig, InjectionToken, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideLocale } from "ngx-signal-i18n";
import en from '../i18n/en';
import { DEFAULT_TRANSLATION, Locale, Translation } from '../i18n/i18n-config';

export const appConfig: ApplicationConfig = {
  providers: [
    // this app is zoneless
    provideExperimentalZonelessChangeDetection(),
    // hard code inital locale and Translation
    provideLocale<Locale>("en"),
    { provide: DEFAULT_TRANSLATION, useValue: en }
  ]
};
