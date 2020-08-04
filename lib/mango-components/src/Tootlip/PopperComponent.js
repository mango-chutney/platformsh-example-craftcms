// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Popper } from 'react-popper';
import * as styles from './styles';

// Remove these special props so they don't end up on the DOM node
export const WrappedPopper = ({ visible, clickable, ...rest }: any) => (
  <Popper {...rest} />
);

const PopperComponent = styled(WrappedPopper)`
  color: ${styles.color};
  background-color: ${styles.backgroundColor};
  border-radius: ${styles.radius};
  cursor: help;
  display: inline-block;
  font-size: ${styles.fontSize};
  min-width: ${styles.minWidth};
  padding: ${styles.padding};
  pointer-events: ${({ clickable }) => (clickable ? 'auto' : 'none')};
  position: absolute;
  text-align: center;
  transition: ${styles.transition};
  opacity: ${({ visible }) => (visible ? 0.9 : 0)};
  max-width: ${styles.maxWidth};

  &[data-placement^='top'] {
    margin-bottom: ${styles.radius};
  }

  &[data-placement^='bottom'] {
    margin-top: ${styles.radius};
  }

  &[data-placement^='right'] {
    margin-left: ${styles.radius};
  }

  &[data-placement^='left'] {
    margin-right: ${styles.radius};
  }
`;

export default PopperComponent;
