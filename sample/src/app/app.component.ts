import { Component, computed, inject, signal } from '@angular/core';
import { interpolate, InterpolatePipe } from 'ngx-signal-i18n';
import { SupportedLanguage } from '../i18n/i18n-config';
import { TranslationService } from './services/translation.service';
import { TranslationTestingService } from './services/translation-testing.service';

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
    const translationRoot = this.translationService.translation()
    // typesafe interpolarization of parameterized text only
    return interpolate(translationRoot, {
      interpolateable: { value: this.textSignal },
      nest: {
        anotherInterpolatedValue: { num: this.numSignal }
      }
    });
  });

  protected onLanguageChange($event: Event): void {
    // this is not pretty but gets the job done
    const lang = ($event.target as any).value as SupportedLanguage;
    this.translationService.language.set(lang);
  }
}
