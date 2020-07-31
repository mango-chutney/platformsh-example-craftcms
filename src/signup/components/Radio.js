// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Radio, RadioLabelComponent } from 'mango-components';
import { rem } from 'polished';
import { Tootlip } from '.';
import * as styles from '../styles';

export const RadioWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 1rem;

  > * {
    margin: 0 3rem 0.5rem 0;

    ${styles.media.lessThan('medium')`
      margin: 0 0 0.5rem 0;
      width: 100%;
    `};
  }
`;

const LabelComponent = styled(RadioLabelComponent)`
  font-size: ${rem(14)};
  font-weight: ${styles.fontWeight.semibold};
`;

const styledTheme = {
  radio: {
    borderColor: styles.palette.border,
  },
};

const StyledRadio = ({ disabled, meta, tooltipVisible, ...rest }: any) => (
  <div>
    <Radio
      {...{
        disabled: disabled || meta.asyncValidating || meta.submitting,
        LabelComponent,
        meta,
        theme: styledTheme,
        ...rest,
      }}
    />
    <Tootlip {...{ meta }} visible={tooltipVisible} />
  </div>
);
export default StyledRadio;
