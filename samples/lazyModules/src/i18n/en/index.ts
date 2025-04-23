import { computed, Signal } from '@angular/core';
import { TranslationShape } from 'ngx-signal-i18n';

const en = {
  title: 'title',
  interpolatable: (opt: { text: Signal<string> }) =>
    computed(() => `this is a interpolated value: ${opt.text()}`),
  nest: {
    title: 'nested title',
    anotherInterpolatedValue: (opt: { num: Signal<number> }) =>
      computed(() => `this is a nested value ${opt.num()}`),
  },
  simpleNest: {
    str: 'F',
  },
} satisfies TranslationShape;

export default en;