import { type TranslationFunction, type TranslationShape, type TranslationValue } from "./i18n.types";
import { type InterpolatedTranslation, type InterpolationOptions } from "./interpolater.types";

export function interpolate<TTanslation extends TranslationValue>(interpolationObject: TTanslation, params: TTanslation extends TranslationValue ? InterpolationOptions<TTanslation> : any): InterpolatedTranslation<TTanslation> {
    if (interpolationObject == undefined) return undefined as InterpolatedTranslation<TTanslation>;

    if (typeof interpolationObject === 'string') {
        return interpolateLiteral(interpolationObject) as InterpolatedTranslation<TTanslation>;
    }
    if (typeof interpolationObject === 'function') {
        return interpolateFunction(interpolationObject, params) as InterpolatedTranslation<TTanslation>;
    }
    if (typeof interpolationObject === 'object') {
        return interpolateObject(interpolationObject, params) as InterpolatedTranslation<TTanslation>;
    }
    throw Error('Value was not a TranslationValue');
}

function interpolateObject<TTanslation extends TranslationShape>(
    translationObject: TTanslation,
    params: InterpolationOptions<TTanslation>
): InterpolatedTranslation<TTanslation> {
    const result: InterpolatedTranslation<TTanslation> = {} as any;
    for (const key of Object.keys(translationObject) as (keyof TTanslation)[]) {
        (result[key] as any) = interpolate(
            translationObject[key],
            !!params ? params[key as keyof typeof params] : undefined as any
        );
    }
    return result;
}

function interpolateFunction<TTranslation extends TranslationFunction<any>>(
    interpolationObject: TTranslation,
    params: InterpolationOptions<TTranslation>
): InterpolatedTranslation<TTranslation> {
    return interpolationObject(params) as InterpolatedTranslation<TTranslation>;
}

function interpolateLiteral<TTranslation extends string>(interpolationObject: TTranslation): InterpolatedTranslation<TTranslation> {
    return interpolationObject as InterpolatedTranslation<TTranslation>;
}

