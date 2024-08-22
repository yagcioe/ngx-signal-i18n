import { Signal } from "@angular/core";
import { SupportedLanguage } from "./i18n-config";

export interface LanguageProvider {
    language: Signal<SupportedLanguage>

    setLanguage(lang: SupportedLanguage): void
}