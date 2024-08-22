import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'lazy',
  loadChildren: () => import("./lazy-module/lazy.module").then(m => m.LazyModule.initTranslationConfig()),
}]

export const appConfig: ApplicationConfig = {
  providers: [
    // this app is zoneless
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
