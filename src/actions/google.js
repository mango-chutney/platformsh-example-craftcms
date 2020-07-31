/*
 * actions/google.js
 */

import fetch from 'unfetch';
import {
  googleAPIKey,
  googleMapsAPIURL,
  googleURLShortenerAPIURL,
} from '../abstracts/constants';
import { paramify } from '../abstracts/helpers';

export const REQUEST_GEOCODE_DATA = 'REQUEST_GEOCODE_DATA';
export const RECEIVE_GEOCODE_DATA = 'RECEIVE_GEOCODE_DATA';
export const REJECT_GEOCODE_DATA = 'REJECT_GEOCODE_DATA';

export function makeGeocodingRequest(address) {
  return fetch(
    `${googleMapsAPIURL}/maps/api/geocode/json?` +
      `${paramify({ address, key: googleAPIKey, region: 'AU' })}`,
  ).then(response => response.json());
}

export function getGeocodingData(address) {
  return dispatch => {
    dispatch({ type: REQUEST_GEOCODE_DATA });

    return makeGeocodingRequest(address)
      .then(response =>
        dispatch({
          type: RECEIVE_GEOCODE_DATA,
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
        }),
      )
      .catch(() =>
        dispatch({
          type: REJECT_GEOCODE_DATA,
        }),
      );
  };
}

export function createStaticMapURL(address) {
  const parameters = {
    center: address,
    zoom: 14,
    size: '300x300',
    maptype: 'roadmap',
    format: 'png',
    scale: 2,
    markers: `size:mid|color:0xff0000|label:%7C|${address}`,
    key: googleAPIKey,
  };

  return `${googleMapsAPIURL}/maps/api/staticmap?${paramify(parameters)}`;
}

export function shorternURL(url) {
  return fetch(googleURLShortenerAPIURL, {
    method: 'POST',
    body: JSON.stringify({ longUrl: url }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}
