import { Component, computed, inject, signal } from '@angular/core';
import { interpolate, InterpolatePipe } from 'ngx-signal-i18n';
import { SupportedLanguage } from '../i18n/i18n-config';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../i18n/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // providers: [{ provide: TranslationService, useClass: TranslationTestingService }],
  imports: [InterpolatePipe, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected translationService = inject(TranslationService);
  protected router = inject(Router)

  protected textSignal = signal('text');
  protected numSignal = signal(0);


  protected interpolatedTranslations = computed(() => {
    const translationRoot = this.translationService.translation()
    // typesafe interpolarization of parameterized text only
    return interpolate(translationRoot, {
      interpolatable: { text: this.textSignal },
      nest: {
        anotherInterpolatedValue: { num: this.numSignal }
      }
    });
  });

  protected onLanguageChange($event: Event): void {
    const lang = ($event.target as any).value as SupportedLanguage;
    this.translationService.setLanguage(lang);
  }

  protected routeToLazy(): void {
    this.router.navigate(["lazy"])
  }

  protected routehome(): void {
    this.router.navigateByUrl("")
  }
}
