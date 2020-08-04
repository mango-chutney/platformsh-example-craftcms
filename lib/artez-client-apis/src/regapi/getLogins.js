/*
 * regapi/getLogins.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

export type Response = {
  Username: string,
  ConstituentID: number,
  Registrations: Array<{ EventID: number }>,
};

export default (
  { baseURL, fetch, headers }: Config,
  username: string,
  password: ?string,
): Promise<Response> => {
  const params = paramify({ username, password });
  return fetch(`${baseURL}/Logins?${params}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.json());
};
