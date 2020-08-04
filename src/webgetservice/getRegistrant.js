/*
 * webgetservice/getRegistrant.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';
import paramify from '../paramify';

/**
 * <?xml version="1.0" encoding="utf-8"?>
 * <root>
 *   <registrant_collection>
 *      <registrantDetails>
 *        <firstName>Jane</firstName>
 *        <lastName>Appleseed</lastName>
 *        <participantLink>http://my.leukaemiafoundation.org.au/janeappleseed1</participantLink>
 *        <RegistrationDate>2018-06-20T15:42:44.947+00:00</RegistrationDate>
 *      </registrantDetails>
 *      <addressInfo>
 *        <address1 />
 *        <address2 />
 *        <address3 />
 *        <address4 />
 *        <city>ST MORRIS</city>
 *        <stateProvince>SA</stateProvince>
 *        <postal />
 *        <country>AU</country>
 *        <email />
 *      </addressInfo>
 *      <fundraisingInfo>
 *        <totalRaised>2.0000</totalRaised>
 *        <totalSponsors>1</totalSponsors>
 *        <fundraisingGoal>8000.0000</fundraisingGoal>
 *      </fundraisingInfo>
 *      <privacyInfo>
 *        <displayOptin>1</displayOptin>
 *        <emailOptin>1</emailOptin>
 *      </privacyInfo>
 *   </registrant_collection>
 * </root>
 */
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  registrantId: number | string,
): Promise<Response> => {
  const params = paramify({
    source: '',
    uniqueID: '',
    registrantID: registrantId,
  });

  return fetch(`${baseURL}/get.asmx/getRegistrant?${params}`, {
    headers: {
      Accept: 'text/xml; charset=utf-8',
      ...headers,
    },
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
