/*
 * webgetservice/mobileParticipant.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

export type Arguments = {
  username: string,
  password: string,
  eventId: string | number,
};

// This returns a dumb kinda-JSON-kinda-not thing wrapped in XML.
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  args: Arguments,
): Promise<Response> => {
  const params = paramify({
    ...args,
    languageCode: 'en-CA',
  });
  return fetch(`${baseURL}/mobile.asmx/mobileParticipant?${params}`, {
    headers: { Accept: 'text/xml; charset=utf-8', ...headers },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
