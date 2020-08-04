/*
 * regapi/getCorporateTeams.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

export type Response = Array<{
  CorporateTeamCaptainFirstName: string,
  CorporateTeamCaptainLastName: string,
  CorporateTeamID: number,
  CorporateTeamName: string,
  Locations: Array<{
    LocationID: number,
    Name: string,
  }>,
}>;

export default (
  { baseURL, fetch, headers }: Config,
  eventId: number | string,
): Promise<Response> => {
  const params = paramify({ EventID: eventId });
  return fetch(`${baseURL}/CorporateTeams?${params}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.json());
};
