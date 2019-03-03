import {HTMLCustomElement, createCustomEvent} from 'html-custom-element';
import {time} from '../utils/time';
import * as css from './calendar.css';

function __getWeekdays(firstDayOfWeek = 0) {
  const ret = [];
  for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) ret.push(i % 7);
  return ret;
}

function __getLeadingDays(curDate, staDay = 0) {
  const ret = [];
  const year = curDate.getFullYear(); const month = curDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = (firstWeekday + 7) - (staDay +7) - 1; // 2 days become 1 for [1, 0]
  for (let i = days * -1; i <= 0; i++) {
    ret.push(new Date(year, month, i).getDate());
  }
  return ret;
}

function __getMonthDays(curDate) {
  const ret = [];
  const year = curDate.getFullYear(); const month = curDate.getMonth();
  const lastDay = new Date(year, month+1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) ret.push(i);
  return ret;
}

function __getTrailingDays(leadingDays, monthDays) {
  const ret = [];
  const days = 42 - (leadingDays.length + monthDays.length);
  for (let i = 1; i <= days; i++) ret.push(i);
  return ret;
}

function __addDate(parent, date, klass) {
  const el = document.createElement('button');
  const elDate = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), date);
  el.innerHTML = date;
  el.className = klass;
  if (elDate > this.maxDate || elDate < this.minDate) {
    el.disabled = true;
  }
  parent.appendChild(el);
}

function __getI18n(lang, key, indexes) { // type:week, wk, month, mon
  indexes = indexes instanceof Array ? indexes : [indexes];
  const t = time();
  const ret = indexes.map( (ndx) => t.i18n[lang][key][ndx] );
  return ret.length === 1 ? ret[0] : ret;
}

function __getMonthEls(lang, monthNum) {
  const t = time();
  const months = t.i18n[lang].monthNames;
  return months.map( (month, ndx) => {
    const optEl = document.createElement('option');
    optEl.value = ndx;
    optEl.innerHTML = month;
    (monthNum === ndx) && (optEl.selected = true);
    return optEl;
  });
}

function __getYearEls(lang, year, minYear, maxYear) {
  minYear = Math.max(minYear, year - 10);
  maxYear = Math.min(maxYear, year + 10);
  const years = [];
  for (let i = minYear; i<= maxYear; i++) {
    const optEl = document.createElement('option');
    optEl.value = i;
    optEl.innerHTML = i;
    (year === i ) && (optEl.selected = true);
    years.push(optEl);
  }
  return years;
}

const html = `
  <div class="calendar">
    <div class="title">
      <div class="month-year">
        <select class="month" (change)="setMonth(event)"></select>
        <select class="year" (change)="setYear(event)"></select>
      </div>
      <button class="prev" (click)="setMonth(-1)">&lt;</button>
      <button class="next" (click)="setMonth(1)">&gt;</button>
    </div>
    <div class="days"></div>
    <div class="dates" (click)="fireDateSelected(event)"></div>
  </div>
  <div class="blocker"></div>
`;

export class HCECalendar extends HTMLCustomElement {
  // curDate, minDate, maxDate
  // language, firstDayOfWeek
  // weekdayFormat e.g. 2-letter, full, default 3-letter
  connectedCallback() {
    this.renderWith(html, css).then( (_) => {
      this.curDate = this.selected ? new Date(this.selected) : new Date();
      this.minDate = this.minDate ? new Date(this.minDate) : new Date(null);
      this.maxDate = new Date(this.maxDate || '2099-12-31');
      this.firstDayOfWeek = this.firstDayOfWeek || 0;
      this.weekdayFormat = this.weekdayFormat || '2-letter'; // 2-letter, 3-letter, or full
      this.language = this.language || 'en';

      this.setBehaviourOfVisibleBy();
      this.setWeekdays();
      this.setCalendar();
    });
  }

  setBehaviourOfVisibleBy() {
    const inputEl = document.querySelector(this.visibleBy);
    if (inputEl) {
      inputEl.parentElement.style.position = 'relative';
      this.classList.add('overlay');
      this.querySelector('.calendar').classList.add('shadow');
      this.style.position = 'absolute';
      this.style.display = 'none';

      this.addEventListener('click', (event) => {
        this.isEqualNode(event.target) && (this.disappear());
      });
      inputEl.addEventListener('focus', (_) => this.appear());
      this.addEventListener('date-selected', (e) => {
        inputEl.value = e.detail;
        this.disappear();
      });
    }
  }

  setWeekdays() {
    const weekdays = __getWeekdays(this.firstDayOfWeek);
    const format = this.weekdayFormat === 'full' ? 'dayNames': 'dayNamesShort';
    __getI18n(this.language, format, weekdays).forEach((str) => {
      str = this.weekdayFormat === '2-letter' ? str.substr(0, 2) : str;
      const spanEl = document.createElement('span');
      spanEl.innerHTML = str;
      spanEl.className = 'wk';
      this.querySelector('.days').appendChild(spanEl);
    });
  }

  setYear(year) {
    if (year instanceof Event) {
      year = year.target.value;
    }
    this.curDate.setYear(year);
    this.setCalendar();
  }

  setMonth(mon) {
    if (mon instanceof Event) {
      this.curDate.setMonth( parseInt(mon.target.value) );
    } else {
      this.curDate.setMonth( this.curDate.getMonth() + mon );
    }
    this.setCalendar();
  }

  setCalendar() {
    const leadingDays = __getLeadingDays(this.curDate, this.firstDayOfWeek);
    const monthDays = __getMonthDays(this.curDate);
    const trailingDays = __getTrailingDays(leadingDays, monthDays);

    const monthEls = __getMonthEls(this.language, this.curDate.getMonth());
    const yearEls = __getYearEls(this.language, this.curDate.getFullYear(),
        this.minDate.getFullYear(),
        this.maxDate && this.maxDate.getFullYear()
    );

    this.querySelector('.title .month').innerHTML = '';
    this.querySelector('.title .year').innerHTML = '';
    monthEls.forEach((el) => this.querySelector('.title .month').appendChild(el));
    yearEls.forEach((el) => this.querySelector('.title .year').appendChild(el));

    const prevMonLastDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 0);
    const nextMon1stDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth()+1, 1);
    this.querySelector('.title .prev').disabled = prevMonLastDay < this.minDate;
    this.querySelector('.title .next').disabled = nextMon1stDay > this.maxDate;

    const datesEl = this.querySelector('.dates');
    datesEl.innerHTML = '';
    leadingDays.forEach((num) => __addDate.bind(this)(datesEl, num, 'leading'));
    monthDays.forEach((num) => __addDate.bind(this)(datesEl, num, 'day'));
    trailingDays.forEach((num) => __addDate.bind(this)(datesEl, num, 'trailing'));
    Array.from(this.querySelector('.dates').children).forEach( (el, ndx) => {
      (ndx % 7 === 0 && ndx !== 0) && datesEl.insertBefore(document.createElement('br'), el);
    });
  }

  fireDateSelected(event) {
    const map = {leading: -1, day: 0, trailing: 1};
    const month = this.curDate.getMonth() + map[event.target.className];
    const day = parseInt(event.target.innerHTML, 0);
    const selectedDate = new Date(this.curDate.getFullYear(), month, day);
    const formatted = time(selectedDate).format(this.format || 'long');
    const custEvent = createCustomEvent('date-selected', {detail: formatted});
    this.dispatchEvent(custEvent);
  }
}

HCECalendar.define('hce-calendar', HCECalendar);
