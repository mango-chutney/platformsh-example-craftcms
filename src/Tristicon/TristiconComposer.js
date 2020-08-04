// @flow

import * as React from 'react';

export type $Props = {
  TristiconComponent: React.ElementType,
  icon: string,
};

const TristiconComposer = (props: $Props) => {
  const { TristiconComponent, icon, ...rest } = props;

  return <TristiconComponent {...{ ...rest, icon }} />;
};

export default TristiconComposer;
