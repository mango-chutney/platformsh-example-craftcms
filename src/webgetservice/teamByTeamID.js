/*
 * webgetservice/teamByTeamID.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

// This returns a dumb kinda-JSON-kinda-not thing wrapped in XML.  Example:
// "<?xml version=\\"1.0\\" encoding=\\"utf-8\\"?>
// <string xmlns=\\"http://tempuri.org/\\">{teamName:'Mango Chutney',teamTypeID:'7018',teamStartTimeID:'0',teamLocationID:'48596',maximumMembers:'999999999',memberCount:'3'}</string>"
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  teamId: number | string,
): Promise<Response> => {
  const params = paramify({ teamID: teamId });
  return fetch(`${baseURL}/get.asmx/teamByTeamID?${params}`, {
    method: 'GET',
    headers: { Accept: 'text/xml; charset=utf-8', ...headers },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
