/*
 * paramify.js
 *
 * @flow
 */

export default function(params: Object): string {
  return Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(
      key =>
        params[key] === undefined
          ? ''
          : `${key}=${encodeURIComponent(params[key])}`,
    )
    .join('&');
}
