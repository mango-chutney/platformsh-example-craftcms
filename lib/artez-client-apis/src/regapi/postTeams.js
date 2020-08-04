/*
 * regapi/postTeams.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  TeamCaptainRegistrationID: number,
  TeamTypeID: number,
  LocationID: number,
  Name: string,
  Description: ?string,
  SearchConsent: boolean,
  UdfResponses: Array<{
    AnswerID: number,
    Value: string,
  }>,
  VanityUrl: ?string,
  TransactionID: number,
  WaiveFee: boolean,
};

export type Response = {
  TeamID: number,
};

export default (
  { baseURL, fetch, headers }: Config,
  team: Body,
): Promise<Response> =>
  fetch(`${baseURL}/Teams`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(team),
  })
    .then(handleFetchErrors)
    .then(response => response.json());
