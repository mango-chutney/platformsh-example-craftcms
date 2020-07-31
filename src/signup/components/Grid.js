// @flow

import styled, { css } from 'styled-components';
import * as styles from '../styles';

const columnCount = 12;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 -0.5rem;
`;

export const Column = styled.div`
  flex: 1 1 100%;
  margin: 0 0.5rem;

  ${({ small }) =>
    small &&
    css`
      ${styles.media.greaterThan('default')`
        flex: ${small / columnCount};
      `};
    `};

  ${({ medium }) =>
    medium &&
    css`
      ${styles.media.greaterThan('medium')`
        flex: ${medium / columnCount};
      `};
    `};

  ${({ large }) =>
    large &&
    css`
      ${styles.media.greaterThan('large')`
        flex: ${large / columnCount};
      `};
    `};

  ${({ xlarge }) =>
    xlarge &&
    css`
      ${styles.media.greaterThan('huge')`
        flex: ${xlarge / columnCount};
      `};
    `};
`;

export default Row;
