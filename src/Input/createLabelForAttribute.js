// @flow

import type { FieldProps as $FieldProps } from 'redux-form';
import type { $FormControlElementConfig } from './types';
import createInputIdAttribute from './createInputIdAttribute';

export default (props: $FormControlElementConfig & $FieldProps): string => {
  const { id, label } = props;

  if (label && typeof label === 'object' && typeof label.htmlFor === 'string') {
    return label.htmlFor;
  }

  if (id) {
    return id;
  }

  return createInputIdAttribute(props);
};
