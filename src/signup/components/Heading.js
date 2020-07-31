// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';

const headings = {
  h1: {
    color: styles.palette.black,
    fontWeight: styles.fontWeight.semibold,
    margin: '0 0 2rem',
    sizes: {
      default: rem(32),
      medium: rem(40),
      large: rem(50),
    },
  },
  h2: {
    color: styles.palette.black,
    fontWeight: styles.fontWeight.semibold,
    margin: '0 0 2rem',
    sizes: {
      default: rem(22),
      medium: rem(24),
      large: rem(30),
    },
  },
  h3: {
    color: styles.palette.mediumGray,
    fontWeight: styles.fontWeight.medium,
    margin: '0 0 2rem',
    sizes: {
      default: rem(18),
      medium: rem(20),
      large: rem(24),
    },
  },
  h4: {
    color: styles.palette.mediumGray,
    fontWeight: styles.fontWeight.medium,
    margin: '0 0 2rem',
    sizes: {
      default: rem(17),
      medium: rem(17),
      large: rem(18),
    },
  },
  h5: {
    color: styles.palette.mediumGray,
    fontWeight: styles.fontWeight.semibold,
    margin: '0 0 2rem',
    sizes: {
      default: rem(14),
      medium: rem(14),
      large: rem(14),
    },
  },
  h6: {
    color: styles.palette.mediumGray,
    fontWeight: styles.fontWeight.semibold,
    margin: '0 0 2rem',
    sizes: {
      default: rem(12),
      medium: rem(12),
      large: rem(12),
    },
  },
};

const Heading = styled.div`
  line-height: ${({ lineHeight }) => lineHeight || '1.1'};
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  text-transform: ${({ textTransform }) => textTransform || 'inherit'};

  ${({ type, color, fontWeight, margin }) =>
    type &&
    headings[type] &&
    css`
      color: ${color || headings[type].color};
      font-weight: ${fontWeight || headings[type].fontWeight};
      margin: ${margin || headings[type].margin};

      ${Object.keys(headings[type].sizes).map(
        breakpoint => css`
          ${styles.media.greaterThan(breakpoint)`
            font-size: ${headings[type].sizes[breakpoint]};
            `};
        `,
      )};
    `};

  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize};
    `};
`;

export const FormHeading = (props: any) => (
  <Heading type="h1" textAlign="center" margin="0 0 1rem" {...props} />
);

export const FormSubheading = (props: any) => (
  <Heading type="h3" textAlign="center" margin="0 0 2.5rem" {...props} />
);

export const FormFieldsetHeading = (props: any) => (
  <Heading
    type="h3"
    textAlign="center"
    color={styles.palette.black}
    {...props}
  />
);

export default Heading;
