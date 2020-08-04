// @flow

import { rem } from 'polished';
import * as constants from '../constants';

export default {
  radio: {
    activeBackgroundColor: constants.palette.primary,
    alertColor: constants.palette.alert,
    backgroundColor: constants.palette.lightGray,
    borderColor: constants.palette.border,
    size: rem(20),
  },
  label: {
    fontSize: rem(16),
    fontWeight: 'normal',
  },
};
