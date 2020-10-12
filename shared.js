export const isGithub = location.hostname.endsWith('.github.io');

/**
 * @param {string} str
 */
export function capitalize(str) {
  if (str.length < 1) {
    return;
  }
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * @param {string} str
 */
export function titleCase(str) {
  return str.split(/[\s_-]/g).map(capitalize).join(' ');
}

export function registerSW() {
  if ('serviceWorker' in navigator && isGithub) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}

/**
 * @param {number} num
 * @param {number} chars
 * @param {number} dp
 */
export function padNum(num, chars, dp = 0) {
  let str = num.toFixed(dp);
  while (str.length < chars) {
    str = `0${str}`;
  }
  return str;
}

export const months = [
  'Zero',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
