// @flow

import * as React from 'react';
import type { FieldProps as $FieldProps } from 'redux-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateTime } from 'luxon';
import { ThemeProvider } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import type { $ReactDayPickerInputProps } from './types';
import defaultTheme from './styles';

export type $Props = {
  ComposedInputComponent: React.ElementType,
  OverlayWrapperComponent: React.ElementType,
  OverlayComponent: React.ElementType,
} & React.ElementConfig<'input'> &
  $FieldProps &
  $ReactDayPickerInputProps;

class DatePickerComposer extends React.Component<$Props, void> {
  datePickerRef = React.createRef();

  static defaultProps = {
    dateFormat: 'dd/LL/yyyy',
    formatDate: (date: Date, format: string): string =>
      DateTime.fromJSDate(date).toFormat(format),
    parseDate: (date: string, format: string): ?Date => {
      const dateFromFormat = DateTime.fromFormat(date, format);

      if (dateFromFormat.isValid) {
        return dateFromFormat.toJSDate();
      }

      return undefined;
    },
  };

  handleOnDayChange = (day: Date): void => {
    const { dateFormat, formatDate, input, onDayChange } = this.props;

    if (day) {
      input.onChange(formatDate(day, dateFormat));

      if (this.datePickerRef.current) {
        this.datePickerRef.current.hideDayPicker();
      }
    }

    if (onDayChange && typeof onDayChange === 'function') {
      onDayChange(day);
    }
  };

  render() {
    const {
      ComposedInputComponent,
      OverlayWrapperComponent,
      OverlayComponent,
      classNames,
      clickUnselectsDay,
      component, // Unused, use ComposedInputComponent instead.
      dateFormat,
      dayPickerProps,
      // `format` will always be undefined when a Field child.  Use `dateFormat`
      // instead, it will get passed down as `format` to the wrapped
      // DayPickerInput component.
      format,
      formatDate,
      hideOnDayClick,
      inputProps,
      keepFocus,
      onBlur,
      onChange,
      onClick,
      onDayChange, // Will be called after this.handleOnDayChange.
      onFocus,
      onKeyUp,
      overlayComponent,
      parseDate,
      placeholder,
      showOverlay,
      value, // This will always be undefined if used as a Field child.
      input, // Passed down by redux-form when used as a Field child
      meta, // Passed down by redux-form when used as a Field child
      theme,
      ...rest // these will be applied to ComposedInputComponent.
    } = this.props;

    const ComposedOverlayComponent = ({
      children,
      ...overlayProps
    }: {
      children: React.Node,
    }) => (
      <ThemeProvider theme={defaultsDeep({ ...theme }, defaultTheme)}>
        <OverlayWrapperComponent {...overlayProps}>
          <OverlayComponent>{children}</OverlayComponent>
        </OverlayWrapperComponent>
      </ThemeProvider>
    );

    const fieldProps = {
      ...inputProps,
      ...rest,
      input,
      meta,
      // Currently this component doesn't provide a good experience if you try
      // to edit the value yourself.  Just make it read only for now, so the
      // only way to manipulate it is by using the picker.
      readOnly: true,
      autoComplete: 'off',
    };

    const composedDatePickerProps = {
      ref: this.datePickerRef,
      value, // this will always be undefined if used as a Field child
      inputProps: fieldProps,
      placeholder: placeholder || formatDate(new Date(), dateFormat),
      format: dateFormat,
      formatDate,
      parseDate,
      showOverlay,
      dayPickerProps,
      hideOnDayClick,
      clickUnselectsDay,
      keepFocus,
      component: ComposedInputComponent,
      overlayComponent: ComposedOverlayComponent,
      classNames,
      onDayChange: this.handleOnDayChange,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onKeyUp,
    };

    return <DayPickerInput {...composedDatePickerProps} />;
  }
}

export default DatePickerComposer;
