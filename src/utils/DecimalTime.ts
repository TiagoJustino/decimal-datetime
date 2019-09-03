import * as _ from 'lodash';

class DecimalTime {
  h;
  m;
  s;

  constructor(date: Date) {
    const secs = date.getSeconds() + (60 * date.getMinutes()) + (60 * 60 * date.getHours());
    const n = secs + (date.getMilliseconds() / 1000);
    let x = (n * 100000) / 86400;
    this.s = Math.floor(x % 100);
    x = x / 100;
    this.m = Math.floor(x % 100);
    this.h = Math.floor(x / 100);
  }

  // HH:mm:ss
  toString() {
    const HH = this.h;
    const mm = _.padStart(this.m, 2, '0');
    const ss = _.padStart(this.s, 2, '0');
    return `${HH}:${mm}:${ss}`;
  }
}

export { DecimalTime };
