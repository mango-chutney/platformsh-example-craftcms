// @flow

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

/* eslint-disable yoda, no-fallthrough */
export default (postcode: string) => {
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
};
/* eslint-enable yoda */
