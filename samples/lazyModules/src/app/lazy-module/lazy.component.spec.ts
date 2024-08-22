import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationTestingService } from '../../i18n/translation-testing.service';
import { TranslationService } from '../../i18n/translation.service';
import lazyEn from './i18n/en';
import { LazyTranslationConfig, LazyTranslationConfigToken } from './i18n/i18n.config';
import { LazyTranslationTestingService } from './i18n/lazy-translation-testing.service';
import { LazyTranslationService } from './i18n/lazy-translation.service';
import { LazyComponent } from './lazy.component';


describe('LazyComponent', () => {
  let component: LazyComponent;
  let fixture: ComponentFixture<LazyComponent>;
  let translationService:LazyTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: LazyTranslationConfigToken, useValue: { defaultLanguage: "en", defaultTranslation: lazyEn, useCache: true } satisfies LazyTranslationConfig },
        { provide: TranslationService, uesClass: TranslationTestingService },
        { provide: LazyTranslationService, useClass: LazyTranslationTestingService }
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
