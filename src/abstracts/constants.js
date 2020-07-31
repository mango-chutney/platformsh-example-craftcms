/*
 * abstracts/constants.js
 */
import React from 'react';

export const baseURL = `//${window.location.hostname}`;

export const eventId = 15972;

export const eventIdPrevious = 15414;

export const eventName = `World's Greatest Shave`;

export const locations = [
  {
    id: 15973,
    abbr: 'ACT',
    title: 'Australia Capital Territory',
  },
  {
    id: 15974,
    abbr: 'NSW',
    title: 'New South Wales',
  },
  {
    id: 15975,
    abbr: 'VIC',
    title: 'Victoria',
  },
  {
    id: 15976,
    abbr: 'TAS',
    title: 'Tasmania',
  },
  {
    id: 15977,
    abbr: 'SA',
    title: 'South Australia',
  },
  {
    id: 15978,
    abbr: 'NT',
    title: 'Northern Territory',
  },
  {
    id: 15979,
    abbr: 'WA',
    title: 'Western Australia',
  },
  {
    id: 15980,
    abbr: 'QLD',
    title: 'Queensland',
  },
  {
    id: 15981,
    abbr: 'INTL',
    title: 'Outside Australia',
  },
];

export const locationsPrevious = [
  {
    id: 15415,
    abbr: 'ACT',
    title: 'Australia Capital Territory',
  },
  {
    id: 15416,
    abbr: 'NSW',
    title: 'New South Wales',
  },
  {
    id: 15417,
    abbr: 'VIC',
    title: 'Victoria',
  },
  {
    id: 15418,
    abbr: 'TAS',
    title: 'Tasmania',
  },
  {
    id: 15419,
    abbr: 'SA',
    title: 'South Australia',
  },
  {
    id: 15420,
    abbr: 'NT',
    title: 'Northern Territory',
  },
  {
    id: 15421,
    abbr: 'WA',
    title: 'Western Australia',
  },
  {
    id: 15422,
    abbr: 'QLD',
    title: 'Queensland',
  },
  {
    id: 15423,
    abbr: 'INTL',
    title: 'Outside Australia',
  },
];

export const provinceAbbrevToName = {
  ACT: 'Australia Capital Territory',
  NSW: 'New South Wales',
  VIC: 'Victoria',
  TAS: 'Tasmania',
  SA: 'South Australia',
  NT: 'Northern Territory',
  WA: 'Western Australia',
  QLD: 'Queensland',
  INTL: 'Outside Australia',
};

export const googleMapsAPIURL = 'https://maps.googleapis.com';

export const googleAPIKey = 'AIzaSyAo_CCnXLF26eRJDQy1l56EtsMwa_qQt54';

export const googleURLShortenerAPIURL = `${baseURL}/urlshortener/`;

export const loader = (
  <div className="sk-three-bounce">
    <div className="sk-child sk-bounce1" />
    <div className="sk-child sk-bounce2" />
    <div className="sk-child sk-bounce3" />
  </div>
);

export const mitigatedAmount = 398901;
