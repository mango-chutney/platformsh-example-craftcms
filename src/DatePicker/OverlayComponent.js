// @flow

import styled from 'styled-components';
import { rem } from 'polished';
import defaultTheme from './styles';

const OverlayComponent = styled.div`
  left: 0;
  z-index: 1;
  position: absolute;
  background: ${({ theme }) => theme.datePicker.overlayBackgroundColor};
  box-shadow: 0 ${rem(2)} ${rem(5)} rgba(0, 0, 0, 0.15);

  .DayPicker {
    display: inline-block;
  }

  .DayPicker-wrapper {
    position: relative;
    user-select: none;
    padding-bottom: 1rem;
    flex-direction: row;
  }

  .DayPicker-Months {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .DayPicker-Month {
    display: table;
    border-collapse: collapse;
    border-spacing: 0;
    user-select: none;
    margin: 0 1rem;
    margin-top: 1rem;
  }

  .DayPicker-NavButton {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1.5rem;
    margin-top: 2px;
    color: ${({ theme }) => theme.datePicker.navButtonColor};
    width: 1.25rem;
    height: 1.25rem;
    display: inline-block;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .DayPicker-NavButton:hover {
    opacity: 0.8;
  }

  .DayPicker-NavButton--prev {
    margin-right: 1.5rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
  }

  .DayPicker-NavButton--next {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==');
  }

  .DayPicker-NavButton--interactionDisabled {
    display: none;
  }

  .DayPicker-Caption {
    padding: 0 0.5rem;
    display: table-caption;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  .DayPicker-Caption > div {
    font-size: ${({ theme }) => theme.datePicker.captionFontSize};
    font-weight: ${({ theme }) => theme.datePicker.fontWeight};
  }

  .DayPicker-Weekdays {
    margin-top: 1rem;
    display: table-header-group;
  }

  .DayPicker-WeekdaysRow {
    display: table-row;
  }

  .DayPicker-Weekday {
    display: table-cell;
    padding: 0.5rem;
    font-size: ${({ theme }) => theme.datePicker.weekDayFontSize};
    text-align: center;
    color: ${({ theme }) => theme.datePicker.weekDayColor};
  }

  .DayPicker-Weekday abbr[title] {
    border-bottom: none;
    text-decoration: none;
  }

  .DayPicker-Body {
    display: table-row-group;
  }

  .DayPicker-Week {
    display: table-row;
  }

  .DayPicker-Day {
    display: table-cell;
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    border-radius: 50%;
  }

  .DayPicker-WeekNumber {
    display: table-cell;
    padding: 0.5rem;
    text-align: right;
    vertical-align: middle;
    min-width: 1rem;
    font-size: ${({ theme }) => theme.datePicker.weekNumberFontSize};
    cursor: pointer;
    color: ${({ theme }) => theme.datePicker.weekNumberColor};
    border-right: ${rem(1)} solid
      ${({ theme }) => theme.datePicker.weekNumberBorderColor};
  }

  .DayPicker--interactionDisabled .DayPicker-Day {
    cursor: default;
  }

  .DayPicker-Footer {
    padding-top: 0.5rem;
  }

  .DayPicker-TodayButton {
    border: none;
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
    color: ${({ theme }) => theme.datePicker.color};
    font-size: ${({ theme }) => theme.datePicker.todayButtonFontSize};
  }

  .DayPicker-Day--today {
    color: ${({ theme }) => theme.datePicker.todayColor};
    font-weight: ${({ theme }) => theme.datePicker.todayFontWeight};
  }

  .DayPicker-Day--outside {
    cursor: default;
    color: ${({ theme }) => theme.datePicker.outsideColor};
  }

  .DayPicker-Day--disabled {
    color: ${({ theme }) => theme.datePicker.disabledColor};
    cursor: default;
  }

  .DayPicker-Day--selected {
    color: ${({ theme }) => theme.datePicker.selectedColor};
    font-weight: ${({ theme }) => theme.datePicker.selectedFontWeight};
  }
`;

OverlayComponent.defaultProps = {
  theme: defaultTheme,
};

export default OverlayComponent;
