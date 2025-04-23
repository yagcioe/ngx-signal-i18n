import { computed, Signal } from '@angular/core';
import { Translation } from '../i18n-config';

const de: Translation = {
  title: 'Titel',
  interpolatable: (opt: { text: Signal<string> }) =>
    computed(() => `Das ist ein intepolierter Wert: ${opt.text()}`),
  nest: {
    title: 'geschachtelter Titel',
    anotherInterpolatedValue: (opt: { num: Signal<number> }) =>
      computed(() => `Das ist ein geschachtelter interpolierter Wert ${opt.num()}`),
  },
  simpleNest: {
    str: 'F',
  },
};

export default de;