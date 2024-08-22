import { computed, Signal } from '@angular/core';
import { TranslationShapeBase } from 'ngx-signal-i18n';

const en = {
  title: 'title',
  interpolateable: (params: { value: Signal<string> }) =>
    computed(() => `this is a interpolated value: ${params.value()}`),
  nest: {
    title: 'nested title',
    anotherInterpolatedValue: (params: { num: Signal<number> }) =>
      computed(() => `this is a nested value ${params.num()}`),
  },
  simpleNest: {
    str: 'F',
  },
} satisfies TranslationShapeBase;

export default en;