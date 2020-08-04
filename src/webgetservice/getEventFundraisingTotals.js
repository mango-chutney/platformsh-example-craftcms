/*
 * webgetservice/getEventFundraisingTotals.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';
import paramify from '../paramify';

export type Arguments = {|
  eventID: string | number,
  loginOrgID: string,
  locationExportID: string,
  source: string,
|};

/**
 * <?xml version="1.0" encoding="utf-8"?>
 * <root>
 *   <eventFundraisingTotals_collection>
 *     <eventFundraisingTotals>
 *       <eventVerifiedTotalCollected>2.0000</eventVerifiedTotalCollected>
 *       <eventVerifiedTotalSponsors>2</eventVerifiedTotalSponsors>
 *       <eventUnVerifiedTotalCollected>0.0000</eventUnVerifiedTotalCollected>
 *       <eventUnVerifiedTotalSponsors>0</eventUnVerifiedTotalSponsors>
 *       <eventVerifiedFundraisingGoal>1000000.0000</eventVerifiedFundraisingGoal>
 *       <eventUnVerifiedFundraisingGoal>0.0000</eventUnVerifiedFundraisingGoal>
 *       <statusMessage>Successful query.</statusMessage>
 *       <status>Success</status>
 *       <eventid>279293</eventid>
 *       <location/>
 *     </eventFundraisingTotals>
 *   </eventFundraisingTotals_collection>
 * </root>
 */

export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  args: Arguments,
): Promise<Response> => {
  const params = paramify({
    locationExportID: '',
    source: '',
    ...args,
  });
  return fetch(`${baseURL}/get.asmx/getEventFundraisingTotals?${params}`, {
    headers: {
      Accept: 'text/xml; charset=utf-8',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
