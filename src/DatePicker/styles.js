// @flow

import { rem } from 'polished';
import * as constants from '../constants';
import { defaultTheme as inputDefaultTheme } from '../Input';

export default {
  ...inputDefaultTheme,
  datePicker: {
    captionFontSize: rem(20),
    color: constants.palette.darkGray,
    disabledColor: constants.palette.lightGray,
    fontSize: rem(14),
    fontWeight: constants.fontWeights.semibold,
    navButtonColor: constants.palette.darkGray,
    outsideColor: constants.palette.mediumGray,
    overlayBackgroundColor: constants.palette.white,
    selectedColor: constants.palette.primary,
    selectedFontWeight: constants.fontWeights.bold,
    todayButtonFontSize: rem(8),
    todayColor: constants.palette.black,
    todayFontWeight: constants.fontWeights.bold,
    weekDayColor: constants.palette.darkGray,
    weekDayFontSize: rem(14),
    weekNumberBorderColor: constants.palette.lightGray,
    weekNumberColor: constants.palette.darkGray,
    weekNumberFontSize: rem(8),
  },
};
