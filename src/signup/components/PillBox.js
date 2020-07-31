// @flow

import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { tristicons } from 'mango-components';
import * as styles from '../styles';

export const Pill = styled.button`
  align-items: center;
  background-color: ${styles.palette.white};
  border: 1px solid ${styles.palette.border};
  color: ${styles.palette.body};
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: ${rem(16)};
  font-weight: ${styles.fontWeight.semibold};
  margin: -1px;
  outline: 0;
  padding: 1rem 1.5rem;
  text-align: left;
  transition: background-color 350ms ease;

  ${styles.media.lessThan('medium')`
    font-size: ${rem(16)};
    padding: 1rem;
  `};

  ${styles.media.lessThan('small')`
    font-size: ${rem(14)};
  `};

  &::before {
    align-items: center;
    background-color: ${styles.palette.white};
    border-radius: 50%;
    border: 1px solid ${styles.palette.border};
    color: transparent;
    content: "${tristicons.check}";
    display: inline-flex;
    flex: 0 0 auto;
    font-family: "tristicons";
    height: ${rem(24)};
    justify-content: center;
    margin-right: 1rem;
    margin-top: -0.25rem;
    transition: background-color 350ms ease;
    width: ${rem(24)};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${styles.palette.tertiary};
      border: 1px solid ${styles.palette.tertiary};
      color: ${styles.palette.white};
      z-index: 1;

      &::before {
        background-color: ${styles.palette.white};
        border: 1px solid ${styles.palette.tertiary};
        color: ${styles.palette.tertiary};
      }
    `};
  }
`;

const PillBox = styled.div`
  border-radius: 6px;
  display: flex;
  flex-flow: row nowrap;

  ${Pill} {
    &:first-child {
      border-radius: 6px 0 0 6px;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }

  ${styles.media.lessThan('small')`
    font-size: ${rem(14)};
    flex-flow: column;

    ${Pill} {
      &:first-child {
        border-radius: 6px 6px 0 0;
      }

      &:last-child {
        border-radius: 0 0 6px 6px;
      }
    }
  `};
`;

export default PillBox;
