const i18n = {
  en: {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fr: {
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc']
  }
};

const masks = {
  default:     `ddd mmm dS yyyy HH:MM:ss TT`,
  short:       `m/d/yy`,
  shortTime:   `h:MM TT`,
  medium:      `mmm d, yyyy`,
  mediumTime:  `h:MM:ss TT`,
  long:        `mmmm d, yyyy`,
  longTime:    `h:MM:ss TT Z`,
  full:        `dddd, mmmm d, yyyy`,
  isoDate:     `yyyy-mm-dd`,
  isoTime:     `HH:MM:ss`,
  isoDateTime: `yyyy-mm-dd'T'HH:MM:ss`
};
const pad = function(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) val = '0' + val;
  return val;
};

export function time(argDate) {
  const help = `
    Available formats
    ---------------------------------------------------
    yy:   last two number of year. 17
    yyyy: full year. 2017,
    m:    month in number. 1, 12
    mm:   month in number with 0 padded. 01, 12
    mmm:  3 letter month. Jan, Dec
    mmmm: Month in language. January, December
    d:    day in number. 1, 31
    dd:   day in number with 0 padded.  01, 31
    ddd:  week day in 3 letters. Mon, Sun
    dddd: week day in word.  Monday, Sunday
    h:    hour in 12 hours format. 1, 12
    hh:   hour in 12 hours format with 0 padded. 01, 12
    H:    hour in 24 hours format. 13, 23
    HH:   hour in 24 hours format with 0 padded. 01, 24
    s:    seconds in number. 1, 60 
    ss:   seconds in number with 0 padded. 01, 60
    t:    am as 'a', pm as 'p'
    tt:   am or pm
    T:    am as 'A', pm as 'P'
    TT:   AM or PM
    Z:    Timezone. UTC, Pacific,
    o:    Timezone offset. +5,
    S:    Ordinary of date, e.g. 1st, 2nd, 3rd, 4th`;

  const date = 
    typeof argDate === 'string' ? new Date(argDate) : 
    argDate && argDate.getMonth ? argDate : new Date();
  if (isNaN(date.getMonth())) throw  `Invalid date ${argDate}`

  return {
    language: 'en',
    i18n: i18n,
    utc: false,
    help: help,

    format: function(argMask) {
      let mask = masks[argMask] || argMask || masks.default;
      if (argMask && argMask.slice(0, 4) == 'UTC:') { // Allow setting the utc argument via the mask
        mask = mask.slice(4);
        this.utc = true;
      }
      const timezoneRE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      const timezoneClipRE = /[^-+\dA-Z]/g;
      const get = this.utc ? 'getUTC' : 'get'; 
      const d = date[get + 'Date'](),
            D = date[get + 'Day'](),
            m = date[get + 'Month'](),
            y = date[get + 'FullYear'](),
            H = date[get + 'Hours'](),
            M = date[get + 'Minutes'](),
            s = date[get + 'Seconds'](),
            L = date[get + 'Milliseconds'](),
            o = this.utc ? 0 : date.getTimezoneOffset();
      const i18n = this.i18n[this.language];

      const flags = {
        d:    d,
        dd:   pad(d),
        ddd:  i18n.dayNamesShort[D],
        dddd: i18n.dayNames[D],
        m:    m + 1,
        mm:   pad(m + 1),
        mmm:  i18n.monthNamesShort[m],
        mmmm: i18n.monthNames[m],
        yy:   String(y).slice(2),
        yyyy: y,
        h:    H % 12 || 12,
        hh:   pad(H % 12 || 12),
        H:    H,
        HH:   pad(H),
        M:    M,
        MM:   pad(M),
        s:    s,
        ss:   pad(s),
        l:    pad(L, 3),
        L:    pad(L > 99 ? Math.round(L / 10) : L),
        t:    H < 12 ? 'a'  : 'p',
        tt:   H < 12 ? 'am' : 'pm',
        T:    H < 12 ? 'A'  : 'P',
        TT:   H < 12 ? 'AM' : 'PM',
        Z:    this.utc ? 'UTC' : (String(date).match(timezoneRE) || ['']).pop().replace(timezoneClipRE, ''),
        o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };

      return mask.replace(
        /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        $0 => ($0 in flags) ? flags[$0] : $0.slice(1, $0.length - 1)
      );
    }
  }
}

