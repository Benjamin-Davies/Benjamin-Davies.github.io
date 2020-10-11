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
