/*
 * webgetservice/getParticipantScoreBoard.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';
import paramify from '../paramify';

export type Arguments = {|
  eventID: string | number,
  sortBy: string,
  listItemCount: string | number,
  externalQuestionID: string | number,
  externalAnswerID: string | number,
|};

/**
 * <?xml version="1.0" encoding="utf-8"?>
 * <root>
 *   <ParticipantScoreBoard_collection>
 *     <ParticipantScoreBoard>
 *       <IsAnonymous>y</IsAnonymous>
 *       <RegistrationID>0</RegistrationID>
 *       <ParentEventID>0</ParentEventID>
 *       <ParticipantFirstName/>
 *       <ParticipantLastName/>
 *       <ScoreboardDisplayName/>
 *       <AllowScoreboardDisplayName>n</AllowScoreboardDisplayName>
 *       <onlineTotalCollected>104041.4100</onlineTotalCollected>
 *       <onlineTotalCount>2</onlineTotalCount>
 *       <offlineTotalCollected>0.0000</offlineTotalCollected>
 *       <offlineTotalCount>0</offlineTotalCount>
 *       <onlineGoal>200.0000</onlineGoal>
 *       <offlineGoal>0.0000</offlineGoal>
 *       <LocationName>New South Wales</LocationName>
 *       <currencyID>AUD</currencyID>
 *       <eventOnlineTotalCollected>9400367.3800</eventOnlineTotalCollected>
 *       <eventOnlineTotalCount>162827</eventOnlineTotalCount>
 *       <eventOfflineTotalCollected>44047.8100</eventOfflineTotalCollected>
 *       <eventOfflineTotalCount>944</eventOfflineTotalCount>
 *       <locationOnlineGoal>0.0000</locationOnlineGoal>
 *       <ScoreboardCount>2</ScoreboardCount>
 *       <FacebookID/>
 *     </ParticipantScoreBoard>
 *     <ParticipantScoreBoard>
 *       <IsAnonymous>y</IsAnonymous>
 *       <RegistrationID>0</RegistrationID>
 *       <ParentEventID>0</ParentEventID>
 *       <ParticipantFirstName/>
 *       <ParticipantLastName/>
 *       <ScoreboardDisplayName/>
 *       <AllowScoreboardDisplayName>n</AllowScoreboardDisplayName>
 *       <onlineTotalCollected>102030.3200</onlineTotalCollected>
 *       <onlineTotalCount>1</onlineTotalCount>
 *       <offlineTotalCollected>0.0000</offlineTotalCollected>
 *       <offlineTotalCount>0</offlineTotalCount>
 *       <onlineGoal>200.0000</onlineGoal>
 *       <offlineGoal>0.0000</offlineGoal>
 *       <LocationName>Queensland</LocationName>
 *       <currencyID>AUD</currencyID>
 *       <eventOnlineTotalCollected>9400367.3800</eventOnlineTotalCollected>
 *       <eventOnlineTotalCount>162827</eventOnlineTotalCount>
 *       <eventOfflineTotalCollected>44047.8100</eventOfflineTotalCollected>
 *       <eventOfflineTotalCount>944</eventOfflineTotalCount>
 *       <locationOnlineGoal>0.0000</locationOnlineGoal>
 *       <ScoreboardCount>2</ScoreboardCount>
 *       <FacebookID/>
 *     </ParticipantScoreBoard>
 *     ...
 *   </ParticipantScoreBoard_collection>
 * </root>
 */
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  args: Arguments,
): Promise<Response> => {
  const params = paramify({
    externalAnswerID: '',
    externalQuestionID: '',
    languageCode: 'en-CA',
    source: '',
    ...args,
  });
  return fetch(`${baseURL}/get.asmx/getParticipantScoreBoard?${params}`, {
    headers: {
      Accept: 'text/xml; charset=utf-8',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
