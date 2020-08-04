// @flow

import styled, { css } from 'styled-components';
import { darken } from 'polished';
import get from 'lodash/get';
import defaultTheme from './styles';

const InputComponent = styled.input`
  appearance: none;
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-color: ${({ theme }) => theme.input.borderColor};
  border-radius: ${({ theme }) => theme.input.borderRadius};
  border-style: ${({ theme }) => theme.input.borderStyle};
  border-width: ${({ theme }) => theme.input.borderWidth};
  color: ${({ theme }) => theme.input.color};
  display: block;
  font-family: ${({ theme }) => theme.input.fontFamily};
  height: ${({ theme }) => theme.input.height};
  margin-bottom: 1rem;
  outline: 0;
  padding: ${({ theme }) => theme.input.padding};
  transition: border-color 300ms ease;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => get(theme, 'input.placeholderColor')};
  }

  :active,
  :focus {
    border-color: ${({ theme }) => theme.input.activeBorderColor};
  }

  ${({ meta: { error, touched } }) =>
    error &&
    touched &&
    css`
      border-color: ${({ theme }) => theme.input.alertColor};

      ::placeholder {
        color: ${({ theme }) => theme.input.alertColor};
      }
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) =>
        darken(0.05, theme.input.backgroundColor)};
      color: ${({ theme }) => darken(0.05, theme.input.color)};
      cursor: not-allowed;

      ::placeholder {
        color: ${({ theme }) =>
          darken(0.05, get(theme, 'input.placeholderColor'))};
      }
    `};
`;

InputComponent.defaultProps = {
  theme: defaultTheme,
};

export default InputComponent;
