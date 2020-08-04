// @flow

import { css } from 'styled-components';
import { woff } from 'tristicons/dist/json/base64-woff.json';

const createFontFace = () => css`
  @font-face {
    font-family: tristicons;
    font-style: normal;
    font-weight: normal;
    src: url(data:application/x-font-woff;charset=utf-8;base64,${encodeURIComponent(
      woff,
    )});
  }
`;

export default createFontFace;
