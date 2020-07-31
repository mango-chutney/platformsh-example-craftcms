// @flow

import { generateMedia } from 'styled-media-query';
import { css } from 'styled-components';
import { rem } from 'polished';

export const palette = {
  black: '#222c3c',
  white: '#ffffff',
  body: '#7f8fa4',
  primary: '#0091e6',
  secondary: '#3bb324',
  tertiary: '#66bdff',
  lightGray: '#f2f7fa',
  mediumGray: '#7f8fa4',
  darkGray: '#354052',
  border: '#bfc7d1',
  label: '#6a788a',
  alert: '#f85359',
};

export const globalFontFamily = "'proxima-nova', Arial, Helvetica, sans-serif";

export const globalBorder = `1px solid ${palette.border}`;

export const media = generateMedia({
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
  default: '0px',
});

export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 800,
  extrabold: 900,
};

export const fontPath = '/assets/fonts';

export const fonts = [
  {
    family: 'proxima-nova',
    style: 'normal',
    weight: fontWeight.normal,
    fileName: 'proximanova-regular-webfont',
  },
  {
    family: 'proxima-nova',
    style: 'normal',
    weight: fontWeight.medium,
    fileName: 'proximanova-medium-webfont',
  },
  {
    family: 'proxima-nova',
    style: 'normal',
    weight: fontWeight.semibold,
    fileName: 'proximanova-semibold-webfont',
  },
  {
    family: 'proxima-nova',
    style: 'normal',
    weight: fontWeight.bold,
    fileName: 'proximanova-bold-webfont',
  },
];

export const desktopTopPadding = rem(165);

export const input = {
  backgroundColor: palette.white,
  borderColor: palette.border,
  placeholderColor: '#ccd2db',
  color: '#354052',
};

export const globalCss = css`
  ${fonts.map(
    font => css`
      @font-face {
        font-family: '${font.family}';
        font-style: ${font.style};
        font-weight: ${font.weight};
        src: url('${fontPath}/${font.fileName}.eot'),
          url('${fontPath}/${font.fileName}.woff2'),
          url('${fontPath}/${font.fileName}.woff'),
          url('${fontPath}/${font.fileName}.ttf'),
          url('${fontPath}/${font.fileName}.svg');
      }
  `,
  )};

  * {
    box-sizing: border-box;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${palette.lightGray};
    color: ${palette.mediumGray};
    font-family: ${globalFontFamily};
    line-height: 1.6;
    margin: 0;
  }

  p {
    color: inherit;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px ${input.backgroundColor} inset;
    -webkit-text-fill-color: ${input.color};
    transition: background-color 5000s ease-in-out 0s;
  }

  .text-center {
    text-align: center;
  }
`;
