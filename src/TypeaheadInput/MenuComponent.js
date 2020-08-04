// @flow

import styled from 'styled-components';
import defaultTheme from './styles';

const MenuComponent = styled.div`
  background: white;
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 4;
`;

MenuComponent.defaultProps = {
  theme: defaultTheme,
};

export default MenuComponent;
