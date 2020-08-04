/*
 * webgetservice/getMessageBoard.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';
import paramify from '../paramify';

export type Arguments = {|
  teamID: number | string,
  registrantID: number | string,
  personID: number | string,
|};

/**
 * <?xml version="1.0" encoding="utf-8"?>
 * <root>
 *   <message_collection>
 *     <message>
 *       <msgID>1046421</msgID>
 *       <msgName>Jane Appleseed</msgName>
 *       <msgText>Good luck</msgText>
 *       <msgDate>02/08/2018</msgDate>
 *       <msgTime>17:53:37</msgTime>
 *       <msgDisplay>y</msgDisplay>
 *       <EnteredDateTime>2018-08-02T17:53:37.473+00:00</EnteredDateTime>
 *       <localNow>2018-08-07T14:08:43.287+00:00</localNow>
 *     </message>
 *   </message_collection>
 * </root>
 */
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  args: Arguments,
): Promise<Response> => {
  const params = paramify(args);

  return fetch(`${baseURL}/get.asmx/getMessageBoard?${params}`, {
    headers: {
      Accept: 'text/xml; charset=utf-8',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
