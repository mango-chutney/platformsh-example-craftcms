// @flow

import { rem, transparentize } from 'polished';
import * as constants from '../constants';

export default {
  input: {
    activeBorderColor: constants.palette.black,
    alertColor: constants.palette.alert,
    backgroundColor: constants.palette.lightGray,
    borderColor: constants.palette.border,
    borderRadius: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: constants.palette.black,
    fontFamily: constants.fontStack,
    fontSize: rem(14),
    fontWeight: constants.fontWeights.semibold,
    height: '2.6rem',
    padding: '0.5rem 1rem',
    placeholderColor: String(transparentize(0.2, constants.palette.darkGray)),
  },
  label: {
    alertColor: constants.palette.alert,
    color: 'inherit',
    fontSize: rem(14),
    fontWeight: constants.fontWeights.semibold,
  },
};
