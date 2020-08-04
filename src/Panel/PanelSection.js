// @flow

import styled from 'styled-components';
import classNames from 'classnames';
import { palette } from '../constants';

const PanelSectionComponent = styled.div.attrs({
  className: ({ className }) => classNames('panel-section', className),
})`
  margin: 0 -2rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${palette.border};

  :first-child {
    margin-top: -2rem;
  }

  :last-child {
    border-bottom: 0;
  }
`;

export default PanelSectionComponent;
