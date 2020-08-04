/*
 * regapi/postTransactions.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  ConstituentID: number,
};

export type Response = {
  TransactionID: number,
};

export default (
  { baseURL, fetch, headers }: Config,
  transaction: Body,
): Promise<Response> =>
  fetch(`${baseURL}/Transactions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(transaction),
  })
    .then(handleFetchErrors)
    .then(response => response.json());
