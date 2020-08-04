/*
 * regapi/putUDFs.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  RegistrationID: number,
  TeamID: number | null,
  UdfResponses: Array<{
    AnswerID: number,
    Value: string,
  }>,
};

export default (
  { baseURL, fetch, headers }: Config,
  udfs: Body,
): Promise<string> =>
  fetch(`${baseURL}/UserDefinedFields`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(udfs),
  })
    .then(handleFetchErrors)
    .then(response => response.text());
