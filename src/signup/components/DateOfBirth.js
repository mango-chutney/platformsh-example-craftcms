// @flow

import * as React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { DatePicker, Column, Tootlip, Select } from '.';
import { inputDateFormat as dateFormat } from '../constants';

const currentYear = new Date().getFullYear();

const fromMonth = new Date(currentYear, 0);

const toMonth = new Date(currentYear - 100);

function YearMonth({ localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = Array.from(
    { length: 100 },
    (value, key) => fromMonth.getFullYear() - key,
  );

  const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const handleChange = event => {
    // What is this cowboy DOM access
    // $FlowFixMe
    const { dob_year: year, dob_month: month } = event.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <Wrapper>
        <Column column="2">
          <Field name="dob_month" onChange={handleChange} component={Select}>
            {months.map((month, i) => (
              <option key={month} value={i}>
                {month}
              </option>
            ))}
          </Field>
        </Column>
        <Column column="2">
          <Field name="dob_year" onChange={handleChange} component={Select}>
            {years.map((year, i) => (
              <option key={JSON.stringify(`${year}${i}`)} value={year}>
                {year}
              </option>
            ))}
          </Field>
        </Column>
      </Wrapper>
    </div>
  );
}

class DateOfBirth extends React.Component<any, { month: Date }> {
  state = {
    month: fromMonth,
  };

  handleYearMonthChange = month => {
    this.setState({ month });
  };

  render() {
    const { input, meta, column, ...rest } = this.props;

    const { month } = this.state;

    return (
      <div>
        <DatePicker
          {...{
            ...rest,
            input,
            meta,
            placeholder: 'Please Select...',
            dayPickerProps: {
              dateFormat,
              month,
              fromMonth,
              toMonth,
              modifiers: {
                disabled: {
                  after: new Date(),
                },
              },
              captionElement: ({ date, localeUtils }) => (
                <YearMonth
                  date={date}
                  localeUtils={localeUtils}
                  onChange={this.handleYearMonthChange}
                />
              ),
            },
          }}
        />
        <Tootlip {...{ meta }} />
      </div>
    );
  }
}

export default (props: any) => <DateOfBirth {...props} />;
