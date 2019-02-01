import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import {time} from '../utils/time';

function __getWeekdays(firstDayOfWeek = 0) {
  const ret = [];
  for(var i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) ret.push(i % 7);
  return ret;
}

function __getLeadingDays(curDate, staDay = 0) {
  const ret = [];
  const year = curDate.getFullYear(), month = curDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = (firstWeekday + 7) - (staDay +7) - 1; // 2 days become 1 for [1, 0]
  for(var i = days * -1; i <= 0; i++) {
    ret.push(new Date(year, month, i).getDate());
  }
  return ret;
}

function __getMonthDays(curDate) {
  const ret = [];
  const year = curDate.getFullYear(), month = curDate.getMonth();
  const lastDay = new Date(year, month+1, 0).getDate();
  for(var i = 1; i <= lastDay; i++) ret.push(i);
  return ret;
}

function __getTrailingDays(leadingDays, monthDays) {
  const ret = [];
  const days = 42 - (leadingDays.length + monthDays.length);
  for(var i = 1; i <= days; i++) ret.push(i);
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

function __getI18n(lang, key, indexes) { //type:week, wk, month, mon
  indexes = indexes instanceof Array ? indexes : [indexes];
  const t = time();
  const ret = indexes.map( ndx => t.i18n[lang][key][ndx] );
  return ret.length === 1 ? ret[0] : ret;
}

function __getMonthEls(lang, monthNum) {
  const t = time();
  const months = t.i18n[lang].monthNamesShort;
  return months.map( (month, ndx) => {
    const optEl = document.createElement('option');
    optEl.value = ndx;
    optEl.innerHTML = month;
    (monthNum === ndx) && (optEl.selected = true);
    return optEl;
  })
}

function __getYearEls(lang, year, minYear, maxYear) {
  minYear = Math.max(minYear, year - 10); 
  maxYear = Math.min(maxYear, year + 10);
  const years = [];
  for (var i = minYear; i<= maxYear; i++) {
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
      <button class="prev" (click)="setMonth(-1)">&lt;</button>
      <div>
        <select class="month" (change)="setMonth(event)"></select>
        <select class="year" (change)="setYear(event)"></select>
      </div>
      <button class="next" (click)="setMonth(1)">&gt;</button>
    </div>
    <div class="days"></div>
    <div class="dates" (click)="fireDateSelected(event)"></div>
  </div>
  <div class="blocker"></div>
`;

const css =`
  .blocker {            /* Needed to check click outside of overlay */
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.3;
    display: none; /* only shows when it is overlay */
    z-index: 0;
  }
  .calendar {           /* overlay contents on thetop of blocker */
    position: relative;
    background: #fff;
    z-index: 1;
  }

  .title {              /* e.g. '< Mar 2019 >' */
    display: flex;
    justify-content: space-between;
    position: relative;
    background: #fff;
  }
  .title select {        /* Jan, Feb .. */ /* 2017, 2018, ... */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    border: none;
  }
  .days > span {          /* Mon, Tue, Wed ... */
    display: inline-block;
    text-align: center;
    width: calc(100% / 7);
  }
  .dates button {          /* 1, 2, ... 31 */
    padding: 0;
    width: calc(100% / 7);
  }
  .dates button.leading { 
    color: #eee; border: none;
  }
  .dates button.trailing {
    color: #eee; border: none;
  }
`;

export class HCECalendar extends HTMLCustomElement {
  // curDate, minDate, maxDate
  // language, firstDayOfWeek
  // weekdayFormat e.g. 2-letter, full, default 3-letter
  connectedCallback() {
    this.renderWith(html, css).then( _ => {
      this.curDate = this.selected ? new Date(this.selected) : new Date();
      this.minDate = this.minDate ? new Date(this.minDate) : new Date(null);
      this.maxDate = new Date(this.maxDate || '2099-12-31');
      this.firstDayOfWeek = this.firstDayOfWeek || 0;
      this.weekdayFormat = this.weekdayFormat || '2-letter'; // 2-letter, 3-letter, or full
      this.language = this.language || 'en';

      this.setBehaviourOfVisibleBy();
      this.setWeekdays();
      this.setCalendar();
    })
  }

  setBehaviourOfVisibleBy() {
    const inputEl = document.querySelector(this.visibleBy);
    let calendarClicked = false;
    if (inputEl) {
      inputEl.parentElement.style.position = 'relative';
      this.querySelector('.blocker').style.display = 'block';
      this.style.position = 'absolute';
      this.style.display = 'none';

      this.querySelector('.blocker').addEventListener('click', _ => {
        this.style.display = 'none';
      })
      this.querySelector('.prev').addEventListener('focus', _ => calendarClicked = true);
      inputEl.addEventListener('focus', _ => this.style.display = 'block')
      this.addEventListener('click', _ => calendarClicked = true);
      this.addEventListener('date-selected', e => {
        inputEl.value = e.detail;
        this.style.display = 'none';
      })
      inputEl.addEventListener('blur', _ => {
        setTimeout(_ => {
          !calendarClicked && (this.style.display = 'none');
          calendarClicked = false;
        }, 500);
      })
    }
  }

  setWeekdays() {
    const weekdays = __getWeekdays(this.firstDayOfWeek);
    const format = this.weekdayFormat === 'full' ? 'dayNames': 'dayNamesShort';
    __getI18n(this.language, format, weekdays).forEach(str => {
      str = this.weekdayFormat === '2-letter' ? str.substr(0,2) : str;
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
    monthEls.forEach(el => this.querySelector('.title .month').appendChild(el));
    yearEls.forEach(el => this.querySelector('.title .year').appendChild(el));

    const prevMonLastDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth(), 0);
    const nextMon1stDay = new Date(this.curDate.getFullYear(), this.curDate.getMonth()+1, 1);
    this.querySelector('.title .prev').disabled = prevMonLastDay < this.minDate;
    this.querySelector('.title .next').disabled = nextMon1stDay > this.maxDate;

    const datesEl = this.querySelector('.dates');
    datesEl.innerHTML = '';
    leadingDays.forEach(num => __addDate.bind(this)(datesEl, num, 'leading'));
    monthDays.forEach(num => __addDate.bind(this)(datesEl, num, 'day'));
    trailingDays.forEach(num => __addDate.bind(this)(datesEl, num, 'trailing'));
    Array.from(this.querySelector('.dates').children).forEach( (el, ndx) => {
      (ndx % 7 === 0 && ndx !== 0)  && datesEl.insertBefore(document.createElement('br'), el);
    })
  }

  fireDateSelected(event) {
    const map = {leading: -1, day: 0 , trailing: 1};
    const month = this.curDate.getMonth() + map[event.target.className];
    const day = parseInt(event.target.innerHTML, 0);
    const selectedDate = new Date(this.curDate.getFullYear(), month, day);
    const formatted = time(selectedDate).format(this.format || 'long');
    const custEvent = createCustomEvent('date-selected', {detail: formatted});
    this.dispatchEvent(custEvent);
  }
}

HCECalendar.define('hce-calendar', HCECalendar);