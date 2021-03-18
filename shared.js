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

/**
 * @param {any[]} arr
 */
export function pickRandom(arr) {
  const i = Math.floor(arr.length * Math.random());
  return arr[i];
}

/**
 * @param {string} url
 */
export async function fetchGitHubAPI(url) {
  if (!url.startsWith('https://')) {
    url = 'https://api.github.com' + url;
  }
  const res = await fetch(url, {
    headers: {
      accept: 'application/vnd.github.v3+json',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API at ${url} failed (${res.status}): ${await res.text()}`);
  }
  return await res.json();
}

/**
 * @param {number} ms
 */
export function delay(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
