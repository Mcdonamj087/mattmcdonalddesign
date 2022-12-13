export function isBrowser() {
  return typeof window !== 'undefined';
}

export function stripHtmlFromString(text: string) {
  return text.replace(/<[^>]*>?/gm, '');
}

/* eslint-disable no-useless-escape */
export function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(
    window.navigator.userAgent ||
      window.navigator.vendor ||
      (window as any).opera
  );
  return check;
}
/* eslint-enable no-useless-escape */

/**
 * Capitalize the first letter of a word
 */
export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Turn a text into title case
 */
export function titleCase(text: string) {
  const array = text.split(' ');
  const excluded = [
    'a',
    'an',
    'the',
    'for',
    'and',
    'nor',
    'but',
    'or',
    'yet',
    'so',
    'such',
    'as',
    'at',
    'around',
    'by',
    'after',
    'along',
    'for',
    'from',
    'of',
    'on',
    'to',
    'with',
    'without',
  ];
  const capsArray = array.map((w, idx, arr) => {
    const word = w.toLowerCase();
    if (excluded.includes(word)) {
      if (idx === 0 || idx === arr.length - 1) {
        return capitalize(word);
      }
      return word;
    } else {
      return capitalize(word);
    }
  });
  return capsArray.join(' ');
}

export function slugify(text: string) {
  if (typeof text !== 'string') {
    throw new Error('Must provide string type to slugify function');
  }

  return text.trim().split(' ').join('-');
}

/**
 * Remove - and . from phone numbers
 */
export function normalizePhoneNumber(phoneNumber: string) {
  if (!phoneNumber) {
    return undefined;
  }
  return phoneNumber.replace(/[-.]/g, '');
}

export function getSlicktextDateFormat(date: Date): string {
  const pad = (num: number) => (num < 10 ? '0' : '') + num;
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    ' ' +
    pad(date.getHours()) +
    ':00:00'
  );
}

export function formatDateURL(dateString: string): string {
  const date = new Date(dateString);
  const tz = 'CST';
  const YYYY = date.toLocaleString('en-US', {timeZone: tz, year: 'numeric'});
  const MM = date.toLocaleString('en-US', {timeZone: tz, month: '2-digit'});
  const DD = date.toLocaleString('en-US', {timeZone: tz, day: '2-digit'});
  return `${YYYY}/${MM}/${DD}`;
}

export class DateFormatter extends Date {
  private date: Date;
  YY: string;
  YYYY: string;
  MM: string;
  MMM: string;
  MMMM: string;
  D: string;
  DD: string;
  ddd: string;
  dddd: string;

  constructor(dateString: string) {
    super(dateString);
    this.date = new Date(dateString);
    const tz = 'CST';
    // Year
    this.YY = this.date.toLocaleString('en-US', {
      timeZone: tz,
      year: '2-digit',
    }); // e.g. 22
    this.YYYY = this.date.toLocaleString('en-US', {
      timeZone: tz,
      year: 'numeric',
    }); // e.g. 2022
    // Month
    this.MM = this.date.toLocaleString('en-US', {
      timeZone: tz,
      month: '2-digit',
    }); // e.g. 03
    this.MMM = this.date.toLocaleString('en-US', {
      timeZone: tz,
      month: 'short',
    }); // e.g. Mar
    this.MMMM = this.date.toLocaleString('en-US', {
      timeZone: tz,
      month: 'long',
    }); // e.g. March
    // Day
    this.D = this.date.toLocaleString('en-US', {timeZone: tz, day: 'numeric'}); // e.g. 7
    this.DD = this.date.toLocaleString('en-US', {timeZone: tz, day: '2-digit'}); // e.g. 07
    // Weekday
    this.ddd = this.date.toLocaleString('en-US', {
      timeZone: tz,
      weekday: 'short',
    }); // e.g. 'Sun.'
    this.dddd = this.date.toLocaleString('en-US', {
      timeZone: tz,
      weekday: 'long',
    }); // e.g. 'Sunday'
  }

  getDaysOld() {
    const past = this.date.getTime();
    const today = new Date().getTime();
    return (today - past) / 1000 / 60 / 60 / 24;
  }

  isThisYear(compareDate: string) {
    const currentYear = new Date().getFullYear();
    const startOfCurrentYear = new Date(currentYear, 0, 1).getTime();
    const date = new Date(compareDate).getTime();
    return startOfCurrentYear - date > 0 ? false : true;
  }
}

/**
 * A function that generates the search portion of a URL
 * given an object set of parameter names and values
 *
 * @param paramObj an object whose key/value pairs are the parameter name / parameter value
 * @returns an encoded string to use as the search portion of a URL
 */
export function generateURLSearchFragment(
  paramObj: Record<string, string>,
  encoded = false
): string {
  // console.log(Object.entries(paramObj).filter(([key, val]) => !!val));
  const paramArray = Object.entries(paramObj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, val]) => !!val)
    .map(([key, val], i) => {
      return `${i === 0 ? '?' : '&'}${key}=${encoded ? encodeURI(val) : val}`;
    });

  return paramArray.join('');
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
export function hexToRGB(hex: string) {
  let r: string | number = 0,
    g: string | number = 0,
    b: string | number = 0;

  // 3 digits
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];

    // 6 digits
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  return {r, g, b};
}

export const isEmptyObj = (obj: object | undefined | null) => {
  return !!obj ? Object.keys(obj).length === 0 : null;
};
