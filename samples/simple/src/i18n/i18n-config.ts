import en from './en';

export const Locales = ['de', 'en'] as const
export type Locale = typeof Locales[number]

export type Translation = typeof en;