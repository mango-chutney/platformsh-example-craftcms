// @flow

import styled, { css } from 'styled-components';
import classNames from 'classnames';
import get from 'lodash/get';
import { darken } from 'polished';
import { palette } from '../constants';
import defaultTheme from './styles';

const InputDecoratorComponent = styled.div.attrs({
  className: ({ className }) => classNames('input-decorator', className),
})`
  border: 1px solid transparent;
  cursor: pointer;
  display: block;
  display: inline-block;
  line-height: ${({ theme }) => get(theme, 'checkbox.size')};
  min-height: ${({ theme }) => get(theme, 'checkbox.size')};
  position: relative;

  &::before,
  &::after {
    border-radius: 4px;
    content: '';
    cursor: pointer;
    display: inline-block;
    height: ${({ theme }) => get(theme, 'checkbox.size')};
    vertical-align: middle;
    width: ${({ theme }) => get(theme, 'checkbox.size')};
  }

  &::before {
    background: ${({ theme }) => get(theme, 'checkbox.backgroundColor')};
    border: 1px solid ${({ theme }) => get(theme, 'checkbox.borderColor')};
    margin-right: 1rem;

    ${({ meta: { error, touched } }) =>
      error &&
      touched &&
      css`
        border-color: ${palette.alert};
      `};

    ${({ disabled }) =>
      disabled &&
      css`
        background-color: ${({ theme }) =>
          darken(0.05, get(theme, 'checkbox.backgroundColor'))};
        cursor: not-allowed;
      `};
  }

  &::after {
    border: 1px solid transparent;
    left: 0;
    line-height: ${({ theme }) => get(theme, 'checkbox.size')};
    margin-top: 5%;
    position: absolute;
    text-align: center;
    transform: scale(0);
  }
`;

InputDecoratorComponent.defaultProps = {
  theme: defaultTheme,
};

export default InputDecoratorComponent;
