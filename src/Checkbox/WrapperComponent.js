// @flow

import styled from 'styled-components';
import defaultTheme from './styles';

const WrapperComponent = styled.div`
  margin: 1rem 0;
`;

WrapperComponent.defaultProps = {
  theme: defaultTheme,
};

export default WrapperComponent;
