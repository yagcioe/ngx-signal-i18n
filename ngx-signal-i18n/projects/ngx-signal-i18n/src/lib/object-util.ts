import {type  Mask, type objectlike, type OmitDeepResult, type PickDeepResult } from "./object-util.types";


function isObjectLike(value: unknown): value is objectlike {
    return !!value && typeof value === "object";
}

/**
 * Picks values from an object given a mask. Leafs of the mask are simply assigned to the resulting Object. Intermediate Objects are newly created.
 * @param obj 
 * @param mask nested boolean mask of the provided object
 * @returns Object with the values picked declared by the mask
 */
export function pick<TValue, TOptions extends Mask<TValue>>(obj: TValue, mask: TOptions): PickDeepResult<TValue, TOptions> {
    if (mask === false) return undefined as PickDeepResult<TValue, TOptions>;
    if (mask === true) return obj as PickDeepResult<TValue, TOptions>;

    if (isObjectLike(mask) && isObjectLike(obj)) {
        const result = {} as any
        for (const key of Object.keys(mask) as (keyof typeof obj & keyof typeof mask & keyof typeof result & string)[]) {
            const currentOption = mask[key];
            const currentObj = obj[key];
            if (isObjectLike(currentOption)) {
                result[key] = pick(currentObj, currentOption as Mask<typeof currentObj>);
            }
            else if (currentOption === true) {
                result[key] = currentObj
            }
        }
        return result;
    }

    throw new Error("Object contains invalid type")
}

/**
 * Omits values from an object given a mask. Leafs of the mask are simply assigned to the resulting Object. Intermediate Objects are newly created.
 * @param obj 
 * @param mask nested boolean mask of the provided object
 * @returns Object with the values omited declared by the mask
 */
export function omit<TValue, TOptions extends Mask<TValue>>(obj: TValue, mask: TOptions): OmitDeepResult<TValue, TOptions> {
    if (mask === true) return undefined as OmitDeepResult<TValue, TOptions>;
    if (mask === false) return obj as OmitDeepResult<TValue, TOptions>;

    if (isObjectLike(mask) && isObjectLike(obj)) {
        const result = {} as any
        for (const key of Object.keys(obj) as (keyof typeof obj & keyof typeof result & string)[]) {
            if (mask[key] === true) continue;

            const currentOption = mask[key];
            const currentObj = obj[key];
            if (!currentOption) {
                result[key] = currentObj
            }
            else {
                result[key] = omit(currentObj, currentOption as Mask<typeof currentObj>);
            }

        }
        return result;
    }

    throw new Error("Object contains invalid type")
}