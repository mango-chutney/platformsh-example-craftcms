// @flow

import type { FieldProps as $FieldProps } from 'redux-form';
import type { $FormControlElementConfig } from './types';

export default ({
  disabled,
  meta,
}: $FormControlElementConfig & $FieldProps): {
  disabled: boolean,
  meta: $PropertyType<$FieldProps, 'meta'>,
} => ({
  disabled,
  meta,
});
