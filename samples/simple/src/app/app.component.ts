import { Component, computed, inject, signal } from '@angular/core';
import { interpolate, InterpolatePipe } from 'ngx-signal-i18n';
import { Locale } from '../i18n/i18n-config';
import { TranslationService } from '../i18n/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
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
    const lang = ($event.target as any).value as Locale;
    this.translationService.setLocale(lang);
  }
}
