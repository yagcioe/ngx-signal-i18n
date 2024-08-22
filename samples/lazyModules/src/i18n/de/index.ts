import { computed, Signal } from '@angular/core';
import { TranslationShape } from '../i18n-config';

const de: TranslationShape = {
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
};

export default de;