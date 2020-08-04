/*
 * regapi/getConstituents.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';
import type { Body } from './postConstituents';

export type Response = Body;

export default (
  { baseURL, fetch, headers }: Config,
  constituentId: number | string,
): Promise<Response> => {
  const params = paramify({ ConstituentID: constituentId });
  return fetch(`${baseURL}/Constituents?${params}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.json());
};
