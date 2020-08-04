// @flow

import type { FieldProps as $FieldProps } from 'redux-form';
import type { $FormControlElementConfig } from './types';
import createInputIdAttribute from './createInputIdAttribute';

export default (
  props: $FormControlElementConfig & $FieldProps,
  extraProps?: $FormControlElementConfig,
): $FormControlElementConfig => {
  const {
    children, // don't apply label's children to input
    label,
    meta,
    input,
    ...rest
  } = props;

  return {
    ...input,
    ...rest,
    ...extraProps,
    meta,
    id: createInputIdAttribute(props),
  };
};
