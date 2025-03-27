import { p as proxyCustomElement, H, d as createEvent, h } from './p-DJz_AlH8.js';
import { c as coerceBoolean, a as coerceNumber } from './p-DU2Y5oRj.js';
import { C as CatFormHint } from './p-C3lVj_zU.js';
import { c as catI18nRegistry } from './p-DYxciDq0.js';
import { d as defineCustomElement$3 } from './p-BAS0o037.js';
import { d as defineCustomElement$2 } from './p-tMJhdM6b.js';
import { d as defineCustomElement$1 } from './p-BWMxUNx3.js';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var NumeralFormatter = function (numeralDecimalMark,
                                 numeralIntegerScale,
                                 numeralDecimalScale,
                                 numeralThousandsGroupStyle,
                                 numeralPositiveOnly,
                                 stripLeadingZeroes,
                                 prefix,
                                 signBeforePrefix,
                                 tailPrefix,
                                 delimiter) {
    var owner = this;

    owner.numeralDecimalMark = numeralDecimalMark || '.';
    owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
    owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
    owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
    owner.numeralPositiveOnly = !!numeralPositiveOnly;
    owner.stripLeadingZeroes = stripLeadingZeroes !== false;
    owner.prefix = (prefix || prefix === '') ? prefix : '';
    owner.signBeforePrefix = !!signBeforePrefix;
    owner.tailPrefix = !!tailPrefix;
    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ',';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
};

NumeralFormatter.groupStyle = {
    thousand: 'thousand',
    lakh:     'lakh',
    wan:      'wan',
    none:     'none'    
};

NumeralFormatter.prototype = {
    getRawValue: function (value) {
        return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
    },

    format: function (value) {
        var owner = this, parts, partSign, partSignAndPrefix, partInteger, partDecimal = '';

        // strip alphabet letters
        value = value.replace(/[A-Za-z]/g, '')
            // replace the first decimal mark with reserved placeholder
            .replace(owner.numeralDecimalMark, 'M')

            // strip non numeric letters except minus and "M"
            // this is to ensure prefix has been stripped
            .replace(/[^\dM-]/g, '')

            // replace the leading minus with reserved placeholder
            .replace(/^\-/, 'N')

            // strip the other minus sign (if present)
            .replace(/\-/g, '')

            // replace the minus sign (if present)
            .replace('N', owner.numeralPositiveOnly ? '' : '-')

            // replace decimal mark
            .replace('M', owner.numeralDecimalMark);

        // strip any leading zeros
        if (owner.stripLeadingZeroes) {
            value = value.replace(/^(-)?0+(?=\d)/, '$1');
        }

        partSign = value.slice(0, 1) === '-' ? '-' : '';
        if (typeof owner.prefix != 'undefined') {
            if (owner.signBeforePrefix) {
                partSignAndPrefix = partSign + owner.prefix;
            } else {
                partSignAndPrefix = owner.prefix + partSign;
            }
        } else {
            partSignAndPrefix = partSign;
        }
        
        partInteger = value;

        if (value.indexOf(owner.numeralDecimalMark) >= 0) {
            parts = value.split(owner.numeralDecimalMark);
            partInteger = parts[0];
            partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
        }

        if(partSign === '-') {
            partInteger = partInteger.slice(1);
        }

        if (owner.numeralIntegerScale > 0) {
          partInteger = partInteger.slice(0, owner.numeralIntegerScale);
        }

        switch (owner.numeralThousandsGroupStyle) {
        case NumeralFormatter.groupStyle.lakh:
            partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);

            break;

        case NumeralFormatter.groupStyle.wan:
            partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);

            break;

        case NumeralFormatter.groupStyle.thousand:
            partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);

            break;
        }

        if (owner.tailPrefix) {
            return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '') + owner.prefix;
        }

        return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
    }
};

var NumeralFormatter_1 = NumeralFormatter;

var DateFormatter = function (datePattern, dateMin, dateMax) {
    var owner = this;

    owner.date = [];
    owner.blocks = [];
    owner.datePattern = datePattern;
    owner.dateMin = dateMin
      .split('-')
      .reverse()
      .map(function(x) {
        return parseInt(x, 10);
      });
    if (owner.dateMin.length === 2) owner.dateMin.unshift(0);

    owner.dateMax = dateMax
      .split('-')
      .reverse()
      .map(function(x) {
        return parseInt(x, 10);
      });
    if (owner.dateMax.length === 2) owner.dateMax.unshift(0);
    
    owner.initBlocks();
};

DateFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.datePattern.forEach(function (value) {
            if (value === 'Y') {
                owner.blocks.push(4);
            } else {
                owner.blocks.push(2);
            }
        });
    },

    getISOFormatDate: function () {
        var owner = this,
            date = owner.date;

        return date[2] ? (
            date[2] + '-' + owner.addLeadingZero(date[1]) + '-' + owner.addLeadingZero(date[0])
        ) : '';
    },

    getBlocks: function () {
        return this.blocks;
    },

    getValidatedDate: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.datePattern[index]) {
                case 'd':
                    if (sub === '00') {
                        sub = '01';
                    } else if (parseInt(sub0, 10) > 3) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > 31) {
                        sub = '31';
                    }

                    break;

                case 'm':
                    if (sub === '00') {
                        sub = '01';
                    } else if (parseInt(sub0, 10) > 1) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > 12) {
                        sub = '12';
                    }

                    break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return this.getFixedDateString(result);
    },

    getFixedDateString: function (value) {
        var owner = this, datePattern = owner.datePattern, date = [],
            dayIndex = 0, monthIndex = 0, yearIndex = 0,
            dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0,
            day, month, year, fullYearDone = false;

        // mm-dd || dd-mm
        if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
            dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
            monthStartIndex = 2 - dayStartIndex;
            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);

            date = this.getFixedDate(day, month, 0);
        }

        // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
        if (value.length === 8) {
            datePattern.forEach(function (type, index) {
                switch (type) {
                case 'd':
                    dayIndex = index;
                    break;
                case 'm':
                    monthIndex = index;
                    break;
                default:
                    yearIndex = index;
                    break;
                }
            });

            yearStartIndex = yearIndex * 2;
            dayStartIndex = (dayIndex <= yearIndex) ? dayIndex * 2 : (dayIndex * 2 + 2);
            monthStartIndex = (monthIndex <= yearIndex) ? monthIndex * 2 : (monthIndex * 2 + 2);

            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

            date = this.getFixedDate(day, month, year);
        }

        // mm-yy || yy-mm
        if (value.length === 4 && (datePattern[0] === 'y' || datePattern[1] === 'y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
            yearStartIndex = 2 - monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;

            date = [0, month, year];
        }

        // mm-yyyy || yyyy-mm
        if (value.length === 6 && (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
            yearStartIndex = 2 - 0.5 * monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

            date = [0, month, year];
        }

        date = owner.getRangeFixedDate(date);
        owner.date = date;

        var result = date.length === 0 ? value : datePattern.reduce(function (previous, current) {
            switch (current) {
            case 'd':
                return previous + (date[0] === 0 ? '' : owner.addLeadingZero(date[0]));
            case 'm':
                return previous + (date[1] === 0 ? '' : owner.addLeadingZero(date[1]));
            case 'y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : '');
            case 'Y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : '');
            }
        }, '');

        return result;
    },

    getRangeFixedDate: function (date) {
        var owner = this,
            datePattern = owner.datePattern,
            dateMin = owner.dateMin || [],
            dateMax = owner.dateMax || [];

        if (!date.length || (dateMin.length < 3 && dateMax.length < 3)) return date;

        if (
          datePattern.find(function(x) {
            return x.toLowerCase() === 'y';
          }) &&
          date[2] === 0
        ) return date;

        if (dateMax.length && (dateMax[2] < date[2] || (
          dateMax[2] === date[2] && (dateMax[1] < date[1] || (
            dateMax[1] === date[1] && dateMax[0] < date[0]
          ))
        ))) return dateMax;

        if (dateMin.length && (dateMin[2] > date[2] || (
          dateMin[2] === date[2] && (dateMin[1] > date[1] || (
            dateMin[1] === date[1] && dateMin[0] > date[0]
          ))
        ))) return dateMin;

        return date;
    },

    getFixedDate: function (day, month, year) {
        day = Math.min(day, 31);
        month = Math.min(month, 12);
        year = parseInt((year || 0), 10);

        if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
            day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30);
        }

        return [day, month, year];
    },

    isLeapYear: function (year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    },

    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    },

    addLeadingZeroForYear: function (number, fullYearMode) {
        if (fullYearMode) {
            return (number < 10 ? '000' : (number < 100 ? '00' : (number < 1000 ? '0' : ''))) + number;
        }

        return (number < 10 ? '0' : '') + number;
    }
};

var DateFormatter_1 = DateFormatter;

var TimeFormatter = function (timePattern, timeFormat) {
    var owner = this;

    owner.time = [];
    owner.blocks = [];
    owner.timePattern = timePattern;
    owner.timeFormat = timeFormat;
    owner.initBlocks();
};

TimeFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.timePattern.forEach(function () {
            owner.blocks.push(2);
        });
    },

    getISOFormatTime: function () {
        var owner = this,
            time = owner.time;

        return time[2] ? (
            owner.addLeadingZero(time[0]) + ':' + owner.addLeadingZero(time[1]) + ':' + owner.addLeadingZero(time[2])
        ) : '';
    },

    getBlocks: function () {
        return this.blocks;
    },

    getTimeFormatOptions: function () {
        var owner = this;
        if (String(owner.timeFormat) === '12') {
            return {
                maxHourFirstDigit: 1,
                maxHours: 12,
                maxMinutesFirstDigit: 5,
                maxMinutes: 60
            };
        }

        return {
            maxHourFirstDigit: 2,
            maxHours: 23,
            maxMinutesFirstDigit: 5,
            maxMinutes: 60
        };
    },

    getValidatedTime: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        var timeFormatOptions = owner.getTimeFormatOptions();

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.timePattern[index]) {

                case 'h':
                    if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
                        sub = timeFormatOptions.maxHours + '';
                    }

                    break;

                case 'm':
                case 's':
                    if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
                        sub = timeFormatOptions.maxMinutes + '';
                    }
                    break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return this.getFixedTimeString(result);
    },

    getFixedTimeString: function (value) {
        var owner = this, timePattern = owner.timePattern, time = [],
            secondIndex = 0, minuteIndex = 0, hourIndex = 0,
            secondStartIndex = 0, minuteStartIndex = 0, hourStartIndex = 0,
            second, minute, hour;

        if (value.length === 6) {
            timePattern.forEach(function (type, index) {
                switch (type) {
                case 's':
                    secondIndex = index * 2;
                    break;
                case 'm':
                    minuteIndex = index * 2;
                    break;
                case 'h':
                    hourIndex = index * 2;
                    break;
                }
            });

            hourStartIndex = hourIndex;
            minuteStartIndex = minuteIndex;
            secondStartIndex = secondIndex;

            second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

            time = this.getFixedTime(hour, minute, second);
        }

        if (value.length === 4 && owner.timePattern.indexOf('s') < 0) {
            timePattern.forEach(function (type, index) {
                switch (type) {
                case 'm':
                    minuteIndex = index * 2;
                    break;
                case 'h':
                    hourIndex = index * 2;
                    break;
                }
            });

            hourStartIndex = hourIndex;
            minuteStartIndex = minuteIndex;

            second = 0;
            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

            time = this.getFixedTime(hour, minute, second);
        }

        owner.time = time;

        return time.length === 0 ? value : timePattern.reduce(function (previous, current) {
            switch (current) {
            case 's':
                return previous + owner.addLeadingZero(time[2]);
            case 'm':
                return previous + owner.addLeadingZero(time[1]);
            case 'h':
                return previous + owner.addLeadingZero(time[0]);
            }
        }, '');
    },

    getFixedTime: function (hour, minute, second) {
        second = Math.min(parseInt(second || 0, 10), 60);
        minute = Math.min(minute, 60);
        hour = Math.min(hour, 60);

        return [hour, minute, second];
    },

    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    }
};

var TimeFormatter_1 = TimeFormatter;

var PhoneFormatter = function (formatter, delimiter) {
    var owner = this;

    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ' ';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

    owner.formatter = formatter;
};

PhoneFormatter.prototype = {
    setFormatter: function (formatter) {
        this.formatter = formatter;
    },

    format: function (phoneNumber) {
        var owner = this;

        owner.formatter.clear();

        // only keep number and +
        phoneNumber = phoneNumber.replace(/[^\d+]/g, '');

        // strip non-leading +
        phoneNumber = phoneNumber.replace(/^\+/, 'B').replace(/\+/g, '').replace('B', '+');

        // strip delimiter
        phoneNumber = phoneNumber.replace(owner.delimiterRE, '');

        var result = '', current, validated = false;

        for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
            current = owner.formatter.inputDigit(phoneNumber.charAt(i));

            // has ()- or space inside
            if (/[\s()-]/g.test(current)) {
                result = current;

                validated = true;
            } else {
                if (!validated) {
                    result = current;
                }
                // else: over length input
                // it turns to invalid number again
            }
        }

        // strip ()
        // e.g. US: 7161234567 returns (716) 123-4567
        result = result.replace(/[()]/g, '');
        // replace library delimiter with user customized delimiter
        result = result.replace(/[\s-]/g, owner.delimiter);

        return result;
    }
};

var PhoneFormatter_1 = PhoneFormatter;

var CreditCardDetector = {
    blocks: {
        uatp:          [4, 5, 6],
        amex:          [4, 6, 5],
        diners:        [4, 6, 4],
        discover:      [4, 4, 4, 4],
        mastercard:    [4, 4, 4, 4],
        dankort:       [4, 4, 4, 4],
        instapayment:  [4, 4, 4, 4],
        jcb15:         [4, 6, 5],
        jcb:           [4, 4, 4, 4],
        maestro:       [4, 4, 4, 4],
        visa:          [4, 4, 4, 4],
        mir:           [4, 4, 4, 4],
        unionPay:      [4, 4, 4, 4],
        general:       [4, 4, 4, 4]
    },

    re: {
        // starts with 1; 15 digits, not starts with 1800 (jcb card)
        uatp: /^(?!1800)1\d{0,14}/,

        // starts with 34/37; 15 digits
        amex: /^3[47]\d{0,13}/,

        // starts with 6011/65/644-649; 16 digits
        discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

        // starts with 300-305/309 or 36/38/39; 14 digits
        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

        // starts with 51-55/2221–2720; 16 digits
        mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,

        // starts with 5019/4175/4571; 16 digits
        dankort: /^(5019|4175|4571)\d{0,12}/,

        // starts with 637-639; 16 digits
        instapayment: /^63[7-9]\d{0,13}/,

        // starts with 2131/1800; 15 digits
        jcb15: /^(?:2131|1800)\d{0,11}/,

        // starts with 2131/1800/35; 16 digits
        jcb: /^(?:35\d{0,2})\d{0,12}/,

        // starts with 50/56-58/6304/67; 16 digits
        maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

        // starts with 22; 16 digits
        mir: /^220[0-4]\d{0,12}/,

        // starts with 4; 16 digits
        visa: /^4\d{0,15}/,

        // starts with 62/81; 16 digits
        unionPay: /^(62|81)\d{0,14}/
    },

    getStrictBlocks: function (block) {
      var total = block.reduce(function (prev, current) {
        return prev + current;
      }, 0);

      return block.concat(19 - total);
    },

    getInfo: function (value, strictMode) {
        var blocks = CreditCardDetector.blocks,
            re = CreditCardDetector.re;

        // Some credit card can have up to 19 digits number.
        // Set strictMode to true will remove the 16 max-length restrain,
        // however, I never found any website validate card number like
        // this, hence probably you don't want to enable this option.
        strictMode = !!strictMode;

        for (var key in re) {
            if (re[key].test(value)) {
                var matchedBlocks = blocks[key];
                return {
                    type: key,
                    blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
                };
            }
        }

        return {
            type: 'unknown',
            blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
        };
    }
};

var CreditCardDetector_1 = CreditCardDetector;

var Util = {
    noop: function () {
    },

    strip: function (value, re) {
        return value.replace(re, '');
    },

    getPostDelimiter: function (value, delimiter, delimiters) {
        // single delimiter
        if (delimiters.length === 0) {
            return value.slice(-delimiter.length) === delimiter ? delimiter : '';
        }

        // multiple delimiters
        var matchedDelimiter = '';
        delimiters.forEach(function (current) {
            if (value.slice(-current.length) === current) {
                matchedDelimiter = current;
            }
        });

        return matchedDelimiter;
    },

    getDelimiterREByDelimiter: function (delimiter) {
        return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
    },

    getNextCursorPosition: function (prevPos, oldValue, newValue, delimiter, delimiters) {
      // If cursor was at the end of value, just place it back.
      // Because new value could contain additional chars.
      if (oldValue.length === prevPos) {
          return newValue.length;
      }

      return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter ,delimiters);
    },

    getPositionOffset: function (prevPos, oldValue, newValue, delimiter, delimiters) {
        var oldRawValue, newRawValue, lengthOffset;

        oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
        newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
        lengthOffset = oldRawValue.length - newRawValue.length;

        return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
    },

    stripDelimiters: function (value, delimiter, delimiters) {
        var owner = this;

        // single delimiter
        if (delimiters.length === 0) {
            var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';

            return value.replace(delimiterRE, '');
        }

        // multiple delimiters
        delimiters.forEach(function (current) {
            current.split('').forEach(function (letter) {
                value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
            });
        });

        return value;
    },

    headStr: function (str, length) {
        return str.slice(0, length);
    },

    getMaxLength: function (blocks) {
        return blocks.reduce(function (previous, current) {
            return previous + current;
        }, 0);
    },

    // strip prefix
    // Before type  |   After type    |     Return value
    // PEFIX-...    |   PEFIX-...     |     ''
    // PREFIX-123   |   PEFIX-123     |     123
    // PREFIX-123   |   PREFIX-23     |     23
    // PREFIX-123   |   PREFIX-1234   |     1234
    getPrefixStrippedValue: function (value, prefix, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
        // No prefix
        if (prefixLength === 0) {
          return value;
        }

        // Value is prefix
        if (value === prefix && value !== '') {
          return '';
        }

        if (signBeforePrefix && (value.slice(0, 1) == '-')) {
            var prev = (prevResult.slice(0, 1) == '-') ? prevResult.slice(1) : prevResult;
            return '-' + this.getPrefixStrippedValue(value.slice(1), prefix, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
        }

        // Pre result prefix string does not match pre-defined prefix
        if (prevResult.slice(0, prefixLength) !== prefix && !tailPrefix) {
            // Check if the first time user entered something
            if (noImmediatePrefix && !prevResult && value) return value;
            return '';
        } else if (prevResult.slice(-prefixLength) !== prefix && tailPrefix) {
            // Check if the first time user entered something
            if (noImmediatePrefix && !prevResult && value) return value;
            return '';
        }

        var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);

        // New value has issue, someone typed in between prefix letters
        // Revert to pre value
        if (value.slice(0, prefixLength) !== prefix && !tailPrefix) {
            return prevValue.slice(prefixLength);
        } else if (value.slice(-prefixLength) !== prefix && tailPrefix) {
            return prevValue.slice(0, -prefixLength - 1);
        }

        // No issue, strip prefix for new value
        return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
    },

    getFirstDiffIndex: function (prev, current) {
        var index = 0;

        while (prev.charAt(index) === current.charAt(index)) {
            if (prev.charAt(index++) === '') {
                return -1;
            }
        }

        return index;
    },

    getFormattedValue: function (value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
        var result = '',
            multipleDelimiters = delimiters.length > 0,
            currentDelimiter = '';

        // no options, normal input
        if (blocksLength === 0) {
            return value;
        }

        blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    rest = value.slice(length);

                if (multipleDelimiters) {
                    currentDelimiter = delimiters[delimiterLazyShow ? (index - 1) : index] || currentDelimiter;
                } else {
                    currentDelimiter = delimiter;
                }

                if (delimiterLazyShow) {
                    if (index > 0) {
                        result += currentDelimiter;
                    }

                    result += sub;
                } else {
                    result += sub;

                    if (sub.length === length && index < blocksLength - 1) {
                        result += currentDelimiter;
                    }
                }

                // update remaining string
                value = rest;
            }
        });

        return result;
    },

    // move cursor to the end
    // the first time user focuses on an input with prefix
    fixPrefixCursor: function (el, prefix, delimiter, delimiters) {
        if (!el) {
            return;
        }

        var val = el.value,
            appendix = delimiter || (delimiters[0] || ' ');

        if (!el.setSelectionRange || !prefix || (prefix.length + appendix.length) <= val.length) {
            return;
        }

        var len = val.length * 2;

        // set timeout to avoid blink
        setTimeout(function () {
            el.setSelectionRange(len, len);
        }, 1);
    },

    // Check if input field is fully selected
    checkFullSelection: function(value) {
      try {
        var selection = window.getSelection() || document.getSelection() || {};
        return selection.toString().length === value.length;
      } catch (ex) {
        // Ignore
      }

      return false;
    },

    setSelection: function (element, position, doc) {
        if (element !== this.getActiveElement(doc)) {
            return;
        }

        // cursor is already in the end
        if (element && element.value.length <= position) {
          return;
        }

        if (element.createTextRange) {
            var range = element.createTextRange();

            range.move('character', position);
            range.select();
        } else {
            try {
                element.setSelectionRange(position, position);
            } catch (e) {
                // eslint-disable-next-line
                console.warn('The input element type does not support selection');
            }
        }
    },

    getActiveElement: function(parent) {
        var activeElement = parent.activeElement;
        if (activeElement && activeElement.shadowRoot) {
            return this.getActiveElement(activeElement.shadowRoot);
        }
        return activeElement;
    },

    isAndroid: function () {
        return navigator && /android/i.test(navigator.userAgent);
    },

    // On Android chrome, the keyup and keydown events
    // always return key code 229 as a composition that
    // buffers the user’s keystrokes
    // see https://github.com/nosir/cleave.js/issues/147
    isAndroidBackspaceKeydown: function (lastInputValue, currentInputValue) {
        if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
            return false;
        }

        return currentInputValue === lastInputValue.slice(0, -1);
    }
};

var Util_1 = Util;

/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */
var DefaultProperties = {
    // Maybe change to object-assign
    // for now just keep it as simple
    assign: function (target, opts) {
        target = target || {};
        opts = opts || {};

        // credit card
        target.creditCard = !!opts.creditCard;
        target.creditCardStrictMode = !!opts.creditCardStrictMode;
        target.creditCardType = '';
        target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || (function () {});

        // phone
        target.phone = !!opts.phone;
        target.phoneRegionCode = opts.phoneRegionCode || 'AU';
        target.phoneFormatter = {};

        // time
        target.time = !!opts.time;
        target.timePattern = opts.timePattern || ['h', 'm', 's'];
        target.timeFormat = opts.timeFormat || '24';
        target.timeFormatter = {};

        // date
        target.date = !!opts.date;
        target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
        target.dateMin = opts.dateMin || '';
        target.dateMax = opts.dateMax || '';
        target.dateFormatter = {};

        // numeral
        target.numeral = !!opts.numeral;
        target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
        target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
        target.numeralDecimalMark = opts.numeralDecimalMark || '.';
        target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';
        target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
        target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
        target.signBeforePrefix = !!opts.signBeforePrefix;
        target.tailPrefix = !!opts.tailPrefix;

        // others
        target.swapHiddenInput = !!opts.swapHiddenInput;
        
        target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

        target.uppercase = !!opts.uppercase;
        target.lowercase = !!opts.lowercase;

        target.prefix = (target.creditCard || target.date) ? '' : (opts.prefix || '');
        target.noImmediatePrefix = !!opts.noImmediatePrefix;
        target.prefixLength = target.prefix.length;
        target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
        target.copyDelimiter = !!opts.copyDelimiter;

        target.initValue = (opts.initValue !== undefined && opts.initValue !== null) ? opts.initValue.toString() : '';

        target.delimiter =
            (opts.delimiter || opts.delimiter === '') ? opts.delimiter :
                (opts.date ? '/' :
                    (opts.time ? ':' :
                        (opts.numeral ? ',' :
                            (opts.phone ? ' ' :
                                ' '))));
        target.delimiterLength = target.delimiter.length;
        target.delimiterLazyShow = !!opts.delimiterLazyShow;
        target.delimiters = opts.delimiters || [];

        target.blocks = opts.blocks || [];
        target.blocksLength = target.blocks.length;

        target.root = (typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window;
        target.document = opts.document || target.root.document;

        target.maxLength = 0;

        target.backspace = false;
        target.result = '';

        target.onValueChanged = opts.onValueChanged || (function () {});

        return target;
    }
};

var DefaultProperties_1 = DefaultProperties;

/**
 * Construct a new Cleave instance by passing the configuration object
 *
 * @param {String | HTMLElement} element
 * @param {Object} opts
 */
var Cleave = function (element, opts) {
    var owner = this;
    var hasMultipleElements = false;

    if (typeof element === 'string') {
        owner.element = document.querySelector(element);
        hasMultipleElements = document.querySelectorAll(element).length > 1;
    } else {
      if (typeof element.length !== 'undefined' && element.length > 0) {
        owner.element = element[0];
        hasMultipleElements = element.length > 1;
      } else {
        owner.element = element;
      }
    }

    if (!owner.element) {
        throw new Error('[cleave.js] Please check the element');
    }

    if (hasMultipleElements) {
      try {
        // eslint-disable-next-line
        console.warn('[cleave.js] Multiple input fields matched, cleave.js will only take the first one.');
      } catch (e) {
        // Old IE
      }
    }

    opts.initValue = owner.element.value;

    owner.properties = Cleave.DefaultProperties.assign({}, opts);

    owner.init();
};

Cleave.prototype = {
    init: function () {
        var owner = this, pps = owner.properties;

        // no need to use this lib
        if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && (pps.blocksLength === 0 && !pps.prefix)) {
            owner.onInput(pps.initValue);

            return;
        }

        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);

        owner.isAndroid = Cleave.Util.isAndroid();
        owner.lastInputValue = '';
        owner.isBackward = '';

        owner.onChangeListener = owner.onChange.bind(owner);
        owner.onKeyDownListener = owner.onKeyDown.bind(owner);
        owner.onFocusListener = owner.onFocus.bind(owner);
        owner.onCutListener = owner.onCut.bind(owner);
        owner.onCopyListener = owner.onCopy.bind(owner);

        owner.initSwapHiddenInput();

        owner.element.addEventListener('input', owner.onChangeListener);
        owner.element.addEventListener('keydown', owner.onKeyDownListener);
        owner.element.addEventListener('focus', owner.onFocusListener);
        owner.element.addEventListener('cut', owner.onCutListener);
        owner.element.addEventListener('copy', owner.onCopyListener);


        owner.initPhoneFormatter();
        owner.initDateFormatter();
        owner.initTimeFormatter();
        owner.initNumeralFormatter();

        // avoid touch input field if value is null
        // otherwise Firefox will add red box-shadow for <input required />
        if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
            owner.onInput(pps.initValue);
        }
    },

    initSwapHiddenInput: function () {
        var owner = this, pps = owner.properties;
        if (!pps.swapHiddenInput) return;

        var inputFormatter = owner.element.cloneNode(true);
        owner.element.parentNode.insertBefore(inputFormatter, owner.element);

        owner.elementSwapHidden = owner.element;
        owner.elementSwapHidden.type = 'hidden';

        owner.element = inputFormatter;
        owner.element.id = '';
    },

    initNumeralFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.numeral) {
            return;
        }

        pps.numeralFormatter = new Cleave.NumeralFormatter(
            pps.numeralDecimalMark,
            pps.numeralIntegerScale,
            pps.numeralDecimalScale,
            pps.numeralThousandsGroupStyle,
            pps.numeralPositiveOnly,
            pps.stripLeadingZeroes,
            pps.prefix,
            pps.signBeforePrefix,
            pps.tailPrefix,
            pps.delimiter
        );
    },

    initTimeFormatter: function() {
        var owner = this, pps = owner.properties;

        if (!pps.time) {
            return;
        }

        pps.timeFormatter = new Cleave.TimeFormatter(pps.timePattern, pps.timeFormat);
        pps.blocks = pps.timeFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    },

    initDateFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.date) {
            return;
        }

        pps.dateFormatter = new Cleave.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
        pps.blocks = pps.dateFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    },

    initPhoneFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.phone) {
            return;
        }

        // Cleave.AsYouTypeFormatter should be provided by
        // external google closure lib
        try {
            pps.phoneFormatter = new Cleave.PhoneFormatter(
                new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode),
                pps.delimiter
            );
        } catch (ex) {
            throw new Error('[cleave.js] Please include phone-type-formatter.{country}.js lib');
        }
    },

    onKeyDown: function (event) {
        var owner = this,
            charCode = event.which || event.keyCode;

        owner.lastInputValue = owner.element.value;
        owner.isBackward = charCode === 8;
    },

    onChange: function (event) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util;

        owner.isBackward = owner.isBackward || event.inputType === 'deleteContentBackward';

        var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);

        if (owner.isBackward && postDelimiter) {
            pps.postDelimiterBackspace = postDelimiter;
        } else {
            pps.postDelimiterBackspace = false;
        }

        this.onInput(this.element.value);
    },

    onFocus: function () {
        var owner = this,
            pps = owner.properties;
        owner.lastInputValue = owner.element.value;

        if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
            this.onInput(pps.prefix);
        }

        Cleave.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
    },

    onCut: function (e) {
        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
        this.copyClipboardData(e);
        this.onInput('');
    },

    onCopy: function (e) {
        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
        this.copyClipboardData(e);
    },

    copyClipboardData: function (e) {
        var owner = this,
            pps = owner.properties,
            Util = Cleave.Util,
            inputValue = owner.element.value,
            textToCopy = '';

        if (!pps.copyDelimiter) {
            textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
        } else {
            textToCopy = inputValue;
        }

        try {
            if (e.clipboardData) {
                e.clipboardData.setData('Text', textToCopy);
            } else {
                window.clipboardData.setData('Text', textToCopy);
            }

            e.preventDefault();
        } catch (ex) {
            //  empty
        }
    },

    onInput: function (value) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util;

        // case 1: delete one more character "4"
        // 1234*| -> hit backspace -> 123|
        // case 2: last character is not delimiter which is:
        // 12|34* -> hit backspace -> 1|34*
        // note: no need to apply this for numeral mode
        var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
        if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
            value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
        }

        // phone formatter
        if (pps.phone) {
            if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
                pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
            } else {
                pps.result = pps.phoneFormatter.format(value);
            }
            owner.updateValueState();

            return;
        }

        // numeral formatter
        if (pps.numeral) {
            // Do not show prefix when noImmediatePrefix is specified
            // This mostly because we need to show user the native input placeholder
            if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
                pps.result = '';
            } else {
                pps.result = pps.numeralFormatter.format(value);
            }
            owner.updateValueState();

            return;
        }

        // date
        if (pps.date) {
            value = pps.dateFormatter.getValidatedDate(value);
        }

        // time
        if (pps.time) {
            value = pps.timeFormatter.getValidatedTime(value);
        }

        // strip delimiters
        value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

        // strip prefix
        value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);

        // strip non-numeric characters
        value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

        // convert case
        value = pps.uppercase ? value.toUpperCase() : value;
        value = pps.lowercase ? value.toLowerCase() : value;

        // prevent from showing prefix when no immediate option enabled with empty input value
        if (pps.prefix) {
            if (pps.tailPrefix) {
                value = value + pps.prefix;
            } else {
                value = pps.prefix + value;
            }


            // no blocks specified, no need to do formatting
            if (pps.blocksLength === 0) {
                pps.result = value;
                owner.updateValueState();

                return;
            }
        }

        // update credit card props
        if (pps.creditCard) {
            owner.updateCreditCardPropsByValue(value);
        }

        // strip over length characters
        value = Util.headStr(value, pps.maxLength);

        // apply blocks
        pps.result = Util.getFormattedValue(
            value,
            pps.blocks, pps.blocksLength,
            pps.delimiter, pps.delimiters, pps.delimiterLazyShow
        );

        owner.updateValueState();
    },

    updateCreditCardPropsByValue: function (value) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util,
            creditCardInfo;

        // At least one of the first 4 characters has changed
        if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
            return;
        }

        creditCardInfo = Cleave.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

        pps.blocks = creditCardInfo.blocks;
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Util.getMaxLength(pps.blocks);

        // credit card type changed
        if (pps.creditCardType !== creditCardInfo.type) {
            pps.creditCardType = creditCardInfo.type;

            pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
        }
    },

    updateValueState: function () {
        var owner = this,
            Util = Cleave.Util,
            pps = owner.properties;

        if (!owner.element) {
            return;
        }

        var endPos = owner.element.selectionEnd;
        var oldValue = owner.element.value;
        var newValue = pps.result;

        endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

        // fix Android browser type="text" input field
        // cursor not jumping issue
        if (owner.isAndroid) {
            window.setTimeout(function () {
                owner.element.value = newValue;
                Util.setSelection(owner.element, endPos, pps.document, false);
                owner.callOnValueChanged();
            }, 1);

            return;
        }

        owner.element.value = newValue;
        if (pps.swapHiddenInput) owner.elementSwapHidden.value = owner.getRawValue();

        Util.setSelection(owner.element, endPos, pps.document, false);
        owner.callOnValueChanged();
    },

    callOnValueChanged: function () {
        var owner = this,
            pps = owner.properties;

        pps.onValueChanged.call(owner, {
            target: {
                name: owner.element.name,
                value: pps.result,
                rawValue: owner.getRawValue()
            }
        });
    },

    setPhoneRegionCode: function (phoneRegionCode) {
        var owner = this, pps = owner.properties;

        pps.phoneRegionCode = phoneRegionCode;
        owner.initPhoneFormatter();
        owner.onChange();
    },

    setRawValue: function (value) {
        var owner = this, pps = owner.properties;

        value = value !== undefined && value !== null ? value.toString() : '';

        if (pps.numeral) {
            value = value.replace('.', pps.numeralDecimalMark);
        }

        pps.postDelimiterBackspace = false;

        owner.element.value = value;
        owner.onInput(value);
    },

    getRawValue: function () {
        var owner = this,
            pps = owner.properties,
            Util = Cleave.Util,
            rawValue = owner.element.value;

        if (pps.rawValueTrimPrefix) {
            rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
        }

        if (pps.numeral) {
            rawValue = pps.numeralFormatter.getRawValue(rawValue);
        } else {
            rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
        }

        return rawValue;
    },

    getISOFormatDate: function () {
        var owner = this,
            pps = owner.properties;

        return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
    },

    getISOFormatTime: function () {
        var owner = this,
            pps = owner.properties;

        return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
    },

    getFormattedValue: function () {
        return this.element.value;
    },

    destroy: function () {
        var owner = this;

        owner.element.removeEventListener('input', owner.onChangeListener);
        owner.element.removeEventListener('keydown', owner.onKeyDownListener);
        owner.element.removeEventListener('focus', owner.onFocusListener);
        owner.element.removeEventListener('cut', owner.onCutListener);
        owner.element.removeEventListener('copy', owner.onCopyListener);
    },

    toString: function () {
        return '[Cleave Object]';
    }
};

Cleave.NumeralFormatter = NumeralFormatter_1;
Cleave.DateFormatter = DateFormatter_1;
Cleave.TimeFormatter = TimeFormatter_1;
Cleave.PhoneFormatter = PhoneFormatter_1;
Cleave.CreditCardDetector = CreditCardDetector_1;
Cleave.Util = Util_1;
Cleave.DefaultProperties = DefaultProperties_1;

// for angular directive
((typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window)['Cleave'] = Cleave;

// CommonJS
var Cleave_1 = Cleave;

const catInputCss = ".hint-wrapper{flex:0 1 auto;display:flex;gap:0.5rem}.hint-section{flex:1 1 auto;display:flex;flex-direction:column;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108));font-size:0.875rem;line-height:1.125rem}.hint-section .input-hint,.hint-section ::slotted([slot=hint]){margin:0 !important}.cat-bg-primary{background-color:rgb(var(--cat-primary-bg, 0, 129, 148)) !important;color:rgb(var(--cat-primary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-primary-hover{transition:background-color 125ms, color 125ms}.cat-bg-primary-hover:hover{background-color:rgb(var(--cat-primary-bg-hover, 1, 115, 132)) !important;color:rgb(var(--cat-primary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-primary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-primary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-primary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-primary,.cat-link-primary{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}button.cat-text-primary,button.cat-link-primary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primary,.cat-text-primary-hover{transition:color 125ms}.cat-link-primary:hover,.cat-text-primary-hover:hover{color:rgb(var(--cat-primary-text-hover, 1, 115, 132)) !important}.cat-link-primary:active,.cat-text-primary-hover:active{color:rgb(var(--cat-primary-text-active, 2, 99, 113)) !important}.cat-bg-primaryInverted{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-primaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-primaryInverted-hover:hover{background-color:#93b4f2 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-primaryInverted,.cat-link-primaryInverted{color:#93b4f2 !important}button.cat-text-primaryInverted,button.cat-link-primaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-primaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-primaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-primaryInverted,.cat-text-primaryInverted-hover{transition:color 125ms}.cat-link-primaryInverted:hover,.cat-text-primaryInverted-hover:hover{color:#93b4f2 !important}.cat-link-primaryInverted:active,.cat-text-primaryInverted-hover:active{color:#93b4f2 !important}.cat-bg-secondary{background-color:rgb(var(--cat-secondary-bg, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-secondary-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondary-hover:hover{background-color:rgb(var(--cat-secondary-bg-hover, 105, 118, 135)) !important;color:rgb(var(--cat-secondary-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-secondary-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-secondary-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-secondary-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-secondary,.cat-link-secondary{color:rgb(var(--cat-secondary-text, 0, 0, 0)) !important}button.cat-text-secondary,button.cat-link-secondary{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondary:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondary:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondary,.cat-text-secondary-hover{transition:color 125ms}.cat-link-secondary:hover,.cat-text-secondary-hover:hover{color:rgb(var(--cat-secondary-text-hover, 0, 0, 0)) !important}.cat-link-secondary:active,.cat-text-secondary-hover:active{color:rgb(var(--cat-secondary-text-active, 0, 0, 0)) !important}.cat-bg-secondaryInverted{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-bg-secondaryInverted-hover{transition:background-color 125ms, color 125ms}.cat-bg-secondaryInverted-hover:hover{background-color:#697687 !important;color:black !important;--cat-primary-text:0, 0, 0;--cat-primary-text-hover:0, 0, 0;--cat-primary-text-active:0, 0, 0;--cat-link-decoration:underline}.cat-text-secondaryInverted,.cat-link-secondaryInverted{color:white !important}button.cat-text-secondaryInverted,button.cat-link-secondaryInverted{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-secondaryInverted:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-secondaryInverted:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-secondaryInverted,.cat-text-secondaryInverted-hover{transition:color 125ms}.cat-link-secondaryInverted:hover,.cat-text-secondaryInverted-hover:hover{color:white !important}.cat-link-secondaryInverted:active,.cat-text-secondaryInverted-hover:active{color:white !important}.cat-bg-info{background-color:rgb(var(--cat-info-bg, 0, 115, 230)) !important;color:rgb(var(--cat-info-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-info-hover{transition:background-color 125ms, color 125ms}.cat-bg-info-hover:hover{background-color:rgb(var(--cat-info-bg-hover, 0, 107, 227)) !important;color:rgb(var(--cat-info-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-info-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-info-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-info-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-info,.cat-link-info{color:rgb(var(--cat-info-text, 0, 115, 230)) !important}button.cat-text-info,button.cat-link-info{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-info:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-info:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-info,.cat-text-info-hover{transition:color 125ms}.cat-link-info:hover,.cat-text-info-hover:hover{color:rgb(var(--cat-info-text-hover, 0, 107, 227)) !important}.cat-link-info:active,.cat-text-info-hover:active{color:rgb(var(--cat-info-text-active, 0, 96, 223)) !important}.cat-bg-success{background-color:rgb(var(--cat-success-bg, 0, 132, 88)) !important;color:rgb(var(--cat-success-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-success-hover{transition:background-color 125ms, color 125ms}.cat-bg-success-hover:hover{background-color:rgb(var(--cat-success-bg-hover, 0, 117, 78)) !important;color:rgb(var(--cat-success-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-success-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-success-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-success-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-success,.cat-link-success{color:rgb(var(--cat-success-text, 0, 132, 88)) !important}button.cat-text-success,button.cat-link-success{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-success:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-success:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-success,.cat-text-success-hover{transition:color 125ms}.cat-link-success:hover,.cat-text-success-hover:hover{color:rgb(var(--cat-success-text-hover, 0, 117, 78)) !important}.cat-link-success:active,.cat-text-success-hover:active{color:rgb(var(--cat-success-text-active, 0, 105, 70)) !important}.cat-bg-warning{background-color:rgb(var(--cat-warning-bg, 255, 206, 128)) !important;color:rgb(var(--cat-warning-fill, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-bg-warning-hover{transition:background-color 125ms, color 125ms}.cat-bg-warning-hover:hover{background-color:rgb(var(--cat-warning-bg-hover, 255, 214, 148)) !important;color:rgb(var(--cat-warning-fill-hover, 0, 0, 0)) !important;--cat-primary-text:var(--cat-warning-fill, 0, 0, 0);--cat-primary-text-hover:var(--cat-warning-fill-hover, 0, 0, 0);--cat-primary-text-active:var(--cat-warning-fill-active, 0, 0, 0);--cat-link-decoration:underline}.cat-text-warning,.cat-link-warning{color:rgb(var(--cat-warning-text, 159, 97, 0)) !important}button.cat-text-warning,button.cat-link-warning{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-warning:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-warning:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-warning,.cat-text-warning-hover{transition:color 125ms}.cat-link-warning:hover,.cat-text-warning-hover:hover{color:rgb(var(--cat-warning-text-hover, 159, 97, 0)) !important}.cat-link-warning:active,.cat-text-warning-hover:active{color:rgb(var(--cat-warning-text-active, 159, 97, 0)) !important}.cat-bg-danger{background-color:rgb(var(--cat-danger-bg, 217, 52, 13)) !important;color:rgb(var(--cat-danger-fill, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-bg-danger-hover{transition:background-color 125ms, color 125ms}.cat-bg-danger-hover:hover{background-color:rgb(var(--cat-danger-bg-hover, 194, 46, 11)) !important;color:rgb(var(--cat-danger-fill-hover, 255, 255, 255)) !important;--cat-primary-text:var(--cat-danger-fill, 255, 255, 255);--cat-primary-text-hover:var(--cat-danger-fill-hover, 255, 255, 255);--cat-primary-text-active:var(--cat-danger-fill-active, 255, 255, 255);--cat-link-decoration:underline}.cat-text-danger,.cat-link-danger{color:rgb(var(--cat-danger-text, 217, 52, 13)) !important}button.cat-text-danger,button.cat-link-danger{margin:0;padding:0;font:inherit;border:none;background:none;cursor:pointer}button.cat-link-danger:hover:not(:disabled){text-decoration:var(--cat-link-decoration-hover, underline)}button.cat-link-danger:focus-visible{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:1px}.cat-link-danger,.cat-text-danger-hover{transition:color 125ms}.cat-link-danger:hover,.cat-text-danger-hover:hover{color:rgb(var(--cat-danger-text-hover, 194, 46, 11)) !important}.cat-link-danger:active,.cat-text-danger-hover:active{color:rgb(var(--cat-danger-text-active, 174, 42, 10)) !important}.cat-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-text-active{color:rgb(var(--cat-primary-text, 0, 129, 148)) !important}.cat-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-text-muted{color:rgb(var(--cat-font-color-muted, 81, 92, 108)) !important}.cat-bg-muted{background-color:#f2f4f7 !important}.cat-text-reset{color:inherit !important}.cat-link-reset{color:inherit !important;text-decoration:inherit !important}.label{overflow:hidden;word-wrap:break-word;word-break:break-word}.input-field:not(.input-horizontal) .label-container.hidden,.textarea-field:not(.textarea-horizontal) .label-container.hidden,.select-field:not(.select-horizontal) .label-container.hidden{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.label-container{flex-basis:var(--label-size, 33.33%)}.label-wrapper{display:flex;gap:0.25rem}.label-metadata{display:flex;flex-shrink:0;flex-grow:1;justify-content:space-between;gap:0.25rem;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.label-optional,.label-character-count{display:inline-flex;align-items:center;max-height:1.25rem;font-size:0.75rem;line-height:1rem}.label-character-count{margin-left:auto}.input-horizontal .label-container.hidden label,.textarea-horizontal .label-container.hidden label,.select-horizontal .label-container.hidden label{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important}.input-horizontal .label-wrapper,.textarea-horizontal .label-wrapper,.select-horizontal .label-wrapper{flex-direction:column}.input-horizontal label,.textarea-horizontal label,.select-horizontal label{min-height:2.5rem;display:inline-flex;align-items:center}.input-horizontal .label-metadata,.textarea-horizontal .label-metadata,.select-horizontal .label-metadata{justify-content:flex-start}.input-horizontal .label-metadata .label-character-count,.textarea-horizontal .label-metadata .label-character-count,.select-horizontal .label-metadata .label-character-count{margin-left:0}:host{display:flex;font-size:0.9375rem;line-height:1.25rem}:host([hidden]){display:none}.input-field,.input-container{display:flex;flex-direction:column;gap:0.5rem;flex:1 1 auto}.input-field.input-horizontal{flex-direction:row;gap:1rem}.input-wrapper{flex:1 1 auto;display:flex;align-items:stretch;gap:0.75rem;padding:0 0.75rem;height:2.5rem;overflow:hidden;background:white;border-radius:var(--cat-border-radius-m, 0.25rem);box-shadow:inset 0 0 0 1px rgb(var(--border-color));transition:box-shadow 125ms linear;--border-color:var(--cat-border-color-dark, 215, 219, 224);}.input-wrapper.input-round{border-radius:10rem}.input-wrapper.input-readonly{pointer-events:none}.input-wrapper.input-disabled{background:#f2f4f7;cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.input-wrapper:not(.input-disabled):hover{box-shadow:inset 0 0 0 1px rgb(var(--border-color)), 0 0 0 1px rgb(var(--border-color))}.input-wrapper:focus-within{outline:2px solid rgb(var(--cat-border-color-focus, 0, 113, 255));outline-offset:-1px}.input-wrapper:focus-within:has(.clearable:focus){outline:none}.input-wrapper.input-invalid{--border-color:var(--cat-danger-bg, 217, 52, 13), 0.2}.input-wrapper:has(input:-webkit-autofill),.input-wrapper:has(input:-webkit-autofill):hover,.input-wrapper:has(input:-webkit-autofill):focus{background-color:#e8f0fe}.text-prefix,.text-suffix{display:inline-flex;align-items:center;-webkit-user-select:none;-ms-user-select:none;user-select:none;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}.text-prefix{border-right:1px solid rgb(var(--cat-border-color-dark, 215, 219, 224));padding-right:0.75rem}.text-suffix{border-left:1px solid rgb(var(--cat-border-color-dark, 215, 219, 224));padding-left:0.75rem}.icon-loading,.icon-prefix,.icon-suffix{align-self:center}.input-outer-wrapper{display:flex}.input-inner-wrapper{display:flex;align-items:center;position:relative;flex:1 1 auto}input{font:inherit;margin:0;padding:0;width:100%;min-width:0;border:none;outline:none;background:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.input-disabled input{cursor:not-allowed;color:rgb(var(--cat-font-color-muted, 81, 92, 108))}input.has-clearable,input.has-toggle-password{padding-right:1.5rem}input.has-clearable.has-toggle-password{padding-right:3.5rem}input::placeholder{color:rgb(var(--cat-font-color-muted, 81, 92, 108))}input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 9999px #e8f0fe inset}.clearable{position:absolute;top:calc(50% - 1rem);right:-0.5rem}.toggle-password{position:absolute;top:calc(50% - 1rem);right:-0.5rem}.has-clearable~.toggle-password{right:1.5rem}:host(.cat-date-input) .input-wrapper,:host(.cat-time-input) .input-wrapper{z-index:1;border-top-right-radius:0;border-bottom-right-radius:0}";

let nextUniqueId = 0;
const CatInput = /*@__PURE__*/ proxyCustomElement(class CatInput extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.catChange = createEvent(this, "catChange");
        this.catFocus = createEvent(this, "catFocus");
        this.catBlur = createEvent(this, "catBlur");
        this._id = `cat-input-${nextUniqueId++}`;
        this.hasSlottedLabel = false;
        this.hasSlottedHint = false;
        this.hasSlottedCounter = false;
        this.isPasswordShown = false;
        /**
         * Whether the label need a marker to shown if the input is required or optional.
         */
        this.requiredMarker = 'optional';
        /**
         * Whether the label is on top or left.
         */
        this.horizontal = false;
        /**
         * Whether the input should show a clear button.
         */
        this.clearable = false;
        /**
         * Whether the input should show a password toggle button for password inputs.
         */
        this.togglePassword = false;
        /**
         * Whether the input is disabled.
         */
        this.disabled = false;
        /**
         * Displays the input in a loading state with a spinner.
         */
        this.loading = false;
        /**
         * Display the icon on the right.
         */
        this.iconRight = false;
        /**
         * The label for the input.
         */
        this.label = '';
        /**
         * Visually hide the label, but still show it to assistive technologies like screen readers.
         */
        this.labelHidden = false;
        /**
         * The value is not editable.
         */
        this.readonly = false;
        /**
         * A value is required or must be check for the form to be submittable.
         */
        this.required = false;
        /**
         * Use round input edges.
         */
        this.round = false;
        /**
         * Type of form control.
         */
        this.type = 'text';
        /**
         * Fine-grained control over when the errors are shown. Can be `false` to
         * never show errors, `true` to show errors on blur, or a number to show
         * errors change with the given delay in milliseconds or immediately on blur.
         */
        this.errorUpdate = 0;
    }
    get id() {
        return this.identifier || this._id;
    }
    componentWillLoad() {
        this.onErrorsChanged(this.errors, undefined, false);
    }
    componentWillRender() {
        this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
        this.hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
        this.hasSlottedCounter = !!this.hostElement.querySelector('[slot="counter"]');
    }
    /**
     * Programmatically move focus to the input. Use this method instead of
     * `input.focus()`.
     *
     * @param options An optional object providing options to control aspects of
     * the focusing process.
     */
    async doFocus(options) {
        // hack to make datepicker inputs focusable. The datepicker hides the input
        // element and dynamically creates a sibling. We need to find the new input
        // element and focus it instead.
        const input = this.input.type === 'hidden' ? this.findSiblingInput(this.input.nextSibling) : this.input;
        input?.focus(options);
    }
    /**
     * Programmatically remove focus from the input. Use this method instead of
     * `input.blur()`.
     */
    async doBlur() {
        this.input.blur();
    }
    /**
     * Clear the input.
     */
    async clear() {
        this.value = '';
        this.catChange.emit(this.value);
    }
    /**
     * Adds a Cleave.js mask to the input.
     *
     * @param options The Cleave.js options.
     */
    async mask(options) {
        new Cleave_1(this.input, options);
    }
    onErrorsChanged(newValue, _oldValue, update = true) {
        if (!coerceBoolean(this.errorUpdate)) {
            this.errorMap = undefined;
        }
        else {
            this.errorMapSrc = Array.isArray(newValue)
                ? newValue.reduce((acc, err) => ({ ...acc, [err]: undefined }), {})
                : newValue || undefined;
            if (update) {
                this.showErrorsIfTimeout() || this.showErrorsIfNoFocus();
            }
        }
    }
    render() {
        this.hostElement.tabIndex = Number(this.hostElement.getAttribute('tabindex')) || 0;
        return (h("div", { key: '65536a5d26ff0ebe45920b352cdfa4e28719efeb', class: {
                'input-field': true,
                'input-horizontal': this.horizontal
            } }, h("div", { key: '1492e4f53056086c1b01d9314b368a301d36667b', class: { 'label-container': true, hidden: this.labelHidden } }, (this.hasSlottedLabel || this.label) && (h("label", { key: '6ced806dcfcbe1eb0f2a6ebcd31f4ff4a3280e58', htmlFor: this.id, part: "label" }, h("span", { key: '23bbe79e6af8b0869510bc43533e02b60fd345ac', class: "label-wrapper" }, (this.hasSlottedLabel && h("slot", { key: 'd1ccafcf2d7f49eedf400d78b678fbafabb2c158', name: "label" })) || this.label, h("div", { key: '7ee3879f60ec33a414406e040da4f93c24ccd5ea', class: "label-metadata" }, !this.required && (this.requiredMarker ?? 'optional').startsWith('optional') && (h("span", { key: '58f31ad7dc3a108f6dde1ec88c482a5a3c74fcbd', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.optional'), ")")), this.required && this.requiredMarker?.startsWith('required') && (h("span", { key: '63d78c225748e457899f55d964bcb1d2a0da851c', class: "label-optional", "aria-hidden": "true" }, "(", catI18nRegistry.t('input.required'), ")")), (this.maxLength || this.hasSlottedCounter) && (h("div", { key: 'b36623a31118624beca4d4005dbf0480e476cb53', class: "label-character-count", "aria-hidden": "true" }, this.hasSlottedCounter ? (h("slot", { name: "counter" })) : (`${this.value?.length ?? 0}/${this.maxLength}`)))))))), h("div", { key: '75d9b67e7cf19f2526e1e036de0efce6b02d2fa5', class: "input-container" }, h("div", { key: '33b2d24c18c7e4b78bcaf569787f4153237f0686', class: "input-outer-wrapper" }, h("div", { key: '50f66d6a718bc66162ce93d3f3ce75b53afd193a', class: {
                'input-wrapper': true,
                'input-round': this.round,
                'input-readonly': this.readonly,
                'input-disabled': this.disabled,
                'input-invalid': this.invalid
            }, onClick: () => this.input.focus() }, this.textPrefix && (h("span", { key: '9549568c8b7d088babf19125a063270863d545a3', class: "text-prefix", part: "prefix" }, this.textPrefix)), this.icon && !this.iconRight && (h("cat-icon", { key: 'fbd58b96277fc28e9de49ffd355471811fb16257', icon: this.icon, class: "icon-prefix", size: "l", onClick: () => this.doFocus() })), h("div", { key: '9ea5b2502d1364de65b656c064124329ace8a074', class: "input-inner-wrapper" }, h("input", { key: '80f00d9abc53fbc3cd6fa261663f6c9e940ec213', "data-test": this.testId, ...this.nativeAttributes, part: "input", ref: el => (this.input = el), id: this.id, class: {
                'has-clearable': this.clearable && !this.disabled && !this.readonly && !!this.value,
                'has-toggle-password': this.togglePassword && !this.disabled && !this.readonly && !!this.value
            }, autocomplete: this.autoComplete, disabled: this.disabled, max: this.max, maxlength: this.maxLength, min: this.min, minlength: this.minLength, name: this.name, placeholder: this.placeholder, readonly: this.readonly, required: this.required, type: this.isPasswordShown ? 'text' : this.type, value: this.value, onInput: this.onInput.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), "aria-invalid": this.invalid ? 'true' : undefined, "aria-describedby": this.hasHint ? this.id + '-hint' : undefined }), this.clearable && !this.disabled && !this.readonly && this.value && (h("cat-button", { key: 'f301a2b57d36d2005e8705e07ea59dd32e54691a', class: "clearable", icon: "$cat:input-close", "icon-only": "true", size: "s", variant: "text", "a11y-label": catI18nRegistry.t('input.clear'), onClick: this.clear.bind(this), "data-dropdown-no-close": true })), this.togglePassword && !this.disabled && !this.readonly && this.value && (h("cat-button", { key: '8a9e442e985f5654ae1a2dc4ad7e24939e2275c4', class: "toggle-password", icon: this.isPasswordShown ? '$cat:input-password-hide' : '$cat:input-password-show', "icon-only": "true", size: "s", variant: "text", "a11y-label": catI18nRegistry.t(this.isPasswordShown ? 'input.hidePassword' : 'input.showPassword'), onClick: this.doTogglePassword.bind(this) }))), this.loading && h("cat-spinner", { key: '50ef079a4d7a193d367817a0afa3db8be839b4a6', size: "m", class: "icon-loading" }), !this.invalid && this.icon && this.iconRight && (h("cat-icon", { key: '8ceedd341d85faebb2ebbb1d60b137f9e866aa05', icon: this.icon, class: "icon-suffix", size: "l", onClick: () => this.doFocus() })), this.invalid && (h("cat-icon", { key: '3be8071c0d5d25d6607fd40547d2405c4cd1b7bb', icon: "$cat:input-error", class: "icon-suffix cat-text-danger", size: "l" })), this.textSuffix && (h("span", { key: '7019774d260c7c59c33a2dc1d82c6f4fa1f45b45', class: "text-suffix", part: "suffix" }, this.textSuffix))), h("slot", { key: 'd3882acee81f3456c1d7ab86469b12deed42debe', name: "addon" })), this.hasHint && (h(CatFormHint, { key: '3dce699be6ee391d0aee55735959ed69501e52ff', id: this.id, hint: this.hint, slottedHint: this.hasSlottedHint && h("slot", { name: "hint" }), errorMap: this.errorMap })))));
    }
    get hasHint() {
        return !!this.hint || !!this.hasSlottedHint || this.invalid;
    }
    get invalid() {
        return this.errorMap === true || !!Object.keys(this.errorMap || {}).length;
    }
    onInput() {
        this.value = this.input.value;
        this.catChange.emit(this.value);
        this.showErrorsIfTimeout();
    }
    onFocus(event) {
        this.catFocus.emit(event);
    }
    onBlur(event) {
        this.catBlur.emit(event);
        if (coerceBoolean(this.errorUpdate)) {
            this.showErrors();
        }
    }
    doTogglePassword() {
        this.isPasswordShown = !this.isPasswordShown;
    }
    showErrors() {
        this.errorMap = this.errorMapSrc;
    }
    showErrorsIfTimeout() {
        const errorUpdate = coerceNumber(this.errorUpdate, null);
        if (errorUpdate !== null) {
            typeof this.errorUpdateTimeoutId === 'number' && window.clearTimeout(this.errorUpdateTimeoutId);
            this.errorUpdateTimeoutId = window.setTimeout(() => this.showErrors(), errorUpdate);
            return true;
        }
        return false;
    }
    showErrorsIfNoFocus() {
        const hasFocus = document.activeElement === this.hostElement || document.activeElement === this.input;
        if (!hasFocus) {
            this.showErrors();
        }
    }
    findSiblingInput(node) {
        if (node instanceof HTMLInputElement) {
            return node;
        }
        else if (node?.nextSibling) {
            return this.findSiblingInput(node.nextSibling);
        }
        return undefined;
    }
    static get delegatesFocus() { return true; }
    get hostElement() { return this; }
    static get watchers() { return {
        "errors": ["onErrorsChanged"]
    }; }
    static get style() { return catInputCss; }
}, [17, "cat-input", {
        "requiredMarker": [1, "required-marker"],
        "horizontal": [4],
        "autoComplete": [1, "auto-complete"],
        "clearable": [4],
        "togglePassword": [4, "toggle-password"],
        "disabled": [4],
        "loading": [4],
        "hint": [1],
        "icon": [1],
        "iconRight": [4, "icon-right"],
        "identifier": [1],
        "label": [1],
        "labelHidden": [4, "label-hidden"],
        "max": [8],
        "maxLength": [2, "max-length"],
        "min": [8],
        "minLength": [2, "min-length"],
        "name": [1],
        "placeholder": [1],
        "textPrefix": [1, "text-prefix"],
        "textSuffix": [1, "text-suffix"],
        "readonly": [4],
        "required": [4],
        "round": [4],
        "type": [1],
        "value": [1025],
        "errors": [4],
        "errorUpdate": [8, "error-update"],
        "nativeAttributes": [16],
        "testId": [1, "test-id"],
        "hasSlottedLabel": [32],
        "hasSlottedHint": [32],
        "hasSlottedCounter": [32],
        "isPasswordShown": [32],
        "errorMap": [32],
        "doFocus": [64],
        "doBlur": [64],
        "clear": [64],
        "mask": [64]
    }, undefined, {
        "errors": ["onErrorsChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["cat-input", "cat-button", "cat-icon", "cat-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "cat-input":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CatInput);
            }
            break;
        case "cat-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "cat-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "cat-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { CatInput as C, defineCustomElement as d };
//# sourceMappingURL=p-bQjey6hs.js.map

//# sourceMappingURL=p-bQjey6hs.js.map