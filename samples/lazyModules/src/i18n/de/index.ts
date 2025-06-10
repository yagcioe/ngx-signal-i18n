import { Signal } from '@angular/core';
import { Translation } from '../i18n-config';

const de: Translation = {
  title: 'Titel',
  interpolatable: (text: Signal<string>) => `Das ist ein intepolierter Wert: ${text()}`,
  nest: {
    title: 'geschachtelter Titel',
    anotherInterpolatedValue: (num: Signal<number>) => `Das ist ein geschachtelter interpolierter Wert ${num()}`,
  },
  simpleNest: {
    str: 'F',
  },
};

export default de;