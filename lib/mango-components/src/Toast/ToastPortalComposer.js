// @flow

import * as React from 'react';

export type $Props = {
  PortalComponent: React.ElementType,
  ToastContainerComponent: React.ElementType,
};

const ToastPortalComposer = ({
  PortalComponent,
  ToastContainerComponent,
  ...rest
}: $Props) => (
  <PortalComponent>
    <ToastContainerComponent {...rest} />
  </PortalComponent>
);

export default ToastPortalComposer;
