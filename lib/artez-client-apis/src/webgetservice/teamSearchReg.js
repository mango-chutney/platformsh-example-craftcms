/*
 * webgetservice/teamSearchReg.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

// This returns a dumb kinda-JSON-kinda-not thing wrapped in XML.  Example:
// "<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>
// <string xmlns=\\"http://tempuri.org/\\">{teams: {columns:['TeamName','CaptainName','TeamID','TeamTypeID','CorporateID','FirstName','LastName','MemberCount','MaximumMembers','MaximumReached']}}</string>"
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  eventId: number | string,
  teamName?: string = '',
  captainFirstName?: string = '',
  captainLastName?: string = '',
  eventLocationId?: number = 0,
  eventLocationStartTimeID?: number = 0,
): Promise<Response> => {
  const params = paramify({
    eventID: eventId,
    teamName,
    captainFirstName,
    captainLastName,
    eventLocationId,
    eventLocationStartTimeID,
  });
  return fetch(`${baseURL}/get.asmx/teamSearchReg?${params}`, {
    method: 'GET',
    headers: { Accept: 'text/xml; charset=utf-8', ...headers },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
