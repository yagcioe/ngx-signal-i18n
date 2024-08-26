import { type Signal } from '@angular/core';

export type TranslationFunctionParams = Record<string, Signal<any>>

export type TranslationFunction<TParams extends TranslationFunctionParams> = (params: TParams) => Signal<string>;

export type TranslationShape = {
  [key: string]: TranslationValue;
};

export type TranslationValue =
  string |
  TranslationFunction<any> |
  TranslationShape;

export type LocaleBase = string;