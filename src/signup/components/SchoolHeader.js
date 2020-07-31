import styled, { keyframes } from 'styled-components';

const schoolBannerAnimateIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const SchoolHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;

  div {
    animation: ${schoolBannerAnimateIn} 350ms linear;
    display: block;
    height: 4.5rem;
    width: 100%;

    &:nth-child(1) {
      background-color: #ffce00;
    }

    &:nth-child(2) {
      background-color: #ff6b00;
    }

    &:nth-child(3) {
      background-color: #2ba0f7;
    }

    &:nth-child(4) {
      background-color: #1888de;
    }
  }
`;

export default SchoolHeader;
