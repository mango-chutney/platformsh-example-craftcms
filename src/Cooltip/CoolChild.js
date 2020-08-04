// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

export const StyledCoolChild = styled.button.attrs({ type: 'button' })`
  background-color: ${({ theme }) => get(theme, 'coolChild.backgroundColor')};
  border: 1px solid ${({ theme }) => get(theme, 'coolChild.border')};
  color: ${({ theme }) => get(theme, 'coolChild.color')};
  flex: 1;
  font-weight: ${({ theme }) => get(theme, 'coolChild.fontWeight')};
  font-size: ${({ theme }) => get(theme, 'coolChild.fontSize')};
  margin: -1px;
  overflow: hidden;
  padding: 1rem;
  text-align: center;

  &:focus {
    z-index: 1;
  }

  &:first-child {
    border-bottom-left-radius: ${({ theme }) =>
      get(theme, 'coolChild.borderRadius')};
    border-top-left-radius: ${({ theme }) =>
      get(theme, 'coolChild.borderRadius')};
  }

  &:last-child {
    border-bottom-right-radius: ${({ theme }) =>
      get(theme, 'coolChild.borderRadius')};
    border-top-right-radius: ${({ theme }) =>
      get(theme, 'coolChild.borderRadius')};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) =>
        get(theme, 'coolChild.activeBackgroundColor')};
      border: 1px solid
        ${({ theme }) => get(theme, 'coolChild.activeBackgroundColor')};
      color: ${({ theme }) => get(theme, 'coolChild.activeColor')};
    `};
`;

StyledCoolChild.defaultProps = {
  theme: defaultTheme,
};

export type $Props = {
  children?: React.Node,
  label?: string,
};

function CoolChild(props: $Props) {
  const { children, label, ...rest } = props;

  return <StyledCoolChild {...rest}>{label}</StyledCoolChild>;
}

export default CoolChild;
