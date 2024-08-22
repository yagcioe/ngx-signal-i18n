import { Component, inject } from '@angular/core';
import { SupportedLanguage } from '../../i18n/i18n-config';
import { LazyTranslationService } from './i18n/lazy-translation.service';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
})
export class LazyComponent {

  protected translationService = inject(LazyTranslationService)


  protected onLanguageChange($event: Event): void {
    // this is not pretty but gets the job done
    const lang = ($event.target as any).value as SupportedLanguage;
    this.translationService.setLanguage(lang);
  }
}
