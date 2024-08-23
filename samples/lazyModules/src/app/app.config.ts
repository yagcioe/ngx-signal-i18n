import { ApplicationConfig, inject, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { TranslationService } from '../i18n/translation.service';

const routes: Routes = [{
  path: 'lazy',

  canMatch: [
    // As far as I know Angular does not provide a better way to asynchronously initalize a module with DI.
    () => {
      // this must be called before the import statement to remain in a injection context
      const lang = inject(TranslationService).language;
      // lazy load module here and initalize the language with the current language of the parent translation service
      return import("./lazy-module/lazy.module").then(m => m.LazyModule.initTranslationConfig(lang)).then(() => true)
    }],
  // this does not actually load the module but provides just the routes to Angular
  loadChildren: () => import("./lazy-module/lazy.module").then(m => m.LazyModule),

}]

export const appConfig: ApplicationConfig = {
  providers: [
    // this app is zoneless
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
