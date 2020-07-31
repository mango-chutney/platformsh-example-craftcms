import * as React from 'react';
import { Button } from 'mango-components';
import styled, { css } from 'styled-components';
import { lighten, rem } from 'polished';
import * as styles from '../styles';

const buttonTypes = {
  primary: {
    backgroundColor: styles.palette.primary,
    color: styles.palette.white,
  },
  secondary: {
    backgroundColor: styles.palette.secondary,
    color: styles.palette.white,
  },
  gray: {
    backgroundColor: '#f7fafc',
    borderColor: '#ced0da',
    color: '#7383a1',
  },
};

const buttonSizes = {
  tiny: {
    fontSize: {
      default: rem(14),
    },
    padding: {
      default: '0.75rem 2rem',
    },
  },
  small: {
    fontSize: {
      default: rem(16),
    },
    padding: {
      default: '0.75rem 2rem',
    },
  },
  large: {
    fontSize: {
      default: rem(16),
      medium: rem(26),
    },
    padding: {
      default: '0.75rem 2rem',
      medium: '1rem 2rem',
    },
  },
};

const ButtonComponent = styled.button`
  border-radius: 4px;
  cursor: pointer;
  display: ${({ expand }) => (expand ? 'block' : 'inline-block')};
  font-size: ${rem(26)};
  font-weight: ${styles.fontWeight.semibold};
  max-width: 100%;
  padding: 1rem 2rem;
  transition: all 300ms ease;
  width: auto;

  ${({ buttonType }) =>
    buttonType &&
    buttonTypes[buttonType] &&
    css`
      background-color: ${buttonTypes[buttonType].backgroundColor};
      border: 1px solid
        ${buttonTypes[buttonType].borderColor ||
          buttonTypes[buttonType].backgroundColor};
      color: ${buttonTypes[buttonType].color};

      &:hover,
      &:focus {
        background-color: ${lighten(
          0.1,
          buttonTypes[buttonType].backgroundColor,
        )};
        border: 1px solid
          ${buttonTypes[buttonType].borderColor
            ? lighten(0.1, buttonTypes[buttonType].borderColor)
            : lighten(0.1, buttonTypes[buttonType].backgroundColor)};
        color: ${buttonTypes[buttonType].color};
      }
    `};

  ${({ buttonSize }) =>
    buttonSize &&
    buttonSizes[buttonSize] &&
    css`
      ${Object.keys(buttonSizes[buttonSize].fontSize).map(
        breakpoint => css`
          ${styles.media.greaterThan(breakpoint)`
               font-size: ${buttonSizes[buttonSize].fontSize[breakpoint]};
               `};
        `,
      )};

      ${Object.keys(buttonSizes[buttonSize].padding).map(
        breakpoint => css`
          ${styles.media.greaterThan(breakpoint)`
               padding: ${buttonSizes[buttonSize].padding[breakpoint]};
               `};
        `,
      )};
    `};

  ${({ expanded }) =>
    expanded &&
    css`
      display: block;
      width: 100%;
    `};

  ${({ wide }) =>
    wide &&
    css`
      max-width: ${rem(460)};
      width: 100%;
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.65;
      cursor: not-allowed;
    `};
`;

const StyledButton = props => (
  <Button
    {...{
      ButtonComponent,
      ...props,
    }}
  />
);

export const AnchorButton = styled(ButtonComponent.withComponent('a'))`
  text-align: center;
  text-decoration: none;
`;

export default StyledButton;
