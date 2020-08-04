// @flow

import styled from 'styled-components';
import { palette, globalRadius, globalBorder } from '../constants';

const PanelComponent = styled.div`
  background: ${palette.white};
  margin: 0 0 1rem;
  padding: 2rem;
  border: ${globalBorder};
  border-radius: ${globalRadius};
  overflow: hidden;

  > .panel-section {
    :last-child {
      margin-bottom: -2rem;
    }
  }
`;

export default PanelComponent;
