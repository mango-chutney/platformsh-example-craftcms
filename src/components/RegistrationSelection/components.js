// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import {
  AnchorButton,
  Heading,
  Paragraph,
  Unbutton,
} from '../../signup/components';
import * as styles from '../../signup/styles';

export const Wrapper = styled.div`
  align-items: flex-start;
  background: ${styles.palette.lightGray};
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-start;
  left: 0;
  opacity: 0;
  overflow: auto;
  padding: 0;
  position: fixed;
  top: 0;
  transform: scale(0.99);
  width: 100%;
  z-index: 10002;

  .active & {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms ease, transform 300ms ease;
  }

  ${styles.media.lessThan('small')`
    transform: translateY(100%);

    .active & {
      transform: translateY(0%);
    }
  `};
`;

export const Container = styled.div`
  background: ${styles.palette.lightGray};
  border-radius: ${rem(4)};
  border: 0;
  box-sizing: border-box;
  color: ${styles.palette.black};
  margin: 0 auto;
  min-height: 100vh;
  padding: 8rem 0 4rem;
  position: relative;
  width: 100%;

  ${styles.media.lessThan('medium')`
    padding: 4rem 0;
  `};

  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  &:focus {
    outline: 0;
  }
`;

export const Row = styled.div`
  margin: 0 auto;
  max-width: ${rem(1052)};
  padding: 0 1rem;
  width: 100%;

  ${styles.media.lessThan('medium')`
    max-width: ${rem(460)};
  `};
`;

export const CardStyle = css`
  background: ${styles.palette.white};
  border-radius: ${rem(10)};
  border: ${rem(3)} solid transparent;
  box-shadow: 0 40px 60px 0 rgba(53, 64, 82, 0.1);
  flex: 1;
  margin: 1rem;
  padding: 0.25rem 0.25rem 3rem;
  text-align: center;
  transition: border-color 350ms ease;

  ${styles.media.lessThan('medium')`
    margin: 0 0 1rem;
    padding: 1.25rem 1.5rem;
    text-align: left;

    ${Heading} {
      text-align: left;
    }
  `};

  ${({ active }) =>
    active &&
    css`
      border: ${rem(3)} solid ${styles.palette.secondary};
    `};
`;

export const CardLink = styled.a`
  ${CardStyle};
  color: inherit;
  text-decoration: none;
`;

export const CardButton = styled(Unbutton).attrs({
  type: 'button',
})`
  ${CardStyle};
`;

export const CardButtonsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:hover,
  &:active {
    ${CardButton},
    ${CardLink} {
      border: ${rem(3)} solid transparent;

      &:hover,
      &:active {
        border: ${rem(3)} solid ${styles.palette.secondary};
      }
    }
  }

  ${styles.media.lessThan('medium')`
    flex-flow: column;
  `};
`;

export const CardHeading = (props: any) => (
  <Heading type="h2" textAlign="center" margin="0 0 1rem" {...props} />
);

export const CardContent = styled(Paragraph)`
  padding: 0 0.5rem;

  ${styles.media.lessThan('medium')`
    margin: 0;
    padding: 0;
  `};
`;

export const CardImageContainer = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  padding-bottom: 82%;
  position: relative;
  width: 100%;

  ${styles.media.lessThan('medium')`
    display: none;
  `};
`;

export const CardImage = styled.div`
  background-color: #f0f7fa;
  background-position: center;
  background-size: cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const ContentContainer = styled.div`
  margin: 4rem 0;

  ${styles.media.lessThan('medium')`
    margin: 2rem 0;
  `};

  button,
  ${AnchorButton} {
    margin: 2rem 0 4rem;

    ${styles.media.lessThan('medium')`
      margin: 0;
    `};
  }
`;

export const JoinTeamWrapper = styled.div`
  display: block;

  ${styles.media.lessThan('medium')`
    display: none;
  `};
`;

export const JoinTeamWrapperMobile = styled.div`
  display: none;

  ${styles.media.lessThan('medium')`
    display: block;
  `};

  button,
  ${AnchorButton} {
    max-width: none;
  }
`;

export const JoinTeamContainerMobile = styled.div`
  margin-top: 2rem;

  ${styles.media.lessThan('medium')`
    display: block;
    margin-top: 1rem;
  `};
`;
