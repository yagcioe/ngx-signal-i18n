import { omit, OmitDeepResult, pick, PickDeepResult } from "ngx-signal-i18n";
import { DebugExpandRecursive, Equal, Expect } from "./testing-util.spec";

describe("object util", () => {
    describe("pick", () => {
        it("should pick from simple objects", () => {
            const obj = { value: 12, t: 12 };

            expect(pick(obj, {})).toEqual({});
            expect(pick(obj, { value: false })).toEqual({});
            expect(pick(obj, { t: false })).toEqual({});
            expect(pick(obj, { value: false, t: false })).toEqual({});
            expect(pick(obj, { value: undefined })).toEqual({});
            expect(pick(obj, { t: undefined })).toEqual({});
            expect(pick(obj, { value: undefined, t: false })).toEqual({});
            expect(pick(obj, { value: false, t: undefined })).toEqual({});
            expect(pick(obj, { value: undefined, t: undefined })).toEqual({});

            expect(pick(obj, true)).toEqual(obj);
            expect(pick(obj, { value: true })).toEqual({ value: 12 });
            expect(pick(obj, { t: true })).toEqual({ t: 12 });
            expect(pick(obj, { value: true, t: true })).toEqual({ value: 12, t: 12 });
            expect(pick(obj, { value: undefined, t: true })).toEqual({ t: 12 });
            expect(pick(obj, { value: true, t: undefined })).toEqual({ value: 12 });
            expect(pick(obj, { value: undefined, t: undefined })).toEqual({});
        });

        it("should pick from nested objects", () => {
            const obj = { value: { t: 12, d: "" }, c: "" };

            expect(pick(obj, {})).toEqual({});
            expect(pick(obj, { value: false })).toEqual({});
            expect(pick(obj, { value: { t: false } })).toEqual({ value: {} });
            expect(pick(obj, { value: false, t: false })).toEqual({});
            expect(pick(obj, { value: undefined })).toEqual({});
            expect(pick(obj, { value: undefined, t: false })).toEqual({});
            expect(pick(obj, { value: false, t: undefined })).toEqual({});
            expect(pick(obj, { value: undefined, t: undefined })).toEqual({});

            expect(pick(obj, true)).toEqual(obj);
            expect(pick(obj, { value: true })).toEqual({ value: { t: 12, d: "" } });
            expect(pick(obj, { value: { t: true } } as const)).toEqual({ value: { t: 12 } });
            expect(pick(obj, { value: undefined, t: true })).toEqual({});
            expect(pick(obj, { value: true, t: undefined })).toEqual({ value: { t: 12, d: "" } });
        });

        it("should pick flat with arrays", () => {
            const obj = { value: [{ t: 12, d: "" }, { t: 12, d: "" }], c: [""] };

            expect(pick(obj, {})).toEqual({});
            const test1: Expect<Equal<PickDeepResult<typeof obj, {}>, {}>> = true
            expect(pick(obj, { value: false })).toEqual({});
            const test2: Expect<Equal<PickDeepResult<typeof obj, { value: false }>, {}>> = true

            expect(pick(obj, { value: false, t: false })).toEqual({});
            const test3: Expect<Equal<PickDeepResult<typeof obj, { value: false, t: false }>, {}>> = true
            expect(pick(obj, { value: undefined })).toEqual({});
            const test4: Expect<Equal<PickDeepResult<typeof obj, { value: undefined }>, {}>> = true
            expect(pick(obj, { value: undefined, t: false })).toEqual({});
            const test5: Expect<Equal<PickDeepResult<typeof obj, { value: undefined, t: false }>, {}>> = true
            expect(pick(obj, { value: false, t: undefined })).toEqual({});
            const test6: Expect<Equal<PickDeepResult<typeof obj, { value: false, t: undefined }>, {}>> = true
            expect(pick(obj, { value: undefined, t: undefined })).toEqual({});
            const test7: Expect<Equal<PickDeepResult<typeof obj, { value: undefined, t: undefined }>, {}>> = true

            expect(pick(obj, true)).toEqual(obj);
            expect(pick(obj, { value: true })).toEqual({ value: [{ t: 12, d: "" }, { t: 12, d: "" }] });
            const test8: Expect<Equal<PickDeepResult<typeof obj, { value: true }>, { value: { t: number, d: string }[] }>> = true
            expect(pick(obj, { value: undefined, t: true })).toEqual({});
            const test9: Expect<Equal<PickDeepResult<typeof obj, { value: undefined, t: true }>, {}>> = true
            expect(pick(obj, { value: true, t: undefined })).toEqual({ value: [{ t: 12, d: "" }, { t: 12, d: "" }], });
            const test10: Expect<Equal<PickDeepResult<typeof obj, { value: true, t: undefined }>, { value: { t: number, d: string }[] }>> = true
        });
    });

    describe("omit", () => {
        it("should omit from simple objects", () => {
            const obj = { value: 12, t: 12 };

            expect(omit(obj, false)).toEqual({ value: 12, t: 12 });
            expect(omit(obj, {})).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { value: false })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { t: false })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { value: false, t: false })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { value: undefined })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { t: undefined })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { value: undefined, t: false })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { value: false, t: undefined })).toEqual({ value: 12, t: 12 });
            expect(omit(obj, { value: undefined, t: undefined })).toEqual({ value: 12, t: 12 });

            expect(omit(obj, true)).toEqual(undefined);
            expect(omit(obj, { value: true })).toEqual({ t: 12 });
            expect(omit(obj, { t: true })).toEqual({ value: 12 });
            expect(omit(obj, { value: true, t: true })).toEqual({});
            expect(omit(obj, { value: undefined, t: true })).toEqual({ value: 12 });
            expect(omit(obj, { value: true, t: undefined })).toEqual({ t: 12 });

        });

        it("should omit from nested objects", () => {
            const obj = { value: { t: 12, d: "" }, c: "" };

            expect(omit(obj, false)).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, {})).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: false })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: { t: false } })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: false, t: false })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: undefined })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: undefined, t: false })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: false, t: undefined })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: undefined, t: undefined })).toEqual({ value: { t: 12, d: "" }, c: "" });

            expect(omit(obj, true)).toEqual(undefined);
            expect(omit(obj, { value: true })).toEqual({ c: "" });
            expect(omit(obj, { value: { t: true } } as const)).toEqual({ value: { d: "" }, c: "" });
            expect(omit(obj, { value: undefined, t: true })).toEqual({ value: { t: 12, d: "" }, c: "" });
            expect(omit(obj, { value: true, t: undefined })).toEqual({ c: "" });

        });

        it("should omit flat with arrays", () => {
            const obj = { value: [{ t: 12, d: "" }, { t: 12, d: "" }], c: [""] };

            expect(omit(obj, {})).toEqual(obj);
            const test1: Expect<Equal<OmitDeepResult<typeof obj, {}>, typeof obj>> = true
            expect(omit(obj, { value: false })).toEqual(obj);
            const test2: Expect<Equal<OmitDeepResult<typeof obj, { value: false }>, typeof obj>> = true

            expect(omit(obj, { value: false, t: false })).toEqual(obj);
            const test3: Expect<Equal<OmitDeepResult<typeof obj, { value: false, t: false }>, typeof obj>> = true
            expect(omit(obj, { value: undefined })).toEqual(obj);
            const test4: Expect<Equal<OmitDeepResult<typeof obj, { value: undefined }>, typeof obj>> = true
            expect(omit(obj, { value: undefined, t: false })).toEqual(obj);
            const test5: Expect<Equal<OmitDeepResult<typeof obj, { value: undefined, t: false }>, typeof obj>> = true
            expect(omit(obj, { value: false, t: undefined })).toEqual(obj);
            const test6: Expect<Equal<OmitDeepResult<typeof obj, { value: false, t: undefined }>, typeof obj>> = true
            expect(omit(obj, { value: undefined, t: undefined })).toEqual(obj);
            const test7: Expect<Equal<OmitDeepResult<typeof obj, { value: undefined, t: undefined }>, typeof obj>> = true

            expect(omit(obj, true)).toEqual(undefined);
            expect(omit(obj, { value: true })).toEqual({ c: [""] });
            const test8: Expect<Equal<OmitDeepResult<typeof obj, { value: true }>, { c: string[] }>> = true
            expect(omit(obj, { value: undefined, t: true })).toEqual({ value: [{ t: 12, d: "" }, { t: 12, d: "" }], c: [""] });
            const test9: Expect<Equal<OmitDeepResult<typeof obj, { value: undefined, t: true }>, typeof obj>> = true
            expect(omit(obj, { value: true, t: undefined })).toEqual({ c: [""] });
            const test10: Expect<Equal<OmitDeepResult<typeof obj, { value: true, t: undefined }>, { c: string[] }>> = true
        });
    }); 
})