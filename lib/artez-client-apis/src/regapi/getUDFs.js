/*
 * regapi/getUDFs.js
 *
 * @flow
 */

import first from 'lodash/first';
import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

export type Arguments =
  | {|
      +RegistrationID: number | string,
    |}
  | {|
      +TeamID: number | string,
    |}
  | {|
      +EventID: number | string,
    |};

export type Response = Array<{
  QuestionID: number,
  Type: string,
  Text: string,
  Forms: Array<string>,
  Answers: Array<{
    AnswerID: number,
    Text: string,
  }>,
}>;

export default (
  { baseURL, fetch, headers }: Config,
  args: Arguments,
): Promise<Response> => {
  const params = paramify(args);
  return fetch(`${baseURL}/UserDefinedFields?${params}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.json())
    .then(
      response => (Array.isArray(first(response)) ? first(response) : response),
    );
};
