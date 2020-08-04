// @flow

import styled, { css } from 'styled-components';
import classNames from 'classnames';
import get from 'lodash/get';
import { darken } from 'polished';
import defaultTheme from './styles';

const InputDecoratorComponent = styled.div.attrs({
  className: ({ className }) => classNames('input-decorator', className),
})`
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-block;
  line-height: ${({ theme }) => get(theme, 'radio.size')};
  min-height: ${({ theme }) => get(theme, 'radio.size')};
  position: relative;

  &::before {
    border-radius: 50%;
    box-sizing: border-box;
    content: '';
    cursor: pointer;
    display: inline-block;
    height: ${({ theme }) => get(theme, 'radio.size')};
    vertical-align: middle;
    width: ${({ theme }) => get(theme, 'radio.size')};
  }

  &::before {
    border: 1px solid ${({ theme }) => get(theme, 'radio.borderColor')};
    background: ${({ theme }) => get(theme, 'radio.backgroundColor')};

    ${({ meta }) =>
      meta &&
      meta.error &&
      meta.touched &&
      css`
        border-color: ${({ theme }) => get(theme, 'radio.alertColor')};
      `};

    ${({ disabled }) =>
      disabled &&
      css`
        background-color: ${({ theme }) =>
          darken(0.05, get(theme, 'radio.backgroundColor'))};
        cursor: not-allowed;
      `};
  }
`;

InputDecoratorComponent.defaultProps = {
  theme: defaultTheme,
};

export default InputDecoratorComponent;
