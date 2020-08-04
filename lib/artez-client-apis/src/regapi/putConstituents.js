/*
 * regapi/putConstituents.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import paramify from '../paramify';
import type { Config } from '../config';

// This is nearly the same as the request body for POST Constituents, but the
// address fields are flattened.
export type Body = {
  OrganizationName: ?string,
  FirstName: string,
  LastName: string,
  EmailAddress: string,
  PhoneNumber: string,
  LanguagePreference: 'en-CA' | 'fr-CA',
  AddressLine1: string,
  AddressLine2: ?string,
  Apartment: ?string,
  City: ?string,
  ProvinceCode: string,
  CountryCode: string,
  PostalCode: string,
  ProvinceFreeText: ?string,
  IsOrganization: boolean,
  AllowContactViaPost: boolean,
  AllowContactViaEmail: boolean,
  TitleID: ?number,
};

export default (
  { baseURL, fetch, headers }: Config,
  constituentId: number | string,
  constituent: Body,
): Promise<Response> => {
  const params = paramify({ ConstituentID: constituentId });
  return fetch(`${baseURL}/Constituents?${params}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(constituent),
  }).then(handleFetchErrors);
};
