// @flow

import * as React from 'react';
import styled from 'styled-components';
import * as styles from '../styles';

const StyledAnchor = styled.a`
  color: ${styles.palette.primary};
`;

const Anchor = ({
  disableBeforeUnload,
  children,
  ...rest
}: {
  disableBeforeUnload?: boolean,
  children: any,
}) => (
  <StyledAnchor
    onClick={() => {
      if (disableBeforeUnload) {
        window.onbeforeunload = () => undefined;
      }
    }}
    {...rest}
  >
    {children}
  </StyledAnchor>
);

export default Anchor;
