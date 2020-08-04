// @flow

import styled from 'styled-components';
import defaultTheme from './styles';

const CooltipWrapperComponent = styled.div`
  position: relative;
`;

CooltipWrapperComponent.defaultProps = {
  theme: defaultTheme,
};

export default CooltipWrapperComponent;
