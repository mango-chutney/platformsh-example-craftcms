/*
 * regapi/getVanityURL.js
 *
 * @flow
 */

import paramify from '../paramify';
import type { Config } from '../config';

export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  vanityURLSlug: string,
): Promise<Response> => {
  const params = paramify({ vanityurl: vanityURLSlug });
  return fetch(`${baseURL}/VanityUrl?${params}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(response => response.text())
    .then(
      response =>
        response === ''
          ? Promise.resolve(vanityURLSlug)
          : Promise.reject(new Error('Vanity URL is already taken.')),
    );
};
