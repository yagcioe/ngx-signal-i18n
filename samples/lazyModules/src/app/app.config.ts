import { APP_INITIALIZER, ApplicationConfig, inject, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LocaleProvider, provideBrowserLocale } from 'ngx-signal-i18n';
import { DEFAULT_TRANSLATION, DefaultTranslationWrapper, Locale, Locales } from '../i18n/i18n-config';

function initalizeLazyModule(): Promise<boolean> {
  // this must be called before the import statement to remain in a injection context
  const locale = inject(LocaleProvider).locale;
  // lazy load module here and initalize the language with the current language of the parent translation service
  return import("./lazy-module/lazy.module").then(m => m.LazyModule.initTranslationConfig(locale)).then(() => true)
}

const routes: Routes = [{
  path: 'lazy',

  canMatch: [
    // As far as I know Angular does not provide a better way to asynchronously initalize a module with DI.
    initalizeLazyModule
  ],
  // this does not actually load the module but provides just the routes to Angular
  loadChildren: () => import("./lazy-module/lazy.module").then(m => m.LazyModule),

}]

export const appConfig: ApplicationConfig = {
  providers: [
    // this app is zoneless
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideBrowserLocale<Locale>(Locales, "en"),
    // value for the default translation is set in the APP_INITALIZER
    { provide: DEFAULT_TRANSLATION, useValue: {} },
    {
      provide: APP_INITIALIZER, multi: true, deps: [LocaleProvider, DEFAULT_TRANSLATION],
      useFactory: (localeProvider: LocaleProvider<Locale>, defaultTranslation: DefaultTranslationWrapper) =>
        async () => {
          defaultTranslation.translation = await import(`../i18n/${localeProvider.locale()}/index.ts`).then(m => m.default);
        }
    }
  ]
};
