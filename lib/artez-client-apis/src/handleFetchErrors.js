/*
 * handleFetchErrors.js
 *
 * @flow
 */

export default function (response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
