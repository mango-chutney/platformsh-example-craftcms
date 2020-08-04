// @flow

// Adapted from DayPickerInput.propTypes here:
// https://github.com/gpbl/react-day-picker/blob/bb771db4da61c0d263b2deb4722bc5e8ddfacf50/src/DayPickerInput.js#L90-L123
// And TS types here:
// https://github.com/gpbl/react-day-picker/tree/3577cdfe9039b0ce1b47b2511ffb76f2c9c4308d/types

import * as React from 'react';

type $ReactDayPickerClassNames = {
  container: string,
  wrapper: string,
  interactionDisabled: string,
  navBar: string,
  navButtonPrev: string,
  navButtonNext: string,
  navButtonInteractionDisabled: string,
  month: string,
  caption: string,
  weekdays: string,
  weekdaysRow: string,
  weekday: string,
  body: string,
  week: string,
  day: string,
  today: string,
  selected: string,
  disabled: string,
  outside: string,
};

type $ReactDayPickerLocaleUtils = {
  formatDay: (day: Date, locale: string) => string,
  formatMonthTitle: (month: Date, locale: string) => string,
  formatWeekdayLong: (weekday: number, locale: string) => string,
  formatWeekdayShort: (weekday: number, locale: string) => string,
  getFirstDayOfWeek: (locale: string) => number,
  getMonths: (
    locale: string,
  ) => [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ],
};

type $ReactDayPickerCaptionElementProps = {
  date: Date,
  classNames: $ReactDayPickerClassNames,
  localeUtils: $ReactDayPickerLocaleUtils,
  locale: string,
  months: typeof undefined,
  onClick?: (e: SyntheticMouseEvent<HTMLElement>) => void,
};

type $ReactDayPickerWeekdayElementProps = {
  weekday: number,
  className: string,
  localeUtils: $ReactDayPickerLocaleUtils,
  locale: string,
};

type $ReactDayPickerNavbarElementProps = {
  className: string,
  classNames: $ReactDayPickerClassNames,
  month: Date,
  previousMonth: Date,
  nextMonth: Date,
  showPreviousButton: boolean,
  showNextButton: boolean,
  onPreviousClick(callback?: () => void): void,
  onNextClick(callback?: () => void): void,
  dir?: string,
  labels: { previousMonth: string, nextMonth: string },
  localeUtils: $ReactDayPickerLocaleUtils,
  locale: string,
};

type $ReactDayPickerRangeModifier = {
  from: Date,
  to: Date,
};
type $ReactDayPickerBeforeModifier = {
  before: Date,
};
type $ReactDayPickerAfterModifier = {
  after: Date,
};
type $ReactDayPickerBeforeAfterModifier = {
  after: Date,
  before: Date,
};
type $ReactDayPickerDaysOfWeekModifier = {
  daysOfWeek: number[],
};

type $ReactDayPickerFunctionModifier = (date: Date) => boolean;

type $ReactDayPickerModifier =
  | Date
  | $ReactDayPickerRangeModifier
  | $ReactDayPickerBeforeModifier
  | $ReactDayPickerAfterModifier
  | $ReactDayPickerBeforeAfterModifier
  | $ReactDayPickerDaysOfWeekModifier
  | $ReactDayPickerFunctionModifier;

type $ReactDayPickerModifiers = {
  today: $ReactDayPickerModifier | $ReactDayPickerModifier[],
  outside: $ReactDayPickerModifier | $ReactDayPickerModifier[],
  [other: string]:
    | $ReactDayPickerModifier
    | $ReactDayPickerModifier[]
    | typeof undefined,
};

type $ReactDayPickerDayModifiers = {
  today: boolean | typeof undefined,
  outside: boolean | typeof undefined,
  [other: string]: boolean | typeof undefined,
};

type $ReactDayPickerProps = {
  canChangeMonth?: boolean,
  captionElement?: React.ComponentType<$ReactDayPickerCaptionElementProps>,
  className?: string,
  classNames?: $ReactDayPickerClassNames,
  containerProps?: React.ElementConfig<'div'>,
  disabledDays?: $ReactDayPickerModifier | Array<$ReactDayPickerModifier>,
  enableOutsideDays?: boolean,
  firstDayOfWeek?: number,
  fixedWeeks?: boolean,
  fromMonth?: Date,
  initialMonth?: Date,
  labels?: { previousMonth: string, nextMonth: string },
  locale?: string,
  localeUtils?: $ReactDayPickerLocaleUtils,
  modifiers?: $ReactDayPickerModifiers,
  modifiersStyles?: CSSStyleDeclaration,
  month?: Date,
  months?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ],
  navbarElement?: React.ComponentType<$ReactDayPickerNavbarElementProps>,
  numberOfMonths?: number,
  onBlur?: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onCaptionClick?: (
    month: Date,
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  onDayClick?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  onDayKeyDown?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticKeyboardEvent<HTMLDivElement>,
  ) => void,
  onDayMouseEnter?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  onDayMouseLeave?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  onDayMouseDown?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  onDayMouseUp?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  onDayTouchEnd?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticTouchEvent<HTMLDivElement>,
  ) => void,
  onDayTouchStart?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticTouchEvent<HTMLDivElement>,
  ) => void,
  onFocus?: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<HTMLDivElement>) => void,
  onMonthChange?: (month: Date) => void,
  onTodayButtonClick?: (
    day: Date,
    modifiers: $ReactDayPickerDayModifiers,
    e: SyntheticMouseEvent<HTMLButtonElement>,
  ) => void,
  onWeekClick?: (
    weekNumber: number,
    days: Date[],
    e: SyntheticMouseEvent<HTMLDivElement>,
  ) => void,
  pagedNavigation?: boolean,
  renderDay?: (date: Date, modifiers: $ReactDayPickerModifiers) => React.Node,
  renderWeek?: (weekNumber: number, week: Date[]) => React.Node,
  reverseMonths?: boolean,
  selectedDays?: $ReactDayPickerModifier | Array<$ReactDayPickerModifier>,
  showWeekNumbers?: boolean,
  todayButton?: string,
  toMonth?: Date,
  weekdayElement?: React.ComponentType<$ReactDayPickerWeekdayElementProps>,
  weekdaysLong?: [string, string, string, string, string, string, string],
  weekdaysShort?: [string, string, string, string, string, string, string],
};

export type $ReactDayPickerInputProps = {
  // This is actually passed down as `format`, but if you pass a property
  // `format` to a redux-form Field it will be not be applied to the wrapped
  // component.
  //
  // Supposedly this can also be an Array of strings but I can't see anything
  // in the DatePickerInput component that supports that.
  format: string,
  dateFormat: string,

  // This is ignored in favour of InputComponent
  component?: React.Node,

  // This is ignored in favour of composing OverlayWrapperComponent and
  // OverlayComponent
  overlayComponent?: React.Node,

  classNames: $ReactDayPickerClassNames,
  clickUnselectsDay: boolean,
  dayPickerProps: $ReactDayPickerProps,
  formatDate: (date: Date, format: string) => string,
  hideOnDayClick: boolean,
  inputProps: { [string]: any },
  keepFocus: boolean,
  onBlur: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onChange: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onClick: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onDayChange: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onFocus: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  onKeyUp: (e: SyntheticFocusEvent<HTMLDivElement>) => void,
  parseDate: (date: string, format: string) => ?Date,
  placeholder: string,
  showOverlay: boolean,
  value?: string | Date,
};
