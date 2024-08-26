import { type TranslationFunction, type TranslationShape, type TranslationValue } from "./i18n.types";

type GetTranslationFunctionParameter<
    TFunction extends TranslationFunction<any>
> = TFunction extends TranslationFunction<infer TParams> ? TParams : never;

type InterpolateTranslationShapeOptions<
    TType extends TranslationShape
> = {
        [key in keyof TType as TType[key] extends TranslationFunction<any>
        ? key
        : TType[key] extends TranslationShape
        ? keyof InterpolationOptions<TType[key]> extends never
        ? never
        : key
        : never]: InterpolationOptions<TType[key]>;
    };

export type InterpolationOptions<TType extends TranslationValue> =
    TType extends string
    ? undefined
    : TType extends TranslationFunction<any>
    ? GetTranslationFunctionParameter<TType>
    : TType extends TranslationShape
    ? InterpolateTranslationShapeOptions<TType>
    : never;

type InterpolatedTranslationShape<TType extends TranslationShape> = {
    [key in keyof TType]: InterpolatedTranslation<TType[key]>;
};

export type InterpolatedTranslation<TType extends TranslationValue> =
    TType extends string
    ? TType
    : TType extends TranslationFunction<any>
    ? ReturnType<TType>
    : TType extends TranslationShape
    ? InterpolatedTranslationShape<TType>
    : never;