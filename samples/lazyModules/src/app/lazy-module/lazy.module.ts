import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationService } from '../../i18n/translation.service';
import { LazyTranslationConfig, LazyTranslationConfigToken } from './i18n/i18n.config';
import { LazyTranslationService } from './i18n/lazy-translation.service';
import { LazyComponent } from './lazy.component';

const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

let lazyTranslationConfig: LazyTranslationConfig;

@NgModule({
  declarations: [LazyComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [
    { provide: LazyTranslationService },
    // lazy get translationConfig when needed
    { provide: LazyTranslationConfigToken, useFactory: () => lazyTranslationConfig }
  ]
})
export class LazyModule {
  //workaround to load translation when module is loaded
  public static async initTranslationConfig() {
    const lang = TranslationService.globalLanguage;
    const m = await import(`./i18n/${lang}/index.ts`);
    lazyTranslationConfig = {
      defaultLanguage: lang,
      defaultTranslation: m.default,
      useCache: true
    }
    return LazyModule
  };
}

