// @flow

import styled, { css } from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

const SelectWrapperComponent = styled.div`
  display: none;

  ${({ theme }) =>
    css`
      @media (max-width: ${get(theme, 'breakpointForTinyMode')}) {
        display: block;
      }
    `};
`;

SelectWrapperComponent.defaultProps = {
  theme: defaultTheme,
};

export default SelectWrapperComponent;
