// @flow

import PopperJS from 'popper.js';

export default PopperJS.placements
  .map(placement => ({
    [placement]: placement,
  }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});
