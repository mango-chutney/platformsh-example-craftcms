// @flow

import styled from 'styled-components';
import get from 'lodash/get';
import defaultTheme from './styles';

const TiptextComponent = styled.div`
  background-color: ${({ theme }) =>
    get(theme, 'tiptext.backgroundColor') ||
    get(theme, 'coolChild.activeBackgroundColor')};
  border-radius: 4px;
  color: ${({ theme }) =>
    get(theme, 'tiptext.color') || get(theme, 'coolChild.activeColor')};
  font-size: ${({ theme }) => get(theme, 'tiptext.fontSize')};
  font-weight: ${({ theme }) => get(theme, 'tiptext.fontWeight')};
  margin-bottom: 1rem;
  padding: 1.5rem 2rem;
  position: relative;
`;

TiptextComponent.defaultProps = {
  theme: defaultTheme,
};

export default TiptextComponent;
