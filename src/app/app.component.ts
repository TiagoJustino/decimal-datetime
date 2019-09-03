import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from "moment-timezone/moment-timezone";
import * as _ from 'lodash';

import { tzones } from "../utils/tzones";
import { InternationalFixedCalendar } from "../utils/InternationalFixedCalendar";
import { DecimalTime } from "../utils/DecimalTime";
import { NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dp', {static: true})
  dp: NgbDatepicker;

  y;
  M;
  d;
  h;
  m;
  s;
  date;
  time;
  datetime;
  model;
  timeModel;
  ifc = [];
  dec = [];
  times = [];
  zone = ["", "UTC"];

  constructor() {
    moment.tz.load(require('moment-timezone/data/packed/latest.json'));
  }

  ngOnInit(): void {
    this.model = {year: 1987, month: 6, day: 16};
    this.timeModel = {hour: 8, minute: 0, second: 0};
    this.dp.navigateTo(this.model);
    this.updateScreen();
  }

  updateVars() {
    this.d = this.model.day;
    this.M = this.model.month;
    this.y = this.model.year;
    this.h = this.timeModel.hour;
    this.m = this.timeModel.minute;
    this.s = this.timeModel.second;
    this.date = `${this.y}-${_.padStart(this.M, 2, '0')}-${_.padStart(this.d, 2, '0')}`;
    this.time = `${_.padStart(this.h, 2, '0')}:${_.padStart(this.m, 2, '0')}:${_.padStart(this.s, 2, '0')}`;
    this.datetime = `${this.date}T${this.time}`;
    console.log(`date = ${this.date}`);
    console.log(`time = ${this.time}`);
  }

  updateTimeZones() {
    if (!this.zone[0]) {
      this.zone[0] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    if (!this.zone[1]) {
      this.zone[1] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  }

  updateTime() {
    this.times[0] = this.getTime(this.zone[0], this.datetime);
    this.times[1] = this.getTime(this.zone[0], this.datetime, this.zone[1]);
    this.times[2] = this.getTime(this.zone[0]);
    this.times[3] = this.getTime(this.zone[0], null, this.zone[1]);
  }

  updateIfc() {
    this.ifc[0] = this.toIfc(this.times[0]);
    this.ifc[1] = this.toIfc(this.times[1]);
    this.ifc[2] = this.toIfc(this.times[2]);
    this.ifc[3] = this.toIfc(this.times[3]);
  }

  updateDec() {
    this.dec[0] = this.toDecTime(this.times[0]);
    this.dec[1] = this.toDecTime(this.times[1]);
    this.dec[2] = this.toDecTime(this.times[2]);
    this.dec[3] = this.toDecTime(this.times[3]);
  }

  updateOutput() {
    this.updateTime();
    this.updateIfc();
    this.updateDec();
  }

  updateScreen() {
    this.updateVars();
    this.updateTimeZones();
    this.updateOutput();
  }

  gety() {
    return this.y;
  }

  getM() {
    return _.padStart(this.M, 2, '0');
  }

  getd() {
    return _.padStart(this.d, 2, '0');
  }

  geth() {
    return _.padStart(this.h, 2, '0');
  }

  getm() {
    return _.padStart(this.m, 2, '0');
  }

  gets() {
    return _.padStart(this.s, 2, '0');
  }

  toDecTime(str) {
    const m = moment(str);
    const d = m.toDate();
    const dt = new DecimalTime(d);
    return dt.toString();
  }

  toIfc(str) {
    const m = moment(str);
    const d = m.toDate();
    const ifcDate = new InternationalFixedCalendar.Date(d);
    return ifcDate.toDateString();
  }

  getTime(zone, datetime?, toZone?) {
    let m;
    if (zone == tzones[1]) {
      if (datetime) {
        m = moment.utc(datetime);
      } else {
        m = moment.utc();
      }
    } else {
      if (datetime) {
        m = moment.tz(datetime, zone);
      } else {
        m = moment.tz(zone);
      }
    }
    if (toZone) {
      m = m.tz(toZone);
    }
    return m.format("dddd, MMMM D YYYY, HH:mm:ss");
  }

  onDateSelect($event) {
    this.updateScreen();
  }

  onTimeChange($event) {
    this.updateScreen();
  }
}
