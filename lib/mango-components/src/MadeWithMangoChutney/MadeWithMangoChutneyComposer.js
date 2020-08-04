// @flow

import * as React from 'react';

export type $Props = {
  AnchorComponent: React.ElementType,
  WrapperComponent: React.ElementType,
  MadeWithMangoChutneyComponent: React.ElementType,
};

const MadeWithMangoChutneyComposer = (props: $Props) => {
  const {
    AnchorComponent,
    WrapperComponent,
    MadeWithMangoChutneyComponent,
    ...rest
  } = props;

  return (
    <WrapperComponent>
      <AnchorComponent {...rest} target="_blank" rel="noopener noreferrer">
        <MadeWithMangoChutneyComponent />
      </AnchorComponent>
    </WrapperComponent>
  );
};

export default MadeWithMangoChutneyComposer;
