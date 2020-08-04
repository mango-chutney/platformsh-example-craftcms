/*
 * regapi/getRegistrations.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

export type Arguments =
  | (number | string)
  | {|
      FirstName?: string,
      LastName?: string,
      EventID: number | string,
    |};

export type Response = Array<{|
  Email: string,
  EventID: number,
  EventName: string,
  FirstName: string,
  FundraisingAmountRaised: Array<{|
    Type: 'Total' | 'Offline' | 'Online',
    Amount: number,
  |}>,
  FundraisingGoal: number,
  LastName: string,
  LocationName: string,
  Media: Array<{|
    Description: string,
    Link: string,
    Title: string,
  |}>,
  PersonalMessage: string,
  RegistrationID: number,
  ThermometerValue: {|
    Amount: number,
    Percentage: number,
  |},
  UserDefinedFields: Array<{|
    Answer: string,
    ExportID: string,
    IsMandatory: ?boolean,
    Question: string,
    SubAnswer: ?string,
    Type: ?string,
  |}>,
|}>;

export default (
  { baseURL, fetch, headers }: Config,
  args: Arguments,
): Promise<Response> => {
  const params = typeof args === 'object' ? paramify(args) : args;
  return fetch(
    typeof args === 'object'
      ? `${baseURL}/Registrations?${params}`
      : `${baseURL}/Registrations/${params}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    },
  )
    .then(handleFetchErrors)
    .then(response => response.json());
};
