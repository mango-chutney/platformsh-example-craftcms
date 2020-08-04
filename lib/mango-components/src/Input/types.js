// @flow

import * as React from 'react';

export type $FormControlElementConfig = $Rest<
  | React.ElementConfig<'input'>
  | React.ElementConfig<'textarea'>
  | React.ElementConfig<'select'>,
  {| children: React.Node |},
>;
