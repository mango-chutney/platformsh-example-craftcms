// @flow

import * as React from 'react';
import placements from './placements';

export type $Props = {
  children: React.Node,
  clickable?: boolean,
  placement?: $Keys<typeof placements>,
  visible: boolean,
  ArrowComponent: React.ElementType,
  PopperComponent: React.ElementType,
  PortalComponent: React.ElementType,
};

const UnmanagedTootlipComposer = (props: $Props) => {
  const {
    PortalComponent,
    ArrowComponent,
    PopperComponent,
    children,
    clickable,
    visible,
    ...rest
  } = props;

  return (
    <PortalComponent>
      <PopperComponent {...{ clickable, visible, ...rest }}>
        {children}
        <ArrowComponent {...{ visible }} />
      </PopperComponent>
    </PortalComponent>
  );
};

UnmanagedTootlipComposer.defaultProps = {
  clickable: false,
  placement: placements.auto,
};

export default UnmanagedTootlipComposer;
