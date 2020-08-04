/*
 * registrant/personalizationPost.js
 *
 * @flow
 */

import handleFetchErrors from '../handleFetchErrors';
import type { Config } from '../config';

export type Body =
  | {|
      attachedFile: any,
      corporateTeamID: number | string,
      eventID: string | number,
      itemID: string | number,
      organizationID?: string | number,
      pageType: 'registrant' | 'team',
      password?: string,
      postType: 'uploadImageItem',
      registrantID: string | number,
      teamID: number | string,
      token: string,
      username?: string,
      userType: 'registrant' | 'team',
    |}
  | {|
      corporateTeamID: number | string,
      defaultStatus: 'y' | 'n',
      eventID: string | number,
      imageID: string | number,
      itemID: string | number,
      mediaDescription: string,
      mediaPath: string,
      mediaTitle: string,
      organizationID?: string | number,
      pageType: 'registrant' | 'team',
      password?: string,
      postType: 'setImageItem',
      registrantID: string | number,
      teamID: number | string,
      thumbnailID: string | number,
      token: string,
      username?: string,
      userType: 'registrant' | 'team',
    |}
  | {|
      corporateTeamID: number | string,
      displayStatus: 'disabled' | 'enabled',
      eventID: number | string,
      itemID: number | string,
      organizationID?: string | number,
      pageType: 'registrant' | 'team',
      password?: string,
      postType: 'updateMediaItemDisplayStatus',
      registrantID: number | string,
      teamID: number | string,
      token: string,
      username?: string,
      userType: 'registrant' | 'team',
    |};

// This returns a dumb kinda-JSON-kinda-not thing wrapped in brackets.
export type Response = string;

export default (
  { baseURL, fetch, headers }: Config,
  personalization: Body,
): Promise<Response> => {
  const formData = new FormData();
  formData.append('languageCode', 'en-CA');
  formData.append('responseType', 'JSON');
  Object.keys(personalization).forEach((key: string) =>
    formData.append(key, personalization[key]),
  );

  return fetch(`${baseURL}/personalizationPost.aspx`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    body: formData,
    credentials: 'same-origin',
  })
    .then(handleFetchErrors)
    .then(response => response.text());
};
