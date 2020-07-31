// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Checkbox, CheckboxLabelComponent } from 'mango-components';
import { rem } from 'polished';
import { Tootlip } from '.';
import * as styles from '../styles';

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: 2rem 0 1rem;

  > * {
    margin: 0 4rem 1rem 0;

    ${styles.media.lessThan('medium')`
      margin: 0;
      width: 100%;
    `};
  }

  ${styles.media.lessThan('medium')`
    margin: 1rem 0 1rem;
  `};
`;

export const CenterCheckboxWrapper = styled.div`
  margin: 2rem 0 1rem;
  text-align: center;

  ${styles.media.lessThan('medium')`
    text-align: left;
  `};
`;

const styledTheme = {
  checkbox: {
    borderColor: styles.palette.border,
  },
};

const LabelComponent = styled(CheckboxLabelComponent)`
  font-size: ${rem(14)};
  font-weight: ${styles.fontWeight.semibold};
`;

const StyledCheckbox = ({ disabled, meta, tooltipVisible, ...rest }: any) => (
  <div>
    <Checkbox
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

export default StyledCheckbox;
