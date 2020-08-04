// @flow

import styled from 'styled-components';
import { darken } from 'polished';
import get from 'lodash/get';
import defaultTheme from './styles';

const ItemComponent = styled.span`
  display: block;
  color: ${({ theme }) => get(theme, 'input.color')};
  border-left: ${({ theme }) => get(theme, 'input.borderWidth')}
    ${({ theme }) => get(theme, 'input.borderStyle')}
    ${({ theme }) => get(theme, 'input.activeBorderColor')};
  border-right: ${({ theme }) =>
    `${get(theme, 'input.borderWidth')} ${get(
      theme,
      'input.borderStyle',
    )} ${get(theme, 'input.activeBorderColor')}`};
  padding: 0.5rem 1rem;

  background-color: ${({ highlightedIndex, index, theme }) =>
    highlightedIndex === index
      ? darken(0.05, get(theme, 'input.backgroundColor'))
      : get(theme, 'input.backgroundColor')};

  &:last-child {
    border-bottom: ${({ theme }) =>
      `${get(theme, 'input.borderWidth')} ${get(
        theme,
        'input.borderStyle',
      )} ${get(theme, 'input.activeBorderColor')}`};
    border-bottom-right-radius: ${({ theme }) =>
      get(theme, 'input.borderRadius')};
    border-bottom-left-radius: ${({ theme }) =>
      get(theme, 'input.borderRadius')};
  }
`;

ItemComponent.defaultProps = {
  theme: defaultTheme,
};

export default ItemComponent;
