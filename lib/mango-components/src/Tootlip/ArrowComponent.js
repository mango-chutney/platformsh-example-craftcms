// @flow

import * as React from 'react';
import { Arrow } from 'react-popper';
import styled from 'styled-components';
import * as styles from './styles';
import PopperComponent from './PopperComponent';

// Remove these special props so they don't end up on the DOM node
export const WrappedArrow = ({ visible, ...rest }: any) => <Arrow {...rest} />;
// prettier insists on adding a space between
// `${PopperComponent}[data-placement^='left']` like `${PopperComponent}
// [data-placement^='left']`, which causes flow to complain
// prettier-ignore

const ArrowComponent = styled(WrappedArrow)`
    ${PopperComponent} & {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: ${styles.radius};
    }

    ${PopperComponent}[data-placement^='top'] & {
      border-width: ${styles.radius} ${styles.radius} 0
        ${styles.radius};
      border-color: ${styles.backgroundColor} transparent transparent
        transparent;
      bottom: -${styles.radius};
      left: calc(50% - ${styles.radius});
      margin-top: 0;
      margin-bottom: 0;
    }

    ${PopperComponent}[data-placement^='bottom'] & {
      border-width: 0 ${styles.radius} ${styles.radius}
        ${styles.radius};
      border-color: transparent transparent ${styles.backgroundColor}
        transparent;
      top: -${styles.radius};
      left: calc(50% - ${styles.radius});
      margin-top: 0;
      margin-bottom: 0;
    }

    ${PopperComponent}[data-placement^='right'] & {
      border-width: ${styles.radius} ${styles.radius}
        ${styles.radius} 0;
      border-color: transparent ${styles.backgroundColor} transparent
        transparent;
      left: -${styles.radius};
      top: calc(50% - ${styles.radius});
      margin-left: 0;
      margin-right: 0;
    }

    ${PopperComponent}[data-placement^='left'] & {
      border-width: ${styles.radius} 0 ${styles.radius}
        ${styles.radius};
      border-color: transparent transparent transparent
        ${styles.backgroundColor};
      right: -${styles.radius};
      top: calc(50% - ${styles.radius});
      margin-left: 0;
      margin-right: 0;
    }
  `;

export default ArrowComponent;
