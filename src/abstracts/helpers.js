/*
 * base/helpers.js
 */

export const paramify = params =>
  Object.keys(params)
    .map(key =>
      params[key] === undefined
        ? ''
        : `${key}=${window.encodeURIComponent(params[key])}`,
    )
    .join('&');

/**
 * Turn an object with a properties into an a google maps ready string
 */
export const sanitizeGoogleMapsAddress = addressComponents =>
  addressComponents
    .filter(addressComponent => addressComponent !== '')
    .map(addressComponent => String(addressComponent).replace(/\s/g, '+'))
    .join(',+');

/**
 * Turn an object with a properties into an object with object properties with a
 * value. Artez likes this schema for some stuff.
 *
 * @example
 * > valueify({ PersonalMessage: 'kek' })
 * { PersonalMessage: { Value: 'kek' } }
 */
export function valueify(obj) {
  return Object.keys(obj).reduce(
    (prev, next) => ({
      ...prev,
      [next]: { Value: obj[next] },
    }),
    {},
  );
}

export const toRadians = degrees => (degrees * Math.PI) / 180;

export const toDegrees = radians => (radians * 180) / Math.PI;

export const ordinal = n => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};

export const mapDeserialize = (map, separator = '&') =>
  map
    .split(separator)
    .map(element => element.split('='))
    .reduce((prev, next) => ({ ...prev, [next[0]]: next[1] }), {});

/**
 * Useful regular expressions
 */
export const regex = {
  email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/, // eslint-disable-line no-useless-escape,max-len
  currency: /^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/,
};

/**
 * Useful patterns (for input elements)
 */
export const pattern = {
  DOLLARS: '[\\$\\.0-9]*',
  NUMBERS: '[0-9]*',
  NUMBERS_AND_SPACES: '[0-9 ]*',
};

/**
 * @example
 * > properCase('test-post-please-ignore')
 * 'Test Post Please Ignore'
 *
 * @param {string} str The thing to work on.
 * @param {string} [delimiter='-'] Delimiter to split at.
 * @return {string}
 */
export const properCase = (str, delimiter = '-') =>
  str
    .split(delimiter)
    .map(substr => {
      const strsub = substr.split('');
      strsub[0] = substr.charAt(0).toUpperCase();
      return strsub.join('');
    })
    .join(' ');

/**
 * Remove all whitespace from a string.
 */
export const stripWhitespace = string => String(string).replace(/\s/g, '');

const states = {
  ACT: 'ACT',
  NSW: 'NSW',
  NT: 'NT',
  QLD: 'QLD',
  SA: 'SA',
  TAS: 'TAS',
  VIC: 'VIC',
  WA: 'WA',
};

/**
 * Try to guess an Australian province code from a postcode.
 *
 * @param {String} postcode (duh)
 * @return {String} The province code.
 */
export function guessProvinceCodeFromPostcode(postcode) {
  /* eslint-disable yoda, no-fallthrough */
  switch (postcode.charAt(0)) {
    case '0': {
      if ('0200' <= postcode && postcode <= '0299') {
        return states.ACT;
      }
      if ('0800' <= postcode && postcode <= '0899') {
        return states.NT;
      }
      if ('0900' <= postcode && postcode <= '0999') {
        return states.NT;
      }
    }

    case '1': {
      if ('1000' <= postcode && postcode <= '1999') {
        return states.NSW;
      }
    }

    case '2': {
      if ('2000' <= postcode && postcode <= '2599') {
        return states.NSW;
      }
      if ('2600' <= postcode && postcode <= '2619') {
        return states.ACT;
      }
      if ('2620' <= postcode && postcode <= '2899') {
        return states.NSW;
      }
      if ('2900' <= postcode && postcode <= '2920') {
        return states.ACT;
      }
      if ('2921' <= postcode && postcode <= '2920') {
        return states.NSW;
      }
    }

    case '3': {
      if ('3000' <= postcode && postcode <= '3999') {
        return states.VIC;
      }
    }

    case '4': {
      if ('4000' <= postcode && postcode <= '4999') {
        return states.QLD;
      }
    }

    case '5': {
      if ('5000' <= postcode && postcode <= '5799') {
        return states.SA;
      }
      if ('5800' <= postcode && postcode <= '5999') {
        return states.SA;
      }
    }

    case '6': {
      if ('6000' <= postcode && postcode <= '6797') {
        return states.WA;
      }
      if ('6800' <= postcode && postcode <= '6999') {
        return states.WA;
      }
    }

    case '7': {
      if ('7000' <= postcode && postcode <= '7799') {
        return states.TAS;
      }
      if ('7800' <= postcode && postcode <= '7999') {
        return states.TAS;
      }
    }

    case '8': {
      if ('8000' <= postcode && postcode <= '8999') {
        return states.VIC;
      }
    }

    case '9': {
      if ('9000' <= postcode && postcode <= '9999') {
        return states.QLD;
      }
    }

    default: {
      return 'Outside Australia';
    }
  }
}
/* eslint-enable yoda */

/**
 * Calculate distance between two latitude longitude coordinates
 */
/* eslint-disable no-mixed-operators */
export function distanceFromLatLon(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a));
}
/* eslint-enable no-mixed-operators */

/**
 * @param {string} search A string like `window.location.search`.
 * @return {object}
 */
export function tokenizeSearchParameters(search) {
  return search
    .slice(1, window.location.search.length)
    .split('&')
    .reduce((prev, next) => {
      const parts = next.split('=');
      if (parts.length === 2) {
        const key = decodeURIComponent(parts[0]);
        const value = decodeURIComponent(parts[1]);
        return { ...prev, [key]: value };
      }
      return prev;
    }, {});
}
