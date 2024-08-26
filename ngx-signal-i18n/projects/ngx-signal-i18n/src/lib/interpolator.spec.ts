import { computed, signal, Signal } from "@angular/core";
import { interpolate, InterpolatedTranslation, InterpolationOptions, TranslationShape } from "ngx-signal-i18n";
import { Equal, Expect, Extends } from "./testing-util.spec";

describe("interpolator", () => {

    it("should pass sanitiy check", () => {
        const com = computed(() => `comp`);
        const sig = signal(`sig`);
        const expected = '"[Computed: comp]"';
        const stringified = stringify(com)
        expect(JSON.stringify(com) as string | undefined).toBe(undefined)
        expect(stringified).toBe(expected)
        expect(com.toString()).toBe("[Computed: comp]")
        expect(sig.toString()).toBe("[Signal: sig]")

    });

    it("should translate shape", () => {
        const shape = {
            title: 'Titel',
            interpolateable: (params: { value: Signal<string> }) =>
                computed(() => `Das ist ein intepolierter Wert: ${params.value()}`),
            nest: {
                title: 'geschachtelter Titel',
                anotherInterpolatedValue: (params: { num: Signal<number> }) =>
                    computed(() => `Das ist ein geschachtelter interpolierter Wert ${params.num()}`),
            },
            simpleNest: {
                str: 'F',
            },
        } satisfies TranslationShape;

        const options = {
            interpolateable: {
                value: signal("")
            },
            nest: {
                anotherInterpolatedValue: {
                    num: signal(0)
                }
            }
        } satisfies InterpolationOptions<typeof shape>

        const expected = {
            title: 'Titel',
            interpolateable: computed(() => `Das ist ein intepolierter Wert: ${signal("")()}`),
            nest: {
                title: 'geschachtelter Titel',
                anotherInterpolatedValue: computed(() => `Das ist ein geschachtelter interpolierter Wert ${signal(0)()}`),
            },
            simpleNest: {
                str: 'F',
            },
        } satisfies InterpolatedTranslation<typeof shape>;

        const interpolated = interpolate(shape, options)
        expect(stringify(interpolated)).toEqual(stringify(expected))
    });

    it("should translate simple shape", () => {
        const shape = {
            title: 'Titel',
        } satisfies TranslationShape;

        const o: InterpolationOptions<typeof shape> = {}

        const expected = {
            title: 'Titel',
        } satisfies InterpolatedTranslation<typeof shape>;

        const interpolated = interpolate(shape, o)
        expect(stringify(interpolated)).toEqual(stringify(expected))
    });

    it("should with translate empty parameters", () => {
        const shape = {
            interpolateable: () =>
                computed(() => `Das ist ein intepolierter Wert:`),
            nest: {
                anotherInterpolatedValue: () =>
                    computed(() => `Das ist ein geschachtelter interpolierter Wert`),
            },
        } satisfies TranslationShape;

        const options = {
            interpolateable: {},
            nest: {
                anotherInterpolatedValue: {}
            }
        } satisfies InterpolationOptions<typeof shape>

        const expected = {
            interpolateable: computed(() => `Das ist ein intepolierter Wert:`),
            nest: {
                anotherInterpolatedValue: computed(() => `Das ist ein geschachtelter interpolierter Wert`),
            },
        } satisfies InterpolatedTranslation<typeof shape>;

        const interpolated = interpolate(shape, options)
        expect(stringify(interpolated)).toEqual(stringify(expected))
    });

    it("should with interpolate with no parameters required", () => {
        const shape = {
            nest: {
                t: ""
            },
        } satisfies TranslationShape;

        const options = {
            interpolateable: {},
            nest: {
                anotherInterpolatedValue: {}
            }
        } satisfies InterpolationOptions<typeof shape>

        const expected = {
            nest: {
                t: ""
            },
        } satisfies InterpolatedTranslation<typeof shape>;

        const interpolated = interpolate(shape, options)
        expect(stringify(interpolated)).toEqual(stringify(expected))
    });

    it("should interpolate minmal translations", () => {
        const str = interpolate("str", undefined);
        const fun = interpolate(() => computed(() => "test"), {});
        const funWithParams = interpolate((params: { test: Signal<number> }) => computed(() => `test${params.test()}`), { test: signal(2) });
        expect(stringify(str)).toEqual(stringify("str"));
        expect(stringify(fun)).toEqual(stringify(computed(() => "test")));
        expect(stringify(funWithParams)).toEqual(stringify(computed(() => "test2")));
    });

    it("should compile", () => {
        const simpleShape = {
            title: 'Titel',
            nest: {
                a: "qw"
            },

        } satisfies TranslationShape;

        const interpolatebleShape = {
            title: 'Titel',
            interpolateable: (params: { value: Signal<string> }) =>
                computed(() => `Das ist ein intepolierter Wert: ${params.value()}`),

        } satisfies TranslationShape;

        const expectedSimpleResult = simpleShape;
        const expectedInterpolatableResult = {
            title: "",
            interpolateable: computed(() => ``),
        }

        const simpleOptions = {} satisfies InterpolationOptions<typeof simpleShape>;
        const simpleOptions2 = { test: "" } satisfies InterpolationOptions<typeof simpleShape>;
        const interpolatableOptions = { interpolateable: { value: computed(() => "") } } satisfies InterpolationOptions<typeof interpolatebleShape>;
        const interpolatableOptions2 = { interpolateable: { value: computed(() => ""), test: "" } };

        {
            const testOptions1: Expect<Equal<InterpolationOptions<typeof simpleShape>, typeof simpleOptions>> = true;
            const testOptions2: Expect<Equal<InterpolationOptions<typeof simpleShape>, typeof simpleOptions2>> = false;
            const testOptions3: Expect<Extends<typeof simpleOptions2, InterpolationOptions<typeof simpleShape>>> = true;
            const testOptions4: Expect<Equal<InterpolationOptions<typeof interpolatebleShape>, typeof interpolatableOptions>> = true;
            const testOptions5: Expect<Equal<InterpolationOptions<typeof interpolatebleShape>, typeof interpolatableOptions2>> = false;
        }
        {
            const testResult1: Expect<Equal<InterpolatedTranslation<typeof simpleShape>, typeof expectedSimpleResult>> = true;
            const testResult2: Expect<Equal<InterpolatedTranslation<typeof interpolatebleShape>, typeof expectedInterpolatableResult>> = true;
        }
        expect(true).toBeTrue()
    })

    function stringify(obj: any): string {
        return JSON.stringify(obj, (_, value) => {
            if (typeof value === "function") {
                return (value as Function).toString()
            }
            return value
        })
    }
})
