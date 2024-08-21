
export type objectlike = Record<string, unknown>


export type Mask<TType> =
    TType extends objectlike ?
    boolean | ObjectMask<TType> :
    boolean;

export type ObjectMask<TType extends objectlike> = { [key in keyof TType]?: Mask<TType[key]> }

export type OmitDeepResult<TTarget extends objectlike, TOmitOptions extends Readonly<Mask<TTarget>>> =
    TOmitOptions extends Readonly<objectlike> ?
    {
        [key in keyof TTarget as key extends keyof TOmitOptions ? (TOmitOptions[key] extends true ? never : key) : key]:
        key extends keyof TOmitOptions ?
        TOmitOptions[key] extends Mask<TTarget[key]> ?
        TTarget[key] extends objectlike ?
        OmitDeepResult<TTarget[key], TOmitOptions[key]> :
        TTarget[key] : TTarget[key] : TTarget[key]
    } :
    TOmitOptions extends true ? undefined :
    TTarget;

export type PickDeepResult<TTarget, TPickOptions extends Readonly<Mask<TTarget>>> =
    TPickOptions extends objectlike ?
    {
        [key in (keyof TPickOptions & keyof TTarget) as TPickOptions[key] extends objectlike | true ? key : never]:
        TPickOptions[key] extends Mask<TTarget[key]> ?
        PickDeepResult<TTarget[key], TPickOptions[key]> :
        TTarget
    } :
    TPickOptions extends true ? TTarget :
    never;
