import { effect, InjectionToken, Injector, provideExperimentalZonelessChangeDetection, runInInjectionContext, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslationTestingService } from '../i18n/translation-testing.service';
import { TranslationService } from '../i18n/translation.service';
import { AppComponent } from './app.component';
import { provideDefaultLocale } from 'ngx-signal-i18n';


describe('AppComponent', () => {
  const RealTranslationServiceToken = new InjectionToken<TranslationService>("TranslationService")
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        // this app is zoneless
        provideExperimentalZonelessChangeDetection(),
        // replace TranslationService with TranslationTestingService for tests
        provideDefaultLocale("en"),
        { provide: TranslationService, useClass: TranslationTestingService },
        { provide: RealTranslationServiceToken, useClass: TranslationService }
      ],
      imports: [AppComponent],
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should mock translations', () => {
    const translationService = TestBed.inject(TranslationService)
    expect(translationService.translation().title).toBe("title")
    expect(translationService.translation().nest.title).toBe("nest.title")
    expect(translationService.translation().nest.anotherInterpolatedValue({ num: signal(12) })()).toBe('nest.anotherInterpolatedValue{"num":"[Signal: 12]"}')
  })

  it('should use real translations and update', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const injector = TestBed.inject<Injector>(Injector)
    const translationService = TestBed.inject<TranslationService>(RealTranslationServiceToken)
    expect(translationService.translation().title).toBe("title")
    expect(translationService.translation().nest.title).toBe("nested title")
    expect(translationService.translation().nest.anotherInterpolatedValue({ num: signal(12) })()).toBe('this is a nested value 12')


    let skip = true;
    runInInjectionContext(injector, () => {
      effect(() => {
        //subscribe to translation changes
        translationService.translation()

        //skip inital effect run in order to run after the new translation has been pushed by language.set("de")
        if (!skip) {
          // detect changes in order to pull singal changes @see 
          fixture.detectChanges();
          expect(translationService.translation().title).toBe("Titel")
          expect(translationService.translation().nest.title).toBe("geschachtelter Titel")
          expect(translationService.translation().nest.anotherInterpolatedValue({ num: signal(12) })()).toBe('Das ist ein geschachtelter interpolierter Wert 12')
          //mark test as done
          done()
        }
        skip = false;
      })
    });
    //
    translationService.setLocale("de")
  })

});
