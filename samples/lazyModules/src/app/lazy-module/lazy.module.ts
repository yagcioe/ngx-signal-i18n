import { NgModule, Signal } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Locale } from '../../i18n/i18n-config';
import { LAZY_DEFAULT_TRANSLATION, LazyTranslation } from './i18n/i18n.config';
import { LazyTranslationService } from './i18n/lazy-translation.service';
import { LazyComponent } from './lazy.component';

const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

/** this config will be lazy loaded when the module is initalized.
 * @see AppConfig
 *  */
let lazyTranslation: LazyTranslation;

@NgModule({
  declarations: [LazyComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [
    { provide: LazyTranslationService },
    // lazy get translationConfig when needed
    { provide: LAZY_DEFAULT_TRANSLATION, useFactory: () => lazyTranslation }
  ]
})
export class LazyModule {

  //workaround to load translation when module is loaded
  public static async initTranslationConfig(langSig: Signal<Locale>): Promise<void> {

    if (lazyTranslation) return;
    const lang = langSig();
    const m = await import(`./i18n/${lang}/index.ts`);
    lazyTranslation = m.default
  };
}

