import { computed, Signal } from '@angular/core';
import { Translation } from '../i18n-config';

const de: Translation = {
  title: 'Titel',
  interpolatable: (params: { text: Signal<string> }) =>
    computed(() => `Das ist ein intepolierter Wert: ${params.text()}`),
  nest: {
    title: 'geschachtelter Titel',
    anotherInterpolatedValue: (params: { num: Signal<number> }) =>
      computed(() => `Das ist ein geschachtelter interpolierter Wert ${params.num()}`),
  },
  simpleNest: {
    str: 'F',
  }
};

export default de;