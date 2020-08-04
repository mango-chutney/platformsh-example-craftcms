// @flow

import * as React from 'react';

export default (
  label: string | React.ElementConfig<'label'> | void,
): React.ElementConfig<'label'> => {
  if (!label) {
    return {};
  }

  if (typeof label === 'string') {
    return {
      children: label,
    };
  }

  return {
    ...label,
  };
};
