// @flow

import { rem } from 'polished';
import * as constants from '../constants';
import { defaultTheme as inputDefaultTheme } from '../Input';

export default {
  ...inputDefaultTheme,
  breakpointForTinyMode: '600px',
  coolChild: {
    activeBackgroundColor: constants.palette.primary,
    activeColor: constants.palette.white,
    backgroundColor: constants.palette.lightGray,
    border: constants.palette.border,
    borderRadius: '4px',
    color: constants.palette.darkGray,
    fontSize: rem(14),
    fontWeight: '600',
  },
  pipSize: '8px',
  tipText: {
    fontSize: rem(14),
    fontWeight: '500',
    backgroundColor: constants.palette.primary,
  },
};
