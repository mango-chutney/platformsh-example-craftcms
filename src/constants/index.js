import { rem } from 'polished';

export const palette = {
  primary: '#2ea1f8',
  secondary: '#1bb934',
  tertiary: '#222c3c',
  lightGray: '#fafbfc',
  mediumGray: '#cacaca',
  darkGray: '#7f8fa4',
  white: '#fefefe',
  black: '#354052',
  body: '#7f8fa4',
  heading: '#354052',
  subheading: '#7f8fa4',
  border: '#e2e7ee',
  success: '#00D161',
  alert: '#F85359',
  inactive: '#C5D0DE',
};

export const fontWeights = {
  light: 300,
  normal: 'normal',
  medium: 500,
  semibold: 600,
  bold: 800,
  extrabold: 900,
};

export const fontStack =
  'proxima-nova,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,sans-serif';

export const globalRadius = rem(4);

export const globalBorder = `${rem(1)} solid ${palette.border}`;
