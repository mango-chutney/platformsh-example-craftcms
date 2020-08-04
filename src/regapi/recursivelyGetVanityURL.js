/*
 * regapi/recursivelyGetVanityURL.js
 *
 * @flow
 */

import getVanityURL from './getVanityURL';
import type { Response } from './getVanityURL';
import type { Config } from '../config';

function recursivelyGetVanityURL(
  { baseURL, fetch, headers }: Config,
  vanityURLSlug: string,
  count: ?number,
): Promise<Response> {
  const __count = count === undefined || count === null ? 0 : count;
  const __vanityURLSlug =
    count === undefined
      ? vanityURLSlug.replace(/[\W_]+/g, '')
      : `${vanityURLSlug}${__count}`.replace(/[\W_]+/g, '');
  return getVanityURL({ baseURL, fetch, headers }, __vanityURLSlug).catch(() =>
    recursivelyGetVanityURL(
      { baseURL, fetch, headers },
      vanityURLSlug,
      __count + 1,
    ),
  );
}

export default recursivelyGetVanityURL;
