import { HTMLCustomElement, createCustomEvent } from 'html-custom-element';
import {time} from '../utils/time';

function __getWeekdays(firstDayOfWeek = 0) {
  const ret = [];
  for(var i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) ret.push(i % 7);
  return ret;
}

function __getLeadingDays(year, month, staDay = 0) {
  const ret = [];
  const firstWeekday = new Date(year, month, 1).getDay();
  const days = (firstWeekday + 7) - (staDay +7) - 1; // 2 days become 1 for [1, 0]
  for(var i = days * -1; i <= 0; i++) {
    ret.push(new Date(year, month, i).getDate());
  }
  return ret;
}

function __getMonthDays(year, month) {
  const ret = [];
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

function __appendEl(parent, tagName, html, klass) {
  const el = document.createElement(tagName);
  el.innerHTML = html;
  el.className = klass;
  parent.appendChild(el);
}

const html = `
  <div class="title">
    <button class="prev">&lt;</button>
    <span class="month"></span>
    <span class="year"></span>
    <button class="next">&gt;</button>
  </div>
  <div class="days"></div>
  <div class="dates"></div>
`;

const css =`
`;

export class HCECalendar extends HTMLCustomElement {
  // year, month, language, firstDayOfWeek
  // leadingDays, monthDays, trailingDays
  connectedCallback() {
    this.year = this.year || new Date().getFullYear();
    this.month = this.month | new Date().getMonth();
    this.firstDayOfWeek = this.firstDayOfWeek || 0;
    this.language = this.language || 'en';

    this.weekdays = __getWeekdays(this.firstDayOfWeek);
    this.leadingDays = __getLeadingDays(this.year, this.month, this.firstDayOfWeek);
    this.monthDays = __getMonthDays(this.year, this.month);
    this.trailingDays = __getTrailingDays(this.leadingDays, this.monthDays);
    this.renderWith(html, css).then( _ => {
      this.getI18n('wk').forEach(str => {
        __appendEl(this.querySelector('.days'), 'span', str, 'wk')
      });
      this.setCalendar();
    })
  }

  setMonth() { }

  setYear() { }

  setCalendar() { 
    this.querySelector('.title .month').innerHTML = this.getI18n('mon', this.month);
    this.querySelector('.title .year').innerHTML = this.year;
    this.leadingDays.forEach(num => {
      __appendEl(this.querySelector('.dates'), 'span', num, 'leading')
    });
    this.monthDays.forEach(num => {
      __appendEl(this.querySelector('.dates'), 'button', num, 'day')
    });
    this.trailingDays.forEach(num => {
      __appendEl(this.querySelector('.dates'), 'span', num, 'trailing')
    });
    Array.from(this.querySelector('.dates').children).forEach( (el, ndx) => {
      if (ndx % 7 === 0) {
        this.querySelector('.dates').insertBefore(document.createElement('br'), el);
      }
    })
  }

  getI18n(type, month) { //type:week, wk, month, mon
    const t = time(), lang = this.language;
    if (type === 'week') {
      return this.weekdays.map(el => t.i18n[lang].dayNames[el]);
    } else if (type === 'wk') {
      return this.weekdays.map(el => t.i18n[lang].dayNamesShort[el]);
    } else if (type === 'month') {
      return t.i18n[lang].monthNames[month];
    } else if (type === 'mon') {
      return t.i18n[lang].monthNamesShort[month];
    }
  }
}

HCECalendar.define('hce-calendar', HCECalendar);