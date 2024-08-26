import { Component } from '@angular/core';
import { Locale } from '../../i18n/i18n-config';
import { LazyTranslationService } from './i18n/lazy-translation.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
})
export class LazyComponent {

  // protected translationService = inject(LazyTranslationService)

  constructor(protected translationService: LazyTranslationService){}

  protected onLocaleChange($event: Event): void {
    // this is not pretty but gets the job done
    const lang = ($event.target as any).value as Locale;
    this.translationService.setLocale(lang);
  }
}
