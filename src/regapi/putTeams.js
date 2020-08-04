/*
 * regapi/putTeams.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  PersonalMessage: ?{ Value: string },
  Goal: ?{ Value: number },
};

export default (
  { baseURL, fetch, headers }: Config,
  teamId: number | string,
  team: Body,
): Promise<string> =>
  fetch(`${baseURL}/Teams/${teamId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(team),
  })
    .then(handleFetchErrors)
    .then(response => response.text());
