// @flow

import * as React from 'react';
import { Input, InputComponent, InputLabelComponent } from 'mango-components';
import styled, { css } from 'styled-components';
import { rem, darken } from 'polished';
import * as styles from '../styles';
import { Tootlip } from '.';

export const disabledBackgroundCss = css`
  ${({ disabled }) =>
    disabled &&
    css`
      :-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px
          ${darken(0.05, styles.input.backgroundColor)} inset;
      }
    `};
`;

export const StyledInputLabelComponent = styled(InputLabelComponent)`
  margin-bottom: 0.25rem;
`;

export const StyledInputComponent = styled(InputComponent)`
  ::placeholder {
    font-weight: ${styles.fontWeight.semibold};
  }

  ${styles.media.greaterThan('medium')`
    font-size: ${rem(16)};
    height: ${rem(50)};
  `};

  ${disabledBackgroundCss};
`;

export const styledTheme = {
  input: {
    backgroundColor: styles.input.backgroundColor,
    borderColor: styles.input.borderColor,
    placeholderColor: styles.input.placeholderColor,
  },
  label: {
    color: styles.palette.darkGray,
  },
};

const StyledInput = ({
  children,
  disabled,
  meta,
  tooltipVisible,
  ...rest
}: any) => (
  <Input
    {...{
      InputComponent: StyledInputComponent,
      InputLabelComponent: StyledInputLabelComponent,
      theme: styledTheme,
      meta,
      disabled: disabled || meta.asyncValidating || meta.submitting,
      ...rest,
    }}
  >
    {children}
    <Tootlip {...{ meta }} visible={tooltipVisible} />
  </Input>
);

export default StyledInput;
