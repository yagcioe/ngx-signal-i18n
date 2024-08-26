import { computed, Signal } from '@angular/core';
import { TranslationShape} from 'ngx-signal-i18n';

const en = {
  title: 'title',
  interpolatable: (params: { text: Signal<string> }) =>
    computed(() => `this is a interpolated value: ${params.text()}`),
  nest: {
    title: 'nested title',
    anotherInterpolatedValue: (params: { num: Signal<number> }) =>
      computed(() => `this is a nested value ${params.num()}`),
  },
  simpleNest: {
    str: 'F',
  }
} satisfies TranslationShape;

export default en;