import { type Signal } from '@angular/core';

export type TranslationFunctionParamsBase = Record<string, Signal<any>>

export type TranslationFunction<TParams extends TranslationFunctionParamsBase> = (params: TParams) => Signal<string>;

export type TranslationShapeBase = {
  [key: string]: TranslationValue;
};

export type TranslationValue =
  string |
  TranslationFunction<any> |
  TranslationShapeBase;

export type SupportedLanguageBase = string;