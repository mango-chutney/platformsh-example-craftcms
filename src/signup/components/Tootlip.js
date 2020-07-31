// @flow

import * as React from 'react';
import type { FieldProps as $FieldProps } from 'redux-form';
import { Tootlip } from 'mango-components';

export default ({
  children,
  meta,
  visible,
}: {
  children?: React.Node,
  meta: $PropertyType<$FieldProps, 'meta'>,
  visible?: boolean,
}): React.Node => {
  if (meta && meta.error) {
    return (
      <Tootlip
        visible={
          visible || (meta.active && (meta.touched || meta.submitFailed))
        }
        placement="top"
        eventsEnabled={false}
      >
        {children || meta.error}
      </Tootlip>
    );
  }

  return null;
};
