/*
 * regapi/putTransactions.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export default (
  { baseURL, fetch, headers }: Config,
  transactionId: number | string,
): Promise<Response> =>
  fetch(`${baseURL}/Transactions/${transactionId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ TransactionID: transactionId, Status: 'Succeeded' }),
  }).then(handleFetchErrors);
