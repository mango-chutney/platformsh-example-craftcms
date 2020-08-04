// @flow

import styled, { css, keyframes } from 'styled-components';
import { rem } from 'polished';
import { palette } from '../constants';
import { transitionStates } from './ToastProviderComposer';

export const animations = {
  enter: keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  85% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`,
  exit: keyframes`
  0% {
    opacity: 1;
  }

  50% {
    color: transparent;
    opacity: 0;
  }

  100% {
    padding: 0 1rem;
    height: 0;
    margin: 0;
    opacity: 0;
  }
`,
};

const ToastComponent = styled.button`
  animation: ${animations.enter} 0.15s ease-out normal forwards;
  background: #fff;
  border-radius: ${rem(4)};
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: inline-block;
  margin: 0.25rem;
  overflow: hidden;
  padding: 0.5rem 1rem;
  pointer-events: all;
  user-select: none;
  transition: all 15ms ease;

  ${({ transitionState }) =>
    transitionState === transitionStates.EXITING &&
    css`
      animation: ${animations.exit} 0.3s ease-out normal forwards;
    `};

  ${({ alert }) =>
    alert &&
    css`
      background: ${palette.alert};
      color: white;
    `};

  ${({ success }) =>
    success &&
    css`
      background: ${palette.success};
      color: white;
    `};

  ${({ inactive }) =>
    inactive &&
    css`
      background: ${palette.inactive};
      color: white;
    `};
`;

export default ToastComponent;
