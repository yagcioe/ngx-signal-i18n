import { type TranslationFunction, type TranslationShapeBase, type TranslationValue } from "./i18n.types";

type GetTranslationFunctionParameter<
    TFunction extends TranslationFunction<any>
> = TFunction extends TranslationFunction<infer TParams> ? TParams : never;

type InterpolateTranslationShapeBaseOptions<
    TType extends TranslationShapeBase
> = {
        [key in keyof TType as TType[key] extends TranslationFunction<any>
        ? key
        : TType[key] extends TranslationShapeBase
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
    : TType extends TranslationShapeBase
    ? InterpolateTranslationShapeBaseOptions<TType>
    : never;

type InterpolatedTranslationBaseShape<TType extends TranslationShapeBase> = {
    [key in keyof TType]: InterpolatedTranslation<TType[key]>;
};

export type InterpolatedTranslation<TType extends TranslationValue> =
    TType extends string
    ? TType
    : TType extends TranslationFunction<any>
    ? ReturnType<TType>
    : TType extends TranslationShapeBase
    ? InterpolatedTranslationBaseShape<TType>
    : never;