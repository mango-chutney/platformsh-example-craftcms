/*
 * webgetservice/getTeamScoreBoard.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';
import paramify from '../paramify';

export type Arguments = {|
  eventID: string | number,
  externalAnswerID: string | number,
  externalQuestionID: string | number,
  listItemCount: string | number,
  sortBy: string,
|};

/**
 * <?xml version="1.0" encoding="utf-8"?>
 * <root>
 *    <TeamScoreBoard_collection>
 *      <TeamScoreBoard>
 *        <OnlineTotalCollected>44086.2500</OnlineTotalCollected>
 *        <OfflineTotalCollected>60.0000</OfflineTotalCollected>
 *        <OnlineTotalCount>937</OnlineTotalCount>
 *        <OfflineTotalCount>1</OfflineTotalCount>
 *        <TeamMembersCount>111</TeamMembersCount>
 *        <sortKeyPrimary>44086.2500</sortKeyPrimary>
 *        <sortKeySecondary>60.0000</sortKeySecondary>
 *        <IsAnonymous>n</IsAnonymous>
 *        <TeamID>113847</TeamID>
 *        <TeamName>Engadine High School</TeamName>
 *        <CaptainFirstName>Michael</CaptainFirstName>
 *        <CaptainLastName>Heron</CaptainLastName>
 *        <CurrencyID>AUD</CurrencyID>
 *        <LocationName>New South Wales</LocationName>
 *        <FacebookID/>
 *        <OnlineGoal>1000.0000</OnlineGoal>
 *        <OfflineGoal>0.0000</OfflineGoal>
 *      </TeamScoreBoard>
 *      <TeamScoreBoard>
 *        <OnlineTotalCollected>40342.0900</OnlineTotalCollected>
 *        <OfflineTotalCollected>100.0000</OfflineTotalCollected>
 *        <OnlineTotalCount>762</OnlineTotalCount>
 *        <OfflineTotalCount>1</OfflineTotalCount>
 *        <TeamMembersCount>93</TeamMembersCount>
 *        <sortKeyPrimary>40342.0900</sortKeyPrimary>
 *        <sortKeySecondary>100.0000</sortKeySecondary>
 *        <IsAnonymous>n</IsAnonymous>
 *        <TeamID>113746</TeamID>
 *        <TeamName>Wesley College Perth</TeamName>
 *        <CaptainFirstName>Lynette</CaptainFirstName>
 *        <CaptainLastName>McGivern</CaptainLastName>
 *        <CurrencyID>AUD</CurrencyID>
 *        <LocationName>Western Australia</LocationName>
 *        <FacebookID/>
 *        <OnlineGoal>560.0000</OnlineGoal>
 *        <OfflineGoal>0.0000</OfflineGoal>
 *      </TeamScoreBoard>
 *      ...
 *    </TeamScoreBoard_collection>
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
  return fetch(`${baseURL}/get.asmx/getTeamScoreBoard?${params}`, {
    headers: {
      Accept: 'text/xml; charset=utf-8',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
