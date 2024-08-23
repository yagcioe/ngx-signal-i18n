import { type TranslationFunction, type TranslationShapeBase, type TranslationValue } from "./i18n.types";
import { type InterpolatedTranslation, type InterpolationOptions } from "./interpolater.types";

export function interpolate<TTanslation extends TranslationValue>(interpolationObject: undefined | null, params: InterpolationOptions<TTanslation>): undefined;
export function interpolate<TTanslation extends TranslationValue>(interpolationObject: TTanslation, params: InterpolationOptions<TTanslation>): InterpolatedTranslation<TTanslation>;
export function interpolate<TTanslation extends TranslationValue>(interpolationObject: TTanslation | null | undefined, params: InterpolationOptions<TTanslation>): InterpolatedTranslation<TTanslation> | undefined;
export function interpolate<TTanslation extends TranslationValue>(interpolationObject: TTanslation | null | undefined, params: InterpolationOptions<TTanslation>): InterpolatedTranslation<TTanslation> | undefined {
    if (interpolationObject == undefined) return undefined;

    if (typeof interpolationObject === 'string') {
        return interpolateLiteral(interpolationObject);
    }
    if (typeof interpolationObject === 'function') {
        return interpolateFunction(interpolationObject, params) as InterpolatedTranslation<TTanslation>;
    }
    if (typeof interpolationObject === 'object') {
        return interpolateObject(interpolationObject, params) as InterpolatedTranslation<TTanslation>;
    }
    throw Error('Value was not a TranslationValue');
}

function interpolateObject<TTanslation extends TranslationShapeBase>(
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

