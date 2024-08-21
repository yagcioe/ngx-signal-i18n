import { type Mask, type objectlike, type OmitDeepResult, type PickDeepResult } from "./object-util.types";


function isIndexable(value: unknown): value is objectlike {
    return !!value && typeof value === "object";
}

function isArray(value: unknown): value is Array<unknown> {
    return value instanceof Array;
}

function isKeyOf<TValue extends objectlike>(obj: TValue, key: string | number | symbol): key is keyof TValue {
    return (key in obj);
}

/**
 * Picks values from an object given a mask. Leafs of the mask are simply assigned to the resulting Object. Intermediate Objects are newly created.
 * @param obj 
 * @param mask nested boolean mask of the provided object
 * @returns Object with the values picked declared by the mask
 */
export function pick<TValue extends objectlike | undefined, TMask extends Mask<TValue>>(obj: TValue, mask: TMask): PickDeepResult<TValue, TMask> {
    if (mask === false) return undefined as PickDeepResult<TValue, TMask>;
    if (mask === true) return obj as PickDeepResult<TValue, TMask>;

    if (isIndexable(mask) && isIndexable(obj)) {
        const result = isArray(obj) ? [] : {} as any
        for (const key in mask) {
            const typedKey = key as keyof typeof mask & keyof typeof result;
            if (!isKeyOf(obj, typedKey)) continue;

            const currentOption = mask[typedKey];
            const currentObj = (obj as any)[typedKey];

            if (isIndexable(currentOption) && isIndexable(currentObj)) {
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
export function omit<TValue extends objectlike, TMask extends Mask<TValue>>(obj: TValue, mask: TMask): OmitDeepResult<TValue, TMask> {
    if (mask === true) return undefined as OmitDeepResult<TValue, TMask>;
    if (mask === false) return obj as OmitDeepResult<TValue, TMask>;

    if (isIndexable(mask) && isIndexable(obj)) {
        const result = isArray(obj) ? [] : {} as any
        for (const key in obj) {
            const typedKey = key as (keyof typeof obj & keyof typeof result);
            if (!isKeyOf(mask, typedKey) || !mask[typedKey]) {
                if (isKeyOf(obj, typedKey)) {
                    result[typedKey] = (obj as any)[typedKey];
                }
                continue;
            }
            if (mask[typedKey] === true) continue;

            const currentObj = (obj as any)[typedKey];
            const currentMask = mask[typedKey]
            if (isIndexable(currentObj) && isIndexable(currentMask)) {
                result[key] = omit(currentObj, currentMask);
            }
        }
        return result;
    }

    throw new Error("Object contains invalid type")
}