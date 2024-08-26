
export type Expect<TExpected extends boolean> = TExpected

export type Equal<A, B> = A extends B ? B extends A ? true : false : false;
export type Extends<A, B> = A extends B ? true : false;

export type DebugExpandRecursive<T> = T extends object
    ? T extends infer O
    ? { [K in keyof O]: DebugExpandRecursive<O[K]> }
    : never
    : T;