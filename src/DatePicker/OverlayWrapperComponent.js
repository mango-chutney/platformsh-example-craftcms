// @flow

import styled from 'styled-components';
import defaultTheme from './styles';

const OverlayWrapperComponent = styled.div`
  position: relative;
`;

OverlayWrapperComponent.defaultProps = {
  theme: defaultTheme,
};

export default OverlayWrapperComponent;
