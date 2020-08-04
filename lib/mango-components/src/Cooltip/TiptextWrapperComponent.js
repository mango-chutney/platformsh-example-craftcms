// @flow

import styled, { css } from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

const TiptextWrapperComponent = styled.div`
  position: relative;
  padding: 1rem 1.5rem 0;

  ${({ theme }) =>
    css`
      @media (max-width: ${get(theme, 'breakpointForTinyMode')}) {
        padding: 1rem 1rem 0;
      }
    `};
`;

TiptextWrapperComponent.defaultProps = {
  theme: defaultTheme,
};

export default TiptextWrapperComponent;
