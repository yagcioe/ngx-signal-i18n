import { Pipe, PipeTransform } from '@angular/core';
import { interpolate } from './interpolater';

@Pipe({
  name: 'interpolate',
  standalone: true,
  pure: true
})
export class InterpolatePipe implements PipeTransform {
  transform = interpolate
}
