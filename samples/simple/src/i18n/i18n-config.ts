import { InjectionToken } from '@angular/core';
import en from './en';

export const Locales = ['de', 'en'] as const
export type Locale = typeof Locales[number]

export type Translation = typeof en;

export const DEFAULT_TRANSLATION = new InjectionToken<Translation>("DEFAULT_TRANSLATION")