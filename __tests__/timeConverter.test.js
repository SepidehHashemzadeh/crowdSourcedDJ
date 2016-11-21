var module = require('../timeConverter.js');
var formatDateTime = module.formatDateTime;

test('formatDateTime() captures month correctly', () => {
    var month = '03';
    expect(formatDateTime('.....' + month)).toBe('March , .... at : AM');

    month = '07';
    expect(formatDateTime('.....' + month)).toBe('July , .... at : AM');

    month = '12';
    expect(formatDateTime('.....' + month)).toBe('December , .... at : AM');
});

test('formatDateTime() captures hour correctly', () => {
    var hour = '03';
    expect(formatDateTime('...........' + hour)).toBe('.. .., .... at 3: AM');

    hour = '07';
    expect(formatDateTime('...........' + hour)).toBe('.. .., .... at 7: AM');

    hour = '12';
    expect(formatDateTime('...........' + hour)).toBe('.. .., .... at 12: AM');
});

test('formatDateTime() converts from military time correctly', () => {
    var hour = '14';
    expect(formatDateTime('...........' + hour)).toBe('.. .., .... at 2: PM');

    hour = '17';
    expect(formatDateTime('...........' + hour)).toBe('.. .., .... at 5: PM');

    hour = '20';
    expect(formatDateTime('...........' + hour)).toBe('.. .., .... at 8: PM');
});

test('formatDateTime() converts entire timestamp correctly', () => {
    var year = '2016 ';
    var month = '11 ';
    var date = '20 ';

    var hour = '23 ';
    var minute = '20 ';

    var timestamp = year + month + date + hour + minute;

    expect(formatDateTime(timestamp)).toBe('November 20, 2016 at 11:20 PM');

    year = '9999 ';
    month = '01 ';
    date = '13 ';

    hour = '07 ';
    minute = '50 ';

    timestamp = year + month + date + hour + minute;

    expect(formatDateTime(timestamp)).toBe('January 13, 9999 at 7:50 AM');
});
