import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideDefaultLocale } from 'ngx-signal-i18n';
import { Locale } from '../../i18n/i18n-config';
import { LazyTranslationTestingService } from './i18n/lazy-translation-testing.service';
import { LazyTranslationService } from './i18n/lazy-translation.service';
import { LazyComponent } from './lazy.component';



describe('LazyComponent', () => {
  let component: LazyComponent;
  let fixture: ComponentFixture<LazyComponent>;
  let translationService: LazyTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideDefaultLocale<Locale>("en"),
        { provide: LazyTranslationService, useClass: LazyTranslationTestingService },
      ],
      declarations: [LazyComponent]
    })
      .compileComponents();

    translationService = TestBed.inject(LazyTranslationService)
    fixture = TestBed.createComponent(LazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mock Translation', () => {
    expect(translationService.translation().lazyTitle).toBe("lazyTitle")
  });
});
