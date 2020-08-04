// @flow

import * as React from 'react';
import type { FieldProps as $FieldProps } from 'redux-form';
import type { $FormControlElementConfig } from './types';
import createLabelForAttribute from './createLabelForAttribute';
import createLabelObject from './createLabelObject';

export default (
  label: string | React.ElementConfig<'label'> | void,
  props: $FormControlElementConfig & $FieldProps,
): React.ElementConfig<'label'> => {
  const {
    meta,
    input, // don't apply input element props to label
    custom, // don't apply input element props to label
    children,
    ...rest
  } = props;

  const labelProps = createLabelObject(label);

  return {
    ...rest,
    ...labelProps,
    meta,
    children: children || labelProps.children || undefined,
    htmlFor: createLabelForAttribute(props),
  };
};
