export type objectlike = Record<string, unknown>

export type Mask<TType> =
    TType extends objectlike ?
    boolean | { [key in keyof TType]?: Mask<TType[key]> } : boolean;

export type OmitDeepResult<TTarget, TOmitOptions extends Mask<TTarget>> =
    TOmitOptions extends objectlike ?
    {
        [key in keyof TTarget as key extends keyof TOmitOptions ? (TOmitOptions[key] extends true ? never : key) : key]:
        key extends keyof TOmitOptions ?
        TOmitOptions[key] extends Mask<TTarget[key]> ?
        OmitDeepResult<TTarget[key], TOmitOptions[key]> :
        TTarget[key] : TTarget[key]
    } :
    TOmitOptions extends true ? never :
    TTarget;

export type PickDeepResult<TTarget, TPickOptions extends Mask<TTarget>> =
    TPickOptions extends objectlike ?
    {
        [key in (keyof TPickOptions & keyof TTarget) as TPickOptions[key] extends objectlike | true ? key : never]:
        TPickOptions[key] extends Mask<TTarget[key]> ?
        PickDeepResult<TTarget[key], TPickOptions[key]> :
        TTarget
    } :
    TPickOptions extends true ? TTarget :
    never;
