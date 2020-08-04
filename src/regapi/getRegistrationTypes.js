/*
 * regapi/getRegistrationTypes.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

export type Response = Array<{
  Description: string,
  FeeAmount: number,
  IsAvailableForCreatingTeam: boolean,
  IsAvailableForIndividualRegistration: boolean,
  IsAvailableForJoiningTeam: boolean,
  MinimumSelfSponsorAmount: number,
  Name: string,
  RegistrationTypeID: number,
  WaiveAmount: number,
}>;

export default (
  { baseURL, fetch, headers }: Config,
  locationId: number | string,
): Promise<Response> => {
  const params = paramify({ LocationID: locationId });
  return fetch(`${baseURL}/RegistrationTypes?${params}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.json());
};
