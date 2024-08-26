import { InjectionToken } from '@angular/core';
import lazyEn from './en';

export type LazyTranslation = typeof lazyEn;

export const LAZY_DEFAULT_TRANSLATION = new InjectionToken<LazyTranslation>("DEFAULT_TRANSLATION")