/*
 * regapi/postConstituent.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body = {
  OrganizationName: ?string,
  FirstName: string,
  LastName: string,
  EmailAddress: string,
  PhoneNumber: string,
  LanguagePreference: 'en-CA' | 'fr-CA',
  Address: {
    AddressLine1: string,
    AddressLine2: ?string,
    Apartment: ?string,
    City: ?string,
    ProvinceCode: string,
    CountryCode: string,
    PostalCode: string,
    ProvinceFreeText: ?string,
  },
  IsOrganization: boolean,
  AllowContactViaPost: boolean,
  AllowContactViaEmail: boolean,
  TitleID: ?number,
};

export type Response = {
  ConstituentID: number,
};

export default (
  { baseURL, fetch, headers }: Config,
  constituent: Body,
): Promise<Response> =>
  fetch(`${baseURL}/Constituents`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(constituent),
  })
    .then(handleFetchErrors)
    .then(response => response.json());
