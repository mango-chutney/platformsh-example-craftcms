// @flow

import styled, { css } from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

const CoolChildrenWrapperComponent = styled.div`
  border-radius: 4px;
  display: flex;
  flex-flow: row nowrap;
  padding: 1px;

  ${({ theme }) => css`
    @media (max-width: ${get(theme, 'breakpointForTinyMode')}) {
      display: none;
    }
  `};
`;

CoolChildrenWrapperComponent.defaultProps = {
  theme: defaultTheme,
};

export default CoolChildrenWrapperComponent;
