class InternationalFixedCalendarDate {
  y;
  m;
  d;

  static Months = ["January", "February", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November", "December"];
  static Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  static cal = [28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29];
  static leapCal = [28, 28, 28, 28, 28, 29, 28, 28, 28, 28, 28, 28, 29];

  static leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  static getDayOfYear(date: Date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  static getMonth(leap, n) {
    const cal = leap ? InternationalFixedCalendarDate.leapCal : InternationalFixedCalendarDate.cal;
    let i;
    for (i = 0; i < 13; i++) {
      if (n > cal[i]) {
        n = n - cal[i];
      } else {
        break;
      }
    }
    return {m: i, d: n};
  }

  constructor(inDate: Date) {
    this.y = inDate.getFullYear();
    const n = InternationalFixedCalendarDate.getDayOfYear(inDate);
    const leap = InternationalFixedCalendarDate.leapYear(this.y);
    const r = InternationalFixedCalendarDate.getMonth(leap, n);
    this.m = r.m;
    this.d = r.d;
  }

  dddd() {
    const JUNE = 5;
    const DECEMBER = 13;
    const LEAP_DAY = 'Leap Day';
    const YEAR_DAY = 'Year Day';
    if(this.m == JUNE && this.d == 29) {
      return LEAP_DAY;
    }
    if(this.m == DECEMBER && this.d == 29) {
      return YEAR_DAY;
    }
    const n = (this.d - 1) % 7;
    return InternationalFixedCalendarDate.Days[n];
  }

  MMMM() {
    return InternationalFixedCalendarDate.Months[this.m];
  }

  // moment().format("dddd, D MMMM YYYY")
  // Sunday, 1 January 2018
  toDateString() {
    const dddd = this.dddd();
    const MMMM = this.MMMM();
    return `${dddd}, ${this.d} ${MMMM} ${this.y}`;
  }
}

class InternationalFixedCalendar {
  static Date = InternationalFixedCalendarDate;
}

export { InternationalFixedCalendar }
