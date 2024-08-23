import { Component, computed, inject, signal } from '@angular/core';
import { interpolate, InterpolatePipe } from 'ngx-signal-i18n';
import { SupportedLanguage } from '../i18n/i18n-config';
import { TranslationService } from '../i18n/translation.service';
import { TranslationTestingService } from '../i18n/translation-testing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // providers: [{ provide: TranslationService, useClass: TranslationTestingService }],
  imports: [InterpolatePipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected translationService = inject(TranslationService);

  protected textSignal = signal('text');
  protected numSignal = signal(0);

  protected interpolatedTranslations = computed(() => {
    return interpolate(this.translationService.translation(), {
      interpolatable: { text: this.textSignal },
      nest: { anotherInterpolatedValue: { num: this.numSignal } }
    })
  })

  protected onLanguageChange($event: Event): void {
    const lang = ($event.target as any).value as SupportedLanguage;
    this.translationService.setLanguage(lang);
  }
}
