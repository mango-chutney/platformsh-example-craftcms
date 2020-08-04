// @flow

import * as React from 'react';
import AnchorComponent from './AnchorComponent';
import MadeWithMangoChutneyComponent from './MadeWithMangoChutneyComponent';
import MadeWithMangoChutneyComposer from './MadeWithMangoChutneyComposer';
import WrapperComponent from './WrapperComponent';
import type { $Props as $ChildProps } from './MadeWithMangoChutneyComposer';

export type $Props = {
  ...$ChildProps,
  AnchorComponent?: $PropertyType<$ChildProps, 'AnchorComponent'>,
  MadeWithMangoChutneyComponent?: $PropertyType<
    $ChildProps,
    'MadeWithMangoChutneyComponent',
  >,
  WrapperComponent?: $PropertyType<$ChildProps, 'WrapperComponent'>,
};

function MadeWithMangoChutney(props: $Props) {
  return (
    <MadeWithMangoChutneyComposer
      {...{
        WrapperComponent,
        AnchorComponent,
        MadeWithMangoChutneyComponent,
        ...props,
      }}
    />
  );
}

MadeWithMangoChutney.defaultProps = {
  href: 'http://mangochutney.com.au',
};

export default MadeWithMangoChutney;
