// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Select, SelectComponent } from 'mango-components';
import { rem } from 'polished';
import { LabelComponent, Tootlip } from '.';
import {
  styledTheme as inputStyledTheme,
  disabledBackgroundCss,
} from './Input';
import * as styles from '../styles';

const StyledSelectComponent = styled(SelectComponent)`
  text-transform: capitalize;

  ${styles.media.greaterThan('medium')`
    font-size: ${rem(16)};
    height: ${rem(50)};
  `};

  ${disabledBackgroundCss};
`;

const StyledSelect = ({ disabled, meta, tooltipVisible, ...rest }: any) => (
  <div>
    <Select
      {...{
        disabled: disabled || meta.asyncValidating || meta.submitting,
        LabelComponent,
        meta,
        SelectComponent: StyledSelectComponent,
        theme: inputStyledTheme,
        ...rest,
      }}
    />
    <Tootlip {...{ meta }} visible={tooltipVisible} />
  </div>
);

export default StyledSelect;
