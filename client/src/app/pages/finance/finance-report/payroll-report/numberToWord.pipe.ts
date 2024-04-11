import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWord'
})
export class NumberToWordPipe implements PipeTransform {
  transform(value: number): string {
    const words = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
      'eighteen', 'nineteen'
    ];

    const tens = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];

    if (value < 20) {
      return words[value];
    }

    if (value < 100) {
      const tensDigit = Math.floor(value / 10);
      const unitsDigit = value % 10;
      return tens[tensDigit] + (unitsDigit ? '-' + words[unitsDigit] : '');
    }

    if (value < 1000) {
      const hundredsDigit = Math.floor(value / 100);
      const remainingValue = value % 100;
      return words[hundredsDigit] + ' hundred' + (remainingValue ? ' ' + this.transform(remainingValue) : '');
    }

    return 'Number out of range';
  }
}