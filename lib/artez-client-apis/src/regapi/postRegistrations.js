/*
 * regapi/postRegistrations.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  Username: string,
  ConstituentID: number,
  Password: string,
  LocationID: number,
  RegistrationTypeID: number,
  TeamID: number | null,
  CorporateTeamId: number | null,
  SearchConsent: boolean,
  ScoreboardConsent: boolean,
  UdfResponses: ?Array<{
    AnswerID: number,
    Value: string,
  }>,
  VanityURL: ?string,
  WaiveRegistrationFee: ?boolean,
  TransactionID: number,
};

export type Response =
  | {
      RegistrationID: number,
    }
  | Array<string>
  | { Message: string };

export default (
  { baseURL, fetch, headers }: Config,
  registrant: Body,
): Promise<Response> =>
  fetch(`${baseURL}/Registrations`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(registrant),
  })
    .then(handleFetchErrors)
    .then(response => response.json());
