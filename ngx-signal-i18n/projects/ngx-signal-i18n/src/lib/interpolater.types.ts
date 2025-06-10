import { Signal } from "@angular/core";
import { type ReactiveTranslationFunction, type TranslationShape, type TranslationValue } from "./i18n.types";

type Prettify<T> =
    {
        [k in keyof T]: T[k]
    } & {}


type InterpolateTranslationShapeOptions<
    TType extends TranslationShape
> = {
        [key in keyof TType as TType[key] extends ReactiveTranslationFunction<any>
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
    : TType extends ReactiveTranslationFunction<any>
    ? Parameters<TType>
    : TType extends TranslationShape
    ? Prettify<InterpolateTranslationShapeOptions<TType>>
    : never;

type InterpolatedTranslationShape<TType extends TranslationShape> = {
    [key in keyof TType]: InterpolatedTranslation<TType[key]>;
};

export type InterpolatedTranslation<TType extends TranslationValue> =
    TType extends string
    ? TType
    : TType extends ReactiveTranslationFunction<any>
    ? Signal<ReturnType<TType>>
    : TType extends TranslationShape
    ? InterpolatedTranslationShape<TType>
    : TType extends undefined ? undefined
    : never;