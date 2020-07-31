// @flow

import * as React from 'react';
import {
  TextArea,
  TextAreaComponent,
  TextAreaLabelComponent,
} from 'mango-components';
import styled from 'styled-components';
import { rem } from 'polished';
import * as styles from '../styles';
import { styledTheme } from './Input';

export const StyledTextAreaLabelComponent = styled(TextAreaLabelComponent)``;

export const StyledTextAreaComponent = styled(TextAreaComponent)`
  height: ${rem(200)};
  margin-top: ${rem(8)};
  padding: ${rem(20)} ${rem(20)} ${rem(20)} ${rem(20)};
  resize: none;
  line-height: 1.4;

  ::placeholder {
    font-weight: ${styles.fontWeight.semibold};
  }

  ${styles.media.greaterThan('medium')`
    font-size: ${rem(16)};
    height: ${rem(410)};
    margin-bottom: ${rem(64)}
    padding: ${rem(30)} ${rem(20)} ${rem(48)} ${rem(20)};
  `};
`;

const StyledTextArea = ({ children, meta, ...rest }: any) => (
  <TextArea
    {...{
      TextAreaComponent: StyledTextAreaComponent,
      TextAreaLabelComponent: StyledTextAreaLabelComponent,
      theme: styledTheme,
      meta,
      ...rest,
    }}
  >
    {children}
  </TextArea>
);

export default StyledTextArea;
