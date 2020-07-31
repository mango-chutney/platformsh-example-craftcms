// @flow

import * as React from 'react';
import ReactModal from 'react-modal';
import { rem, mix } from 'polished';
import styled from 'styled-components';
import { Tristicon } from 'mango-components';
import * as styles from '../styles';

export const ModalHeader = styled.div`
  background: ${styles.palette.primary};
  color: ${styles.palette.white};
  font-size: ${rem(18)};
  font-weight: ${styles.fontWeight.semibold};
  margin: -2rem -2rem 2rem;
  padding: 1.25rem 2rem;
`;

export const ModalFooter = styled.div`
  background: ${mix(0.8, styles.palette.white, styles.palette.border)};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 2rem -2rem -2rem;
  padding: 1.25rem 2rem;

  > *:last-child {
    margin-left: auto;
  }

  button {
    margin-bottom: 0;
  }
`;

const StyledModalClose = styled.button`
  background: none;
  border: 0;
  color: ${styles.palette.white};
  cursor: pointer;
  font-size: ${rem(12)};
  padding: 1rem;
  position: absolute;
  right: 1rem;
  text-align: center;
  top: 0.75rem;

  > *:last-child {
    margin-left: auto;
  }
`;
export const ModalClose = (props: any) => (
  <StyledModalClose {...props}>
    <Tristicon icon="cross" />
  </StyledModalClose>
);

const StyledReactModal = styled(ReactModal).attrs({
  style: () => ({
    overlay: {
      background: `${styles.palette.black}40`,
      alignItems: 'safe center',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'safe center',
      overflow: 'auto',
      zIndex: '9999',
      padding: '1rem',
    },
    content: {
      color: `${styles.palette.black}`,
      background: `${styles.palette.white}`,
      border: 0,
      borderRadius: `${rem(4)}`,
    },
  }),
})`
  box-sizing: border-box;
  margin: auto;
  max-width: ${({ maxWidth }) => maxWidth || rem(666)};
  overflow: hidden;
  padding: 2rem;
  position: relative;
  width: 100%;

  * {
    box-sizing: border-box;
    font-family: inherit;
  }

  &:focus {
    outline: 0;
  }
`;

type $Props = {
  children: React.Node,
  className?: string,
  isOpen?: boolean,
  maxWidth?: string,
};

function Modal(props: $Props) {
  const { children, className, isOpen, maxWidth, ...rest } = props;

  return (
    <StyledReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      maxWidth={maxWidth}
      {...rest}
    >
      {children}
    </StyledReactModal>
  );
}

export default Modal;
