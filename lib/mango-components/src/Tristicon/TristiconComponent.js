// @flow

import tristicons from 'tristicons';
import styled from 'styled-components';
import { rem } from 'polished';

const getTristiconContent = (iconNameOrCodePoint: string): string => {
  try {
    const codepoint = String.fromCodePoint(parseInt(iconNameOrCodePoint, 10));
    if (codepoint && iconNameOrCodePoint.startsWith('\\')) {
      return iconNameOrCodePoint;
    }
  } catch (error) {
    if (tristicons[iconNameOrCodePoint]) {
      return tristicons[iconNameOrCodePoint];
    }
  }

  throw new Error(`No such icon: ${iconNameOrCodePoint}`);
};

const TristiconComponent = styled.i`
    &::before {
      content: "${({ icon }) => (icon ? getTristiconContent(icon) : '')}";
      display: inline-block;
      font: normal normal normal ${rem(14)} tristicons;
      font-size: ${({ fontSize }) => fontSize || 'inherit'};
      text-rendering: auto;
      vertical-align: inherit;
    }
  `;

export default TristiconComponent;
