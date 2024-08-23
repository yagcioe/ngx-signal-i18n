import { computed } from "@angular/core";
import { type TranslationFunctionParamsBase, type TranslationShapeBase } from "./i18n.types";

function createProxyInner<TTranslationShape extends TranslationShapeBase>(target: TTranslationShape | undefined, currentKeyPath: string): TTranslationShape | undefined {
    if (target === undefined) return undefined
    return new Proxy(target, {
        get: <TKey extends keyof TTranslationShape & string & symbol>(target: TTranslationShape, key: TKey): TTranslationShape[TKey] => {

            const targetValue = target[key];
            if (typeof targetValue === "string") return currentKeyPath + key as TTranslationShape[TKey];
            if (typeof targetValue === "function")
                return ((params: TranslationFunctionParamsBase) => computed(() => {
                    const paramsStringified = JSON.stringify(Object.fromEntries(Object.entries(params).map(([key, value]) => {
                        return [key, value.toString()]
                    })))
                    return currentKeyPath + key + paramsStringified
                })) as TTranslationShape[TKey];
            if (typeof targetValue === "object") return createProxyInner(targetValue as TTranslationShape[TKey] & TranslationShapeBase, currentKeyPath + key + ".") as TTranslationShape[TKey]
            return targetValue;
        },
    })
}

/**
 * Creates a {@link Proxy} of a translation. Access operations will be concatinated until a leaf in the object tree is reached.
 * Useful when mocking a translation
 * 
 * Example:
 * 
 * target:
 * ```ts 
 * const obj = {nest:{value:"stringValue"}, anotherProp:12}
 * ```
 * 
 * access:
 * ```ts 
 * obj.nest.value
 * ```
 * 
 * result:
 * ```ts 
 * "nest.value"
 * ```
 * 
 * @param target object to proxy
 * @returns Proxy of {@link target}
 */

export function createProxy<TTranslationShape extends TranslationShapeBase>(target: undefined): undefined;
export function createProxy<TTranslationShape extends TranslationShapeBase>(target: TTranslationShape): TTranslationShape;
export function createProxy<TTranslationShape extends TranslationShapeBase>(target: TTranslationShape | undefined): TTranslationShape | undefined
export function createProxy<TTranslationShape extends TranslationShapeBase>(target: TTranslationShape | undefined): TTranslationShape | undefined {
    return createProxyInner(target, "")
}