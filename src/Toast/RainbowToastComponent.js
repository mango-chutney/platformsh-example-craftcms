// @flow

import * as React from 'react';
import styled from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import keys from 'lodash/keys';
import pick from 'lodash/pick';
import { btoa } from 'isomorphic-base64';
import ToastComponent from './ToastComponent';
import AnimatedRainbowGradient from '../AnimatedRainbowGradient';

const RainbowToastComponent = styled(ToastComponent)`
  /* fallback for old browsers */
  background: linear-gradient(135deg, ${({ colors }) => colors.join(', ')});
  background: url(data:image/svg+xml;base64,${props =>
    btoa(
      renderToStaticMarkup(
        <AnimatedRainbowGradient
          {...pick(props, keys(AnimatedRainbowGradient.defaultProps))}
        />,
      ),
    )});
  background-size: cover;
  color: white;
  text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`;

RainbowToastComponent.defaultProps = {
  ...AnimatedRainbowGradient.defaultProps,
  ...ToastComponent.defaultProps,
};

export default RainbowToastComponent;
