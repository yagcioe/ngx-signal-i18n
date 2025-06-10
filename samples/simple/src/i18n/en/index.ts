import { Signal } from '@angular/core';
import { TranslationShape } from 'ngx-signal-i18n';

const en = {
  title: 'title',
  interpolatable: (text: Signal<string>) => `this is a interpolated value: ${text()}`,
  nest: {
    title: 'nested title',
    anotherInterpolatedValue: (num: Signal<number>) => `this is a nested value ${num()}`,
    constantInterpolatedValue: (num: Signal<number>, consantVar: string) => `this is a nested value ${num()} with a non reactive var ${consantVar}`,
  },
  simpleNest: {
    str: 'F',
  }
} satisfies TranslationShape;

export default en;