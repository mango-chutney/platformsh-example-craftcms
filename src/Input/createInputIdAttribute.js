// @flow

import invariant from 'invariant';
import type { FieldProps as $FieldProps } from 'redux-form';
import type { $FormControlElementConfig } from './types';

export default ({
  id,
  input,
}: $FormControlElementConfig & $FieldProps): string => {
  if (id) {
    return id;
  }

  if (input && typeof input === 'object' && typeof input.name === 'string') {
    return input.name;
  }

  return invariant(
    false,
    `Couldn't find or infer 'id' attribute for input element`,
  );
};
