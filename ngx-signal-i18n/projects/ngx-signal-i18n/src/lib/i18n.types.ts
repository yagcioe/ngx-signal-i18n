export type ReactiveTranslationFunction<TParams extends readonly any[]> = (...opt: [...TParams]) => string;

export type TranslationShape = {
  [key: string]: TranslationValue;
};

export type TranslationValue =
  string |
  ReactiveTranslationFunction<any> |
  TranslationShape;

export type LocaleBase = string;