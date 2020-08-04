// @flow

import styled from 'styled-components';
import { darken, rem } from 'polished';
import { fontWeights, globalBorder, globalRadius, palette } from '../constants';

const PanelHeadingComponent = styled.div`
  background: ${palette.lightGray};
  background: linear-gradient(
    ${palette.lightGray} 0%,
    ${String(darken(0.04, palette.lightGray))} 100%
  );
  border-radius: ${globalRadius} ${globalRadius} 0 0;
  border-bottom: ${globalBorder};
  margin: -2rem -2rem 2rem;
  padding: 1rem 2rem;
  color: ${palette.black};
  font-weight: ${fontWeights.semibold};
  font-size: ${rem(16)};
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  + .panel-section {
    margin-top: -2rem;
  }
`;

export default PanelHeadingComponent;
