import {time} from './time';

describe('time formatter', () => {
  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor(...args) {
        if (args.length) return new RealDate(...args);
        return new RealDate(isoDate);
      }
    };
  }

  afterEach(() => {
    global.Date = RealDate;
  });

  test('can format from the default value', () => {
    mockDate('2019-01-01 1:30:59 EST');
    const t = time();
    expect(t.format('default')).toBe('Tue Jan 1st 2019 01:30:59 AM');
    expect(t.format('short')).toBe('1/1/19');
    expect(t.format('medium')).toBe('Jan 1, 2019');
    expect(t.format('long')).toBe('January 1, 2019');
    expect(t.format('full')).toBe('Tuesday, January 1, 2019');
    expect(t.format('shortTime')).toBe('1:30 AM');
    expect(t.format('mediumTime')).toBe('1:30:59 AM');
    expect(t.format('longTime')).toBe('1:30:59 AM EST');
    expect(t.format('isoDate')).toBe('2019-01-01');
    expect(t.format('isoTime')).toBe('01:30:59');
    expect(t.format('isoDateTime')).toBe('2019-01-01T01:30:59');
    expect(t.format('yyyy-mm-dd')).toBe('2019-01-01');
  });

  test('can format from the default value with UTC as true', () => {
    mockDate('2019-01-01 1:30:59');
    const t = time();
    t.utc = true;
    expect(t.format('default')).toBe('Tue Jan 1st 2019 06:30:59 AM');
    expect(t.format('short')).toBe('1/1/19');
    expect(t.format('medium')).toBe('Jan 1, 2019');
    expect(t.format('long')).toBe('January 1, 2019');
    expect(t.format('full')).toBe('Tuesday, January 1, 2019');
    expect(t.format('shortTime')).toBe('6:30 AM');
    expect(t.format('mediumTime')).toBe('6:30:59 AM');
    expect(t.format('longTime')).toBe('6:30:59 AM UTC');
    expect(t.format('isoDate')).toBe('2019-01-01');
    expect(t.format('isoTime')).toBe('06:30:59');
    expect(t.format('isoDateTime')).toBe('2019-01-01T06:30:59');
    expect(t.format('yyyy-mm-dd')).toBe('2019-01-01');
  });

  test('can format from the default value with french', () => {
    mockDate('2019-01-01 1:30:59');
    const t = time();
    t.language = 'fr';
    expect(t.format('default')).toBe('Mar Jan 1st 2019 01:30:59 AM');
    expect(t.format('short')).toBe('1/1/19');
    expect(t.format('medium')).toBe('Jan 1, 2019');
    expect(t.format('long')).toBe('Janvier 1, 2019');
    expect(t.format('full')).toBe('Mardi, Janvier 1, 2019');
  });

  test('can format from the from input string', () => {
    const t = time('2019-02-01 11:30:59 EST');
    expect(t.format('default')).toBe('Fri Feb 1st 2019 11:30:59 AM');
    expect(t.format('full')).toBe('Friday, February 1, 2019');
    expect(t.format('yyyy-mm-dd\'T\'HH:MM:ssZ')).toBe('2019-02-01T11:30:59EST');
  });

  test('can format from date object', () => {
    mockDate(new Date('2019-02-01 11:30:59 EST'));
    const t = time();
    expect(t.format('default')).toBe('Fri Feb 1st 2019 11:30:59 AM');
    expect(t.format('full')).toBe('Friday, February 1, 2019');
    expect(t.format('yyyy-mm-dd\'T\'HH:MM:ssZ')).toBe('2019-02-01T11:30:59EST');
  });
});

