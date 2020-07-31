// @flow

import { defaultFundraisingTarget } from '../constants';

/**
 * Strip the dollar sign out of a manually entered fundraising target (Artez
 * doesn't like it).
 */
export default (fundraisingTarget: string | number) => {
  if (
    (typeof fundraisingTarget !== 'string' &&
      typeof fundraisingTarget !== 'number') ||
    fundraisingTarget === ''
  ) {
    return defaultFundraisingTarget;
  }

  return String(fundraisingTarget).replace(/\$/g, '');
};
